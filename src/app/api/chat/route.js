export const runtime = 'nodejs';

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
  try {
    console.log("✅ API route hit");

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log("📩 Request body received:", body);
    } catch (err) {
      console.error("❌ Failed to parse request JSON:", err);
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = body || {};
    if (!messages || !Array.isArray(messages)) {
      console.error("❌ No valid 'messages' array in request body");
      return new Response(
        JSON.stringify({ error: "Missing 'messages' array" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check API key
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("❌ Missing OPENROUTER_API_KEY in environment");
      return new Response(
        JSON.stringify({ error: "Server missing API key" }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("🌐 Sending request to OpenRouter API...");
    
    // Make API request with proper error handling
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://albaker-portfolio.vercel.app",
        "X-Title": "Albaker Portfolio"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    console.log("📡 OpenRouter status:", response.status);
    
    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenRouter API error:", errorText);
      return new Response(
        JSON.stringify({ 
          error: "OpenRouter API error", 
          status: response.status,
          details: errorText 
        }), 
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("📦 OpenRouter response:", data);

    const reply = data?.choices?.[0]?.message?.content || "No reply from model";
    
    return new Response(
      JSON.stringify({ reply }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("❌ Unexpected server error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Unexpected server error", 
        details: error.message 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}