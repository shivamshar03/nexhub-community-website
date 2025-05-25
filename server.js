const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const QRCode = require('qrcode');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add OPTIONS handler for preflight requests
app.options('*', cors());

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add detailed request logging for debugging API endpoints
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers));
  
  if (req.method === 'POST') {
    console.log('Request body:', JSON.stringify(req.body));
  }
  
  // Add response logging
  const originalSend = res.send;
  res.send = function(body) {
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode}:`, 
      body.length > 1000 ? body.substring(0, 1000) + '... (truncated)' : body);
    return originalSend.call(this, body);
  };
  
  next();
});

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'dist')));

// Function to save registration to Google Sheets using Google Apps Script
async function saveToSpreadsheet(registrationData) {
  try {
    console.log('Sending data to Google Apps Script:', JSON.stringify(registrationData));
    console.log('Using URL:', process.env.GOOGLE_SCRIPT_URL);
    
    if (!process.env.GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL is not defined in environment variables');
      return false;
    }
    
    // Convert JSON to form-urlencoded which works better with Google Apps Script
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(registrationData));
    
    // Send POST request to Google Apps Script Web App
    const response = await axios({
      method: 'post',
      url: process.env.GOOGLE_SCRIPT_URL,
      data: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxRedirects: 5, // Allow redirects
    });
    
    console.log('Google Sheets response:', response.data);
    return true;
  } catch (error) {
    console.error('Error saving to spreadsheet:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Google Apps Script');
      console.error('Request details:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return false;
  }
}

// Generate QR code
async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}

// API endpoint for sending emails
app.post('/api/send-registration-email', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, phone, organization, eventId, eventName, eventDate, eventTime, eventLocation, additionalInfo } = req.body;
    
    // Validate required fields
    if (!name || !email || !eventName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create registration ID
    const registrationId = `NEX-${eventId}-${Date.now().toString().slice(-6)}`;
    
    // Generate QR code with registration details
    const qrCodeDataURL = await generateQRCode(JSON.stringify({
      registrationId,
      name,
      eventName,
      eventDate,
      eventTime
    }));
    
    // Save registration to spreadsheet
    const registrationData = {
      registrationId,
      name,
      email,
      phone,
      organization,
      eventId,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      additionalInfo,
      registrationDate: new Date().toISOString()
    };
    
    try {
      // Try to save to spreadsheet but don't fail the whole request if it doesn't work
      const spreadsheetSaved = await saveToSpreadsheet(registrationData);
      if (!spreadsheetSaved) {
        console.warn('Failed to save to spreadsheet, but will continue with email sending');
      }
    } catch (sheetError) {
      console.error('Error in spreadsheet save (continuing):', sheetError);
    }
    
    try {
      // Configure transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com',
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false // Helps with some Vercel deployment issues
        }
      });

      // Email content
      const mailOptions = {
        from: `"NexHub Community" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
        to: email,
        subject: `Registration Confirmation for ${eventName}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <h1>Registration Confirmation</h1>
            <p>Hello ${name},</p>
            <p>Thank you for registering for <strong>${eventName}</strong>. Your registration has been confirmed.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Event:</strong> ${eventName}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Time:</strong> ${eventTime}</p>
              <p><strong>Location:</strong> ${eventLocation}</p>
              <p><strong>Registration ID:</strong> ${registrationId}</p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <p><strong>Your QR Code Hall Ticket</strong></p>
              <p>Please present this QR code at the event entrance</p>
              <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;"/>
            </div>
            
            <p>We're looking forward to seeing you at the event!</p>
            <p>Best regards,<br>NexHub Community Team</p>
          </div>
        `,
      };

      console.log('Attempting to send email to:', email);
      
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      
      // Success response
      res.status(200).json({ 
        success: true, 
        message: 'Registration confirmation email sent successfully',
        registrationId: registrationId
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // If email fails but we have the registration data, still return success
      // but with a flag indicating email failed
      res.status(200).json({ 
        success: true, 
        emailSent: false,
        message: 'Registration completed but email delivery failed. Please contact support.',
        registrationId: registrationId
      });
    }
  } catch (error) {
    console.error('Error in registration process:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again or contact support.', 
      error: error.message 
    });
  }
});

// API endpoint for recruitment form submissions
app.post('/api/submit-recruitment', async (req, res) => {
  try {
    console.log('Recruitment form submission received:', req.body);
    const { fullName, email, phone, portfolio, role, division, collegeName, branch, year } = req.body;
    
    // Map division to proper role name if both are present
    const divisionToRoleMap = {
      'tech': 'Technical',
      'operations': 'Management',
      'design': 'designing',
      'photography': 'photo and videography'
    };
    
    // Use role if provided, otherwise convert division to appropriate role name
    const displayRole = role || (division ? divisionToRoleMap[division] || division : 'Not specified');
    
    // Construct experience from college fields
    const experience = `${collegeName || ''}, ${branch || ''}, ${year || ''}`;
    
    // Validate required fields
    if (!fullName || !email || !displayRole) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create application ID
    const applicationId = `NX-TEAM-${Date.now().toString().slice(-6)}`;
    
    // Prepare data for spreadsheet
    const applicationData = {
      applicationId,
      fullName,
      email,
      phone: phone || 'Not provided',
      portfolioLink: portfolio || 'Not provided',
      role: displayRole,
      experience,
      applicationDate: new Date().toISOString(),
      status: 'Pending Review',
      // Include all the original request data
      originalData: JSON.stringify(req.body)
    };
    
    try {
      // Save to the same spreadsheet but different sheet/tab
      const spreadsheetSaved = await saveToSpreadsheet({
        ...applicationData,
        dataType: 'recruitment' // Add a flag to identify recruitment data in the Google Apps Script
      });
      
      if (!spreadsheetSaved) {
        console.warn('Failed to save recruitment data to spreadsheet');
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to save your application. Please try again later.' 
        });
      }
      
      // Optionally send a confirmation email to the applicant
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com',
            pass: process.env.SMTP_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        
        await transporter.sendMail({
          from: `"NexHub Community" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
          to: email,
          subject: `NexHub Team Application Received`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
              <h1>Application Received</h1>
              <p>Hello ${fullName},</p>
              <p>Thank you for your interest in joining the NexHub team! We've received your application for the <strong>${displayRole}</strong> role.</p>
              <p>Your application ID is: <strong>${applicationId}</strong></p>
              <p>Our team will review your application and get back to you soon if your qualifications match our requirements.</p>
              <p>Best regards,<br>NexHub Community Team</p>
            </div>
          `,
        });
        
        console.log('Confirmation email sent to applicant:', email);
      } catch (emailError) {
        console.error('Error sending application confirmation email:', emailError);
        // Continue even if email fails
      }
      
      // Success response
      res.status(200).json({ 
        success: true, 
        message: 'Application submitted successfully!',
        applicationId
      });
      
    } catch (error) {
      console.error('Error saving recruitment data:', error);
      res.status(500).json({ 
        success: false, 
        message: 'There was an error processing your application. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('Error in recruitment submission process:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Application submission failed. Please try again or contact support.', 
      error: error.message 
    });
  }
});

// Ensure environment variables are correctly loaded for Vercel
app.post('/api/verify-email-config', (req, res) => {
  try {
    // Return email configuration status (without exposing credentials)
    res.status(200).json({ 
      configured: !!process.env.SMTP_PASSWORD, 
      email: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'
    });
  } catch (error) {
    console.error('Email configuration check error:', error);
    res.status(500).json({ success: false, message: 'Failed to check email configuration.' });
  }
});

// Debug endpoint to check API connectivity
app.get('/api/debug', (req, res) => {
  try {
    const debugInfo = {
      status: 'success',
      message: 'API server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      config: {
        port: process.env.PORT || 5000,
        emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS,
        googleScriptConfigured: !!process.env.GOOGLE_SCRIPT_URL
      },
      headers: {
        host: req.headers.host,
        origin: req.headers.origin,
        referer: req.headers.referer
      }
    };
    
    res.json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to retrieve debug information',
      error: error.message
    });
  }
});

// Test endpoint for recruitment submissions
app.get('/api/test-recruitment', (req, res) => {
  res.json({
    status: 'success',
    message: 'Recruitment API test successful',
    testApplicationId: 'TEST-' + Date.now(),
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for event registrations
app.get('/api/test-registration', (req, res) => {
  res.json({
    status: 'success',
    message: 'Registration API test successful',
    testRegistrationId: 'TEST-' + Date.now(),
    timestamp: new Date().toISOString()
  });
});

// Handle all other routes for SPA routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 