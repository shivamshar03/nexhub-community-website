// Debug endpoint to check API connectivity
export default function handler(req, res) {
  try {
    const debugInfo = {
      status: 'success',
      message: 'API server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      config: {
        emailConfigured: !!process.env.SMTP_PASSWORD && !!process.env.SMTP_EMAIL,
        googleScriptConfigured: !!process.env.GOOGLE_SCRIPT_URL
      },
      headers: {
        host: req.headers.host,
        origin: req.headers.origin,
        referer: req.headers.referer
      }
    };
    
    res.status(200).json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to retrieve debug information',
      error: error.message
    });
  }
} 