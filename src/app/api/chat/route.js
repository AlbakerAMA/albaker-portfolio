export const runtime = 'nodejs'; // Ensure Node.js runtime

const systemPrompt = `
You are Albaker Ahmed's AI assistant. Respond professionally but conversationally. Key facts about Albaker:

# Expertise
- Full Stack Developer (Next.js, React, Flutter)
- ML Engineer (Python, TensorFlow)
- Specializes in SOLFA ML systems and e-learning platforms

# Projects
1. SOLFA ML System: Led team developing 4+ internal ML models
2. FootPrints: AI-powered Flutter shopping app
3. HTA e-Learning: Platform for students with disabilities

# Education
- African Leadership Academy (2023-2025)
- Leadership & A-Levels (Math, CS, Physics)

# Contact
- Email: aali23@alastudents.org
- GitHub: github.com/albaker
- LinkedIn: linkedin.com/in/albaker
- Location: Aswan, Egypt

Rules:
1. Never invent information
2. For coding questions, provide short examples
3. Keep responses under 3 sentences unless asked for detail
`;

export async function POST(req) {
  console.log("✅ API route hit");

  let body;
  try {
    body = await req.json();
    console.log("📩 Request body received:", body);
  } catch (err) {
    console.error("❌ Failed to parse request JSON:", err);
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages } = body || {};
  if (!messages || !Array.isArray(messages)) {
    console.error("❌ No valid 'messages' array in request body");
    return Response.json({ error: "Missing 'messages' array" }, { status: 400 });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("❌ Missing OPENROUTER_API_KEY in environment");
    return Response.json({ error: "Server missing API key" }, { status: 500 });
  }

  try {
    console.log("🌐 Sending request to OpenRouter API...");
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        Referer: "https://albaker-portfolio.vercel.app", // Correct header name
        "X-Title": "Albaker Portfolio"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Safer test model
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });

    console.log("📡 OpenRouter status:", response.status);
    const data = await response.json().catch(() => null);
    console.log("📦 OpenRouter raw response:", data);

    if (!response.ok) {
      return Response.json(
        { error: "OpenRouter API error", details: data },
        { status: response.status }
      );
    }

    return Response.json({ reply: data?.choices?.[0]?.message?.content || "No reply from model" });

  } catch (error) {
    console.error("❌ Unexpected server error:", error);
    return Response.json(
      { error: "Unexpected server error", details: error.message },
      { status: 500 }
    );
  }
}
