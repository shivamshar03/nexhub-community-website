// Test endpoint for recruitment submissions
export default function handler(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Recruitment API test successful',
    testApplicationId: 'TEST-' + Date.now(),
    timestamp: new Date().toISOString()
  });
} 