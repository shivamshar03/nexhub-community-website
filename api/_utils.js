import axios from 'axios';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

// Function to save registration to Google Sheets using Google Apps Script
export async function saveToSpreadsheet(registrationData) {
  try {
    console.log('=== SPREADSHEET SUBMISSION START ===');
    
    // Validate environment variables
    if (!process.env.GOOGLE_SCRIPT_URL) {
      throw new Error('GOOGLE_SCRIPT_URL is not defined in environment variables');
    }
    console.log('Using GOOGLE_SCRIPT_URL:', process.env.GOOGLE_SCRIPT_URL);

    // Deep clone the data to avoid modifying the original
    let dataToSend;
    try {
      dataToSend = JSON.parse(JSON.stringify(registrationData));
      console.log('Successfully cloned registration data');
    } catch (cloneError) {
      console.error('Error cloning data:', cloneError);
      // If cloning fails, create a new object manually
      dataToSend = {};
      Object.keys(registrationData).forEach(key => {
        if (registrationData[key] !== undefined) {
          dataToSend[key] = registrationData[key];
        }
      });
      console.log('Manually copied registration data');
    }
    
    // Validate that all required fields are present
    const requiredBaseFields = ['fullName', 'email', 'phone', 'division'];
    const missingFields = requiredBaseFields.filter(field => {
      const value = dataToSend[field];
      const isValid = value !== undefined && value !== null && 
                      (typeof value !== 'string' || value.trim() !== '');
      console.log(`Validating required field ${field}: ${value} (${typeof value}) - Valid: ${isValid}`);
      return !isValid;
    });
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Sanitize and prepare data
    console.log('Sanitizing data fields...');
    Object.keys(dataToSend).forEach(key => {
      const originalValue = dataToSend[key];
      const originalType = typeof originalValue;
      
      // Convert any undefined or null values to empty strings
      if (dataToSend[key] === undefined || dataToSend[key] === null) {
        dataToSend[key] = '';
      }
      // Convert booleans to strings for sheet compatibility
      if (typeof dataToSend[key] === 'boolean') {
        dataToSend[key] = dataToSend[key] ? 'Yes' : 'No';
      }
      // Ensure all string values are trimmed
      if (typeof dataToSend[key] === 'string') {
        dataToSend[key] = dataToSend[key].trim();
      }
      
      // Log any transformations
      if (originalValue !== dataToSend[key] || originalType !== typeof dataToSend[key]) {
        console.log(`Transformed ${key}: ${originalValue} (${originalType}) -> ${dataToSend[key]} (${typeof dataToSend[key]})`);
      }
    });
    
    // Convert JSON to form-urlencoded which works better with Google Apps Script
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(dataToSend));
    
    // Debug the data being sent
    console.log('Data being sent to spreadsheet (all fields):', Object.keys(dataToSend).join(', '));
    
    // Send POST request to Google Apps Script Web App
    console.log('Sending request to Google Apps Script...');
    const response = await axios({
      method: 'post',
      url: process.env.GOOGLE_SCRIPT_URL,
      data: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxRedirects: 5,
      timeout: 30000,
    });
    
    console.log('Google Sheets response status:', response.status);
    console.log('Google Sheets response data:', response.data);
    
    if (!response.data || !response.data.success) {
      throw new Error('Failed to save to spreadsheet: ' + (response.data?.message || 'Unknown error'));
    }
    
    console.log('=== SPREADSHEET SUBMISSION SUCCESSFUL ===');
    return true;
  } catch (error) {
    console.error('=== SPREADSHEET SUBMISSION FAILED ===');
    console.error('Error saving to spreadsheet:', error.message);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received from Google Apps Script');
      console.error('Request details:', JSON.stringify(error.request));
    }
    
    throw error;
  }
}

// Generate QR code
export async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}

// Get an email transporter
export function getEmailTransporter() {
  return nodemailer.createTransport({
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
}

// CORS Headers
export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
} 