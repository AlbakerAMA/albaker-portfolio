// Health check endpoint for debugging deployment issues
export async function GET() {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
      runtime: 'nodejs'
    },
    services: {
      openrouter: {
        configured: !!process.env.OPENROUTER_API_KEY,
        keyPrefix: process.env.OPENROUTER_API_KEY ? 
          process.env.OPENROUTER_API_KEY.substring(0, 8) + '...' : 'not set'
      },
      huggingface: {
        configured: !!process.env.HUGGINGFACE_API_KEY,
        keyPrefix: process.env.HUGGINGFACE_API_KEY ? 
          process.env.HUGGINGFACE_API_KEY.substring(0, 8) + '...' : 'not set'
      },
      pinecone: {
        configured: !!process.env.PINECONE_API_KEY,
        keyPrefix: process.env.PINECONE_API_KEY ? 
          process.env.PINECONE_API_KEY.substring(0, 8) + '...' : 'not set',
        indexName: process.env.PINECONE_INDEX_NAME || 'albaker-portfolio'
      }
    }
  };

  // Test basic connectivity (without using API keys)
  try {
    const testResponse = await fetch('https://httpbin.org/get', {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    healthCheck.connectivity = {
      external: testResponse.ok,
      status: testResponse.status
    };
  } catch (error) {
    healthCheck.connectivity = {
      external: false,
      error: error.message
    };
  }

  const allConfigured = healthCheck.services.openrouter.configured && 
                       healthCheck.services.huggingface.configured && 
                       healthCheck.services.pinecone.configured;

  return new Response(
    JSON.stringify(healthCheck, null, 2),
    {
      status: allConfigured ? 200 : 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}