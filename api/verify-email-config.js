export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Return email configuration status (without exposing credentials)
    res.status(200).json({ 
      configured: !!process.env.SMTP_PASSWORD, 
      email: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'
    });
  } catch (error) {
    console.error('Email configuration check error:', error);
    res.status(500).json({ success: false, message: 'Failed to check email configuration.' });
  }
} 