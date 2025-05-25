import { saveToSpreadsheet, generateQRCode, getEmailTransporter, setCorsHeaders } from './_utils.js';

export default async function handler(req, res) {
  // Set CORS headers
  setCorsHeaders(res);
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
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
      registrationDate: new Date().toISOString(),
      dataType: 'registration'
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
      // Get transporter
      const transporter = getEmailTransporter();

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
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This is an automated email. Please do not reply.</p>
              <p>© NexHub Community. All rights reserved.</p>
            </div>
          </div>
        `
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Registration successful',
        registrationId,
        emailSent: true
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // If email fails but we saved to spreadsheet, return partial success
      return res.status(200).json({
        success: true,
        message: 'Registration saved but email sending failed',
        registrationId,
        emailSent: false,
        emailError: emailError.message
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing registration',
      error: error.message
    });
  }
} 