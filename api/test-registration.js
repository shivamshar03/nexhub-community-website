// Test endpoint for event registrations
export default function handler(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Registration API test successful',
    testRegistrationId: 'TEST-' + Date.now(),
    timestamp: new Date().toISOString()
  });
} 