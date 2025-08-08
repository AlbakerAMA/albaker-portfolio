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
  const { messages } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://albaker-portfolio.vercel.app/', // Required by OpenRouter
        'X-Title': 'Albaker Portfolio' // Optional but recommended
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free", // Or any model from openrouter.ai/models
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch from OpenRouter');
    }

    const data = await response.json();
    return Response.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('OpenRouter Error:', error);
    return Response.json(
      { reply: "Sorry, I'm having trouble responding. Please try again later." },
      { status: 500 }
    );
  }
}