// Force dynamic rendering to avoid caching issues
export const dynamic = 'force-dynamic';
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

export async function POST(request) {
  // Add detailed logging for Vercel
  console.log("🚀 POST route handler called");
  console.log("Environment check - API Key exists:", !!process.env.OPENROUTER_API_KEY);
  
  try {
    // Parse request with better error handling
    let body;
    try {
      const text = await request.text();
      console.log("📥 Raw request text:", text.substring(0, 200) + "...");
      body = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON",
          details: parseError.message 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      console.error("❌ Invalid messages format");
      return new Response(
        JSON.stringify({ error: "Missing or invalid messages array" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log("📨 Processing", messages.length, "messages");

    // Check environment
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("❌ OPENROUTER_API_KEY not found");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Call OpenRouter with timeout
    console.log("🌐 Calling OpenRouter API...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for Vercel

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://albaker-portfolio.vercel.app",
          "X-Title": "Albaker Portfolio"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ],
          max_tokens: 300,
          temperature: 0.7
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      console.log("📡 OpenRouter response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ OpenRouter error:", response.status, errorText);
        return new Response(
          JSON.stringify({ 
            error: "API call failed",
            status: response.status,
            details: errorText.substring(0, 500)
          }),
          { 
            status: 502,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      
      if (!reply) {
        console.error("❌ No reply in response:", data);
        return new Response(
          JSON.stringify({ error: "No reply from AI model" }),
          { 
            status: 502,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log("✅ Success! Reply length:", reply.length);
      return new Response(
        JSON.stringify({ reply }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error("❌ Request timeout");
        return new Response(
          JSON.stringify({ error: "Request timeout" }),
          { 
            status: 504,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      throw fetchError;
    }

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Add a simple GET method for testing
export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: "Chat API is running",
      timestamp: new Date().toISOString(),
      hasApiKey: !!process.env.OPENROUTER_API_KEY
    }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}