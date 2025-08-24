// RAG-enabled chatbot with Pinecone + Hugging Face + OpenRouter
export const runtime = 'nodejs';
export const maxDuration = 10; // Vercel timeout limit

// Import required dependencies
import { Pinecone } from '@pinecone-database/pinecone';

// System prompt for the assistant
const systemPrompt = `You are Albaker Ahmed's portfolio assistant. Answer questions using the provided context about Albaker's background, projects, and expertise. Keep responses professional but conversational.`;

// Function to create embeddings using BAAI/bge-base-en-v1.5
async function embedQuery(query) {
  console.log('🔍 Generating embedding for query:', query.substring(0, 50) + '...');
  
  // Use BAAI/bge-base-en-v1.5 embedding model
  if (process.env.HUGGINGFACE_API_KEY && process.env.HUGGINGFACE_API_KEY !== 'your_huggingface_api_key_here') {
    console.log('🤖 Using BAAI/bge-base-en-v1.5 embedding model...');
    
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/BAAI/bge-base-en-v1.5',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: query,
            options: { 
              wait_for_model: true,
              use_cache: true
            }
          })
        }
      );

      if (response.status === 401) {
        console.log('⚠️ HF API Key Invalid - Please update your API key');
      } else if (response.ok) {
        const result = await response.json();
        console.log('✅ BAAI/bge-base-en-v1.5 Success! Dimensions:', Array.isArray(result) ? result.length : 'unknown');
        
        if (Array.isArray(result) && result.length >= 300) {
          console.log('✅ Embedding generated successfully, dimensions:', result.length);
          return result; // Return full 768 dimensions for Pinecone
        } else {
          console.log('⚠️ Unexpected response format or insufficient dimensions');
        }
      } else {
        const errorText = await response.text();
        console.log('⚠️ BAAI/bge-base-en-v1.5 API failed:', response.status, errorText.substring(0, 150));
      }
    } catch (error) {
      console.log('⚠️ BAAI/bge-base-en-v1.5 API error:', error.message);
    }
  } else {
    console.log('⚠️ No valid HF API key found');
  }
  
  // Fallback to enhanced local embedding
  console.log('🔄 Using enhanced local embedding generation');
  return generateEnhancedEmbedding(query);
}

// Helper function to pad or truncate embeddings to target dimension
function padOrTruncateEmbedding(embedding, targetDim) {
  if (embedding.length === targetDim) {
    return embedding;
  } else if (embedding.length > targetDim) {
    // Truncate
    return embedding.slice(0, targetDim);
  } else {
    // Pad with zeros
    const padded = [...embedding];
    while (padded.length < targetDim) {
      padded.push(0);
    }
    return padded;
  }
}

// Enhanced embedding generation with sophisticated text analysis (768 dimensions)
function generateEnhancedEmbedding(text) {
  const embedding = new Array(768).fill(0);
  
  // Text preprocessing
  const cleanText = text.toLowerCase().trim();
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  const chars = cleanText.split('');
  
  // 1. Character-level features with multiple hash functions
  chars.forEach((char, i) => {
    const charCode = char.charCodeAt(0);
    const pos1 = (charCode * 7 + i * 3) % 768;
    const pos2 = (charCode * 11 + i * 5) % 768;
    const pos3 = (charCode * 13 + i * 7) % 768;
    
    embedding[pos1] += Math.sin(charCode * 0.1) * 0.1;
    embedding[pos2] += Math.cos(charCode * 0.1) * 0.1;
    embedding[pos3] += Math.tanh(charCode * 0.05) * 0.05;
  });
  
  // 2. Word-level features with semantic weighting
  const importantWords = new Set([
    'albaker', 'ahmed', 'projects', 'skills', 'education', 'experience',
    'programming', 'languages', 'technologies', 'internship', 'tutoring',
    'coaching', 'leadership', 'academy', 'portfolio', 'contact', 'about'
  ]);
  
  words.forEach((word, idx) => {
    // Multiple hash functions for better distribution
    let wordHash1 = 0, wordHash2 = 0, wordHash3 = 0;
    
    for (let i = 0; i < word.length; i++) {
      const charCode = word.charCodeAt(i);
      wordHash1 = ((wordHash1 << 5) - wordHash1 + charCode) & 0xffffffff;
      wordHash2 = ((wordHash2 << 3) - wordHash2 + charCode * 3) & 0xffffffff;
      wordHash3 = ((wordHash3 << 7) - wordHash3 + charCode * 7) & 0xffffffff;
    }
    
    const pos1 = Math.abs(wordHash1) % 768;
    const pos2 = Math.abs(wordHash2) % 768;
    const pos3 = Math.abs(wordHash3) % 768;
    
    // Weight important words more heavily
    const importance = importantWords.has(word) ? 2.0 : 1.0;
    const positionWeight = 1 / (idx + 1); // Earlier words are more important
    const lengthWeight = Math.log(word.length + 1);
    
    embedding[pos1] += 0.3 * importance * positionWeight;
    embedding[pos2] += 0.2 * importance * lengthWeight;
    embedding[pos3] += 0.1 * importance;
  });
  
  // 3. N-gram features (bigrams and trigrams)
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = words[i] + '_' + words[i + 1];
    let bigramHash = 0;
    for (let j = 0; j < bigram.length; j++) {
      bigramHash = ((bigramHash << 3) - bigramHash + bigram.charCodeAt(j)) & 0xffffffff;
    }
    const pos = Math.abs(bigramHash) % 768;
    embedding[pos] += 0.15;
    
    // Trigrams
    if (i < words.length - 2) {
      const trigram = words[i] + '_' + words[i + 1] + '_' + words[i + 2];
      let trigramHash = 0;
      for (let j = 0; j < trigram.length; j++) {
        trigramHash = ((trigramHash << 2) - trigramHash + trigram.charCodeAt(j)) & 0xffffffff;
      }
      const triPos = Math.abs(trigramHash) % 768;
      embedding[triPos] += 0.1;
    }
  }
  
  // 4. Semantic category features
  const categories = {
    technical: ['programming', 'code', 'software', 'development', 'technology', 'algorithm', 'python', 'javascript', 'react', 'nextjs'],
    education: ['school', 'university', 'learn', 'study', 'education', 'academy', 'student', 'course'],
    personal: ['about', 'background', 'story', 'experience', 'passion', 'interest'],
    project: ['project', 'build', 'create', 'develop', 'application', 'app', 'website', 'portfolio'],
    contact: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'connect']
  };
  
  Object.entries(categories).forEach(([category, keywords], catIdx) => {
    const categoryScore = keywords.reduce((score, keyword) => {
      return score + (cleanText.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (categoryScore > 0) {
      const catPos = (catIdx * 50) % 768;
      embedding[catPos] += categoryScore * 0.2;
    }
  });
  
  // 5. Text statistics and structural features
  const textLength = cleanText.length;
  const wordCount = words.length;
  const avgWordLength = wordCount > 0 ? textLength / wordCount : 0;
  const uniqueWords = new Set(words).size;
  const diversity = wordCount > 0 ? uniqueWords / wordCount : 0;
  
  // Add statistical features to specific positions
  embedding[0] += Math.tanh(textLength * 0.001);
  embedding[1] += Math.tanh(wordCount * 0.01);
  embedding[2] += Math.tanh(avgWordLength * 0.1);
  embedding[3] += diversity;
  
  // 6. Question/query type detection
  const questionWords = ['what', 'how', 'when', 'where', 'who', 'why', 'which', 'can', 'does', 'is', 'are'];
  const isQuestion = questionWords.some(qw => words.includes(qw)) || cleanText.includes('?');
  if (isQuestion) {
    embedding[4] += 0.5;
  }
  
  // 7. Normalize the embedding vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= magnitude;
    }
  }
  
  console.log('✅ Generated enhanced embedding with 768 dimensions, magnitude:', magnitude.toFixed(4));
  return embedding;
}

// Function to retrieve relevant context from Pinecone
async function retrieveContext(query) {
  try {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const indexName = process.env.PINECONE_INDEX_NAME || 'albaker-portfolio';
    const index = pc.index(indexName);
    
    console.log('🔍 Creating embedding for query:', query.substring(0, 50) + '...');
    const queryEmbedding = await embedQuery(query);
    
    console.log('🔍 Querying Pinecone index:', indexName, 'with embedding dimensions:', queryEmbedding.length);
    const results = await index.query({
      topK: 3,
      vector: queryEmbedding,
      includeMetadata: true
    });
    
    console.log('📊 Pinecone results:', {
      matches: results.matches.length,
      scores: results.matches.map(m => m.score)
    });
    
    const relevantContext = results.matches
      .filter(match => match.score > 0.5) // Filter for relevant results (lowered threshold)
      .map(match => match.metadata.text)
      .join('\n\n');
    
    if (relevantContext) {
      console.log('✅ Retrieved context length:', relevantContext.length);
      return relevantContext;
    } else {
      console.log('⚠️ No relevant context found, using fallback');
      return getFallbackContext();
    }
  } catch (error) {
    console.error('❌ Context retrieval error:', error);
    console.log('🔄 Using fallback context due to error');
    return getFallbackContext();
  }
}

// Fallback context when Pinecone is unavailable
function getFallbackContext() {
  return `Albaker Ahmed is a Full Stack Developer and ML Engineer from Aswan, Egypt. He studies at African Leadership Academy (2023-2025) and specializes in AI-powered educational platforms. 

His story: Born in Aswan where classrooms were packed and education focused on memorization rather than curiosity. He taught himself coding through unreliable internet connections and found his path at African Leadership Academy.

Vision: A future where every student, no matter where they live, can access quality education.

Mission: Use technology to make education a right, not a privilege.

Expertise: Next.js, React, Flutter, Python, TensorFlow, ML systems, e-learning platforms.

Key Projects:
1. SOLFA web app - ML-powered educational platform
2. FootPrints - AI-powered Flutter shopping app  
3. FixMate - AI assistant for machine repair technicians

Contact: aali23@alastudents.org, GitHub: github.com/albaker, LinkedIn: linkedin.com/in/albaker`;
}

// Function to generate answer using OpenRouter with retrieved context
async function generateAnswer(userQuery) {
  try {
    const context = await retrieveContext(userQuery);
    
    const prompt = `${systemPrompt}\n\nContext about Albaker:\n${context}\n\nQuestion: ${userQuery}\nAnswer:`;
    
    // Use OpenRouter as primary AI service
    console.log('🤖 Calling OpenRouter API...');
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://albaker-portfolio.vercel.app",
        "X-Title": "Albaker Portfolio RAG"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userQuery }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content;
    }
    
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  } catch (error) {
    console.error('❌ Answer generation error:', error);
    throw error;
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export async function POST(request) {
  console.log("🚀 RAG-enabled POST route handler called");
  console.log("Environment check - Keys exist:", {
    openrouter: !!process.env.OPENROUTER_API_KEY,
    huggingface: !!process.env.HUGGINGFACE_API_KEY,
    pinecone: !!process.env.PINECONE_API_KEY,
    model: process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo"
  });
  
  try {
    let body;
    try {
      const text = await request.text();
      console.log("📥 Raw request received, length:", text.length);
      body = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON",
          message: "Request body must be valid JSON",
          details: parseError.message 
        }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      console.error("❌ Invalid messages format");
      return new Response(
        JSON.stringify({ 
          error: "Missing or invalid messages array",
          message: "Request must include a 'messages' array"
        }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    console.log("📨 Processing", messages.length, "messages with RAG pipeline");

    // Get the latest user message
    const userQuery = messages[messages.length - 1]?.content;
    if (!userQuery) {
      return new Response(
        JSON.stringify({ 
          error: "No user query found",
          message: "The last message must have content"
        }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Check required environment variables
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("❌ OpenRouter API key not configured");
      return new Response(
        JSON.stringify({ 
          error: "AI service not configured",
          message: "Please configure OPENROUTER_API_KEY in Vercel environment variables",
          docs: "https://vercel.com/docs/projects/environment-variables"
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      console.error("❌ Hugging Face API key not configured");
      return new Response(
        JSON.stringify({ 
          error: "Embedding service not configured",
          message: "Please configure HUGGINGFACE_API_KEY in Vercel environment variables",
          docs: "https://vercel.com/docs/projects/environment-variables"
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    if (!process.env.PINECONE_API_KEY) {
      console.error("❌ Pinecone API key not configured");
      return new Response(
        JSON.stringify({ 
          error: "Vector database not configured",
          message: "Please configure PINECONE_API_KEY in Vercel environment variables",
          docs: "https://vercel.com/docs/projects/environment-variables"
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Generate answer using RAG pipeline
    console.log("🔍 Starting RAG pipeline...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout for Vercel

    try {
      const reply = await generateAnswer(userQuery);
      clearTimeout(timeoutId);
      
      if (!reply) {
        console.error("❌ No reply generated");
        return new Response(
          JSON.stringify({ 
            error: "No reply from AI model",
            message: "The AI service didn't return a response. Please try again."
          }),
          { 
            status: 502,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }

      console.log("✅ RAG Success! Reply length:", reply.length);
      return new Response(
        JSON.stringify({ reply }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error("❌ Request timeout (8s limit for Vercel)");
        return new Response(
          JSON.stringify({ 
            error: "Request timeout",
            message: "The request took too long to process. Please try a shorter question."
          }),
          { 
            status: 504,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          }
        );
      }
      throw fetchError;
    }

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    console.error("Error stack:", error.stack);
    console.error("Environment check:", {
      hasOpenRouter: !!process.env.OPENROUTER_API_KEY,
      hasHuggingFace: !!process.env.HUGGINGFACE_API_KEY,
      hasPinecone: !!process.env.PINECONE_API_KEY,
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL
    });
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: "Something went wrong. Please try again.",
        details: process.env.NODE_ENV === 'development' ? error.message : "Server error",
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
}

