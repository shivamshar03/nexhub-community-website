import { saveToSpreadsheet, getEmailTransporter, setCorsHeaders } from './_utils.js';

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
    // ENHANCED DEBUG: Log headers to check content type
    console.log('Request headers:', req.headers);
    
    // Parse JSON body
    let formData;
    try {
      // ENHANCED DEBUG: Add more detailed logging for request body
      console.log('Raw request body type:', typeof req.body);
      console.log('Raw request body content:', req.body);
      
      // Ensure we have a proper object 
      if (typeof req.body === 'string') {
        try {
          formData = JSON.parse(req.body);
          console.log('Parsed string body to JSON');
        } catch (parseError) {
          console.error('Failed to parse string body as JSON:', parseError);
          throw new Error('Failed to parse request body as JSON');
        }
      } else {
        formData = req.body;
      }
      
      if (!formData || typeof formData !== 'object') {
        throw new Error('Invalid request body format');
      }
      
      // Log all available keys in the formData
      console.log('FormData keys received:', Object.keys(formData));
      
      // Remove any unexpected or undefined keys
      Object.keys(formData).forEach(key => {
        if (formData[key] === undefined || formData[key] === null) {
          console.log(`Removing undefined/null key: ${key}`);
          delete formData[key];
        }
      });
      
      // Convert string 'true'/'false' to boolean values if needed
      const booleanFields = ['privacyPolicy', 'termsAccepted', 'comfortableWithMeetings', 
                            'familiarWithFrameworks', 'hasEventExperience', 'comfortableWithReels'];
      booleanFields.forEach(field => {
        if (field in formData) {
          const originalValue = formData[field];
          if (typeof formData[field] === 'string') {
            formData[field] = formData[field].toLowerCase() === 'true';
          }
          console.log(`Processed boolean field ${field}: original=${originalValue}, converted=${formData[field]}`);
        }
      });
      
    } catch (error) {
      console.error('Error parsing request body:', error.message);
      return res.status(400).json({
        success: false,
        message: 'Invalid request body format',
        error: error.message
      });
    }
    
    // Log the received data for debugging
    console.log('Processed form data:', JSON.stringify(formData, null, 2));
    
    // Validate required fields
    const requiredFields = [
      'fullName',
      'email',
      'phone',
      'collegeName',
      'branch',
      'year',
      'division',
      'weeklyHours',
      'comfortableWithMeetings',
      'privacyPolicy',
      'termsAccepted'
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      console.log(`Checking required field ${field}: type=${typeof value}, value=${value}`);
      
      // For boolean fields, only check if they are undefined or false (for privacy policy and terms)
      if (field === 'privacyPolicy' || field === 'termsAccepted') {
        return value !== true;
      }
      
      // For other fields, check if they are empty strings or undefined
      return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
    });

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    // Validate division-specific fields
    if (formData.division === 'tech') {
      console.log('Validating Tech & Development fields');
      const techFields = ['programmingLanguages', 'techContributions'];
      const missingTechFields = techFields.filter(field => {
        const value = formData[field];
        console.log(`Checking tech field ${field}: type=${typeof value}, value=${value}`);
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
      });
      
      if (missingTechFields.length > 0) {
        console.log('Missing tech fields:', missingTechFields);
        return res.status(400).json({
          success: false,
          message: `Missing required fields for Tech & Development: ${missingTechFields.join(', ')}`
        });
      }
      
      // Only require frameworksList if familiarWithFrameworks is true
      console.log('Checking conditional field: familiarWithFrameworks =', formData.familiarWithFrameworks);
      if (formData.familiarWithFrameworks === true) {
        console.log('Frameworks list required. Current value:', formData.frameworksList);
        if (!formData.frameworksList || formData.frameworksList.trim() === '') {
          console.log('familiarWithFrameworks is true but frameworksList is missing');
          return res.status(400).json({
            success: false,
            message: 'Please specify which frameworks/tools you are familiar with'
          });
        }
      } else {
        console.log('Frameworks list not required');
        // If not familiar with frameworks, empty string is acceptable
        if (!formData.frameworksList) formData.frameworksList = '';
      }
    } else if (formData.division === 'operations') {
      console.log('Validating Operations & Management fields');
      const opsFields = ['taskManagement', 'eventSuggestion'];
      const missingOpsFields = opsFields.filter(field => {
        const value = formData[field];
        console.log(`Checking operations field ${field}: type=${typeof value}, value=${value}`);
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
      });
      
      if (missingOpsFields.length > 0) {
        console.log('Missing operations fields:', missingOpsFields);
        return res.status(400).json({
          success: false,
          message: `Missing required fields for Operations & Management: ${missingOpsFields.join(', ')}`
        });
      }
      
      // Only require eventExperience if hasEventExperience is true
      console.log('Checking conditional field: hasEventExperience =', formData.hasEventExperience);
      if (formData.hasEventExperience === true) {
        console.log('Event experience required. Current value:', formData.eventExperience);
        if (!formData.eventExperience || formData.eventExperience.trim() === '') {
          console.log('hasEventExperience is true but eventExperience is missing');
          return res.status(400).json({
            success: false,
            message: 'Please describe your event experience'
          });
        }
      } else {
        console.log('Event experience not required');
        // If no event experience, empty string is acceptable
        if (!formData.eventExperience) formData.eventExperience = '';
      }
    } else if (formData.division === 'design') {
      console.log('Validating Design & Creatives fields');
      const designFields = ['designTools', 'designWorkInterest'];
      const missingDesignFields = designFields.filter(field => {
        const value = formData[field];
        console.log(`Checking design field ${field}: type=${typeof value}, value=${value}`);
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
      });
      
      if (missingDesignFields.length > 0) {
        console.log('Missing design fields:', missingDesignFields);
        return res.status(400).json({
          success: false,
          message: `Missing required fields for Design & Creatives: ${missingDesignFields.join(', ')}`
        });
      }
    } else if (formData.division === 'photography') {
      console.log('Validating Photography & Cinematics fields');
      const photoFields = ['cameraPreference', 'contentType'];
      const missingPhotoFields = photoFields.filter(field => {
        const value = formData[field];
        console.log(`Checking photography field ${field}: type=${typeof value}, value=${value}`);
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
      });
      
      if (missingPhotoFields.length > 0) {
        console.log('Missing photography fields:', missingPhotoFields);
        return res.status(400).json({
          success: false,
          message: `Missing required fields for Photography & Cinematics: ${missingPhotoFields.join(', ')}`
        });
      }
      
      // Check the comfortableWithReels field
      console.log('Checking comfortableWithReels field:', formData.comfortableWithReels);
      if (formData.comfortableWithReels === undefined) {
        console.log('comfortableWithReels field is missing');
        formData.comfortableWithReels = false; // Default to false if not specified
      }
    } else {
      console.log('Invalid division specified:', formData.division);
      return res.status(400).json({
        success: false,
        message: `Invalid division: ${formData.division}`
      });
    }

    // Prepare data for spreadsheet - ensure all values are properly sanitized
    console.log('Preparing data for spreadsheet submission');
    const spreadsheetData = {
      timestamp: new Date().toISOString(),
      fullName: String(formData.fullName || '').trim(),
      email: String(formData.email || '').trim(),
      phone: String(formData.phone || '').trim(),
      collegeName: String(formData.collegeName || '').trim(),
      branch: String(formData.branch || '').trim(),
      year: String(formData.year || '').trim(),
      linkedin: formData.linkedin ? String(formData.linkedin).trim() : '',
      portfolio: formData.portfolio ? String(formData.portfolio).trim() : '',
      instagram: formData.instagram ? String(formData.instagram).trim() : '',
      otherLink: formData.otherLink ? String(formData.otherLink).trim() : '',
      division: String(formData.division || ''),
      weeklyHours: String(formData.weeklyHours || '').trim(),
      comfortableWithMeetings: Boolean(formData.comfortableWithMeetings),
      privacyPolicy: Boolean(formData.privacyPolicy),
      termsAccepted: Boolean(formData.termsAccepted),
      dataType: 'recruitment'
    };

    // Add division-specific data
    if (formData.division === 'tech') {
      console.log('Adding Tech & Development specific fields');
      Object.assign(spreadsheetData, {
        programmingLanguages: String(formData.programmingLanguages || '').trim(),
        techProject: String(formData.techProject || '').trim(),
        familiarWithFrameworks: Boolean(formData.familiarWithFrameworks),
        frameworksList: formData.frameworksList ? String(formData.frameworksList).trim() : '',
        techContributions: String(formData.techContributions || '').trim(),
        // Include empty values for other divisions' fields to ensure consistent columns
        hasEventExperience: '',
        eventExperience: '',
        taskManagement: '',
        eventSuggestion: '',
        designTools: '',
        designWorkInterest: '',
        cameraPreference: '',
        contentType: '',
        comfortableWithReels: ''
      });
    } else if (formData.division === 'operations') {
      console.log('Adding Operations & Management specific fields');
      Object.assign(spreadsheetData, {
        hasEventExperience: Boolean(formData.hasEventExperience),
        eventExperience: formData.eventExperience ? String(formData.eventExperience).trim() : '',
        taskManagement: String(formData.taskManagement || '').trim(),
        eventSuggestion: String(formData.eventSuggestion || '').trim(),
        // Include empty values for other divisions' fields to ensure consistent columns
        programmingLanguages: '',
        techProject: '',
        familiarWithFrameworks: '',
        frameworksList: '',
        techContributions: '',
        designTools: '',
        designWorkInterest: '',
        cameraPreference: '',
        contentType: '',
        comfortableWithReels: ''
      });
    } else if (formData.division === 'design') {
      console.log('Adding Design & Creatives specific fields');
      Object.assign(spreadsheetData, {
        designTools: String(formData.designTools || '').trim(),
        designWorkInterest: String(formData.designWorkInterest || '').trim(),
        // Include empty values for other divisions' fields to ensure consistent columns
        programmingLanguages: '',
        techProject: '',
        familiarWithFrameworks: '',
        frameworksList: '',
        techContributions: '',
        hasEventExperience: '',
        eventExperience: '',
        taskManagement: '',
        eventSuggestion: '',
        cameraPreference: '',
        contentType: '',
        comfortableWithReels: ''
      });
    } else if (formData.division === 'photography') {
      console.log('Adding Photography & Cinematics specific fields');
      Object.assign(spreadsheetData, {
        cameraPreference: String(formData.cameraPreference || '').trim(),
        contentType: String(formData.contentType || '').trim(),
        comfortableWithReels: Boolean(formData.comfortableWithReels),
        // Include empty values for other divisions' fields to ensure consistent columns
        programmingLanguages: '',
        techProject: '',
        familiarWithFrameworks: '',
        frameworksList: '',
        techContributions: '',
        hasEventExperience: '',
        eventExperience: '',
        taskManagement: '',
        eventSuggestion: '',
        designTools: '',
        designWorkInterest: ''
      });
    }
    
    console.log('Prepared spreadsheet data:', JSON.stringify(spreadsheetData, null, 2));

    // Save to spreadsheet
    try {
      console.log('Attempting to save data to spreadsheet...');
      await saveToSpreadsheet(spreadsheetData);
      console.log('Successfully saved data to spreadsheet');
    } catch (spreadsheetError) {
      console.error('Error saving to spreadsheet:', spreadsheetError);
      return res.status(500).json({
        success: false,
        message: 'Error saving to spreadsheet',
        error: spreadsheetError.message
      });
    }

    // Send confirmation email
    try {
      console.log('Attempting to send confirmation email to:', formData.email);
      
      // Verify that SMTP environment variables are set
      if (!process.env.SMTP_PASSWORD) {
        console.warn('SMTP_PASSWORD environment variable is not set. Email will not be sent.');
        // Don't throw an error, we'll still consider the submission successful
      } else {
        const transporter = getEmailTransporter();

        const getDivisionName = (division) => {
          switch (division) {
            case 'tech':
              return 'Technical';
            case 'photography':
              return 'Photo and Videography';
            case 'operations':
              return 'Management';
            case 'design':
              return 'Designing';
            default:
              return division;
          }
        };
        


        // Prepare email content
        const emailContent = {
          from: `"NexHub Community" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
          to: formData.email,
          subject: 'NexHub Team Application Received',
          html: `
          <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>NexHub Application Received</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07); padding: 40px 30px; border: 1px solid #e5e7eb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1f2937;">
            <tr>
              <td align="center" style="text-align: center;">
                <img src="https://github.com/NexHub-Community/nexhub-content/blob/3bf3c8bfb84242e28e3ec78a3e68b7c099442fb1/nexhub-logo-removebg-preview.png?raw=true" alt="NexHub Logo" style="width: 160px; margin-bottom: -20px;" />
                <h1 style="color: #0f62fe; font-size: 30px; margin: 0;">🎉 Application Received!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 30px; font-size: 16px;">
                <p style="margin: 0 0 16px;">Hi <strong>${formData.fullName}</strong>,</p>
                <p style="margin: 0 0 16px; line-height: 1.6;">
                  We're thrilled that you want to be a part of <strong style="color: #0f62fe;">NexHub</strong>! Your application for the <strong style="color: #0f62fe;">${getDivisionName(formData.division)}</strong> role has been successfully received.
                </p>
                <p style="margin: 0 0 16px; line-height: 1.6;">
                  Our team is currently reviewing all submissions, and we'll be reaching out shortly with the next steps. Until then, feel free to explore our community and see what we're building together!
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 30px 0;">
                <a href="https://nexhubcommunity.vercel.app" target="_blank" style="background-color: #0f62fe; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 500; display: inline-block;">
                  🌐 Visit NexHub Website
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size: 14px; color: #6b7280; text-align: left;">
                <p style="margin: 0;">Warm regards,<br><strong>The NexHub Team</strong></p>
              </td>
            </tr>
            <tr>
              <td>
                <hr style="margin: 30px 0; border: none; height: 1px; background-color: #e5e7eb;" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-size: 14px; color: #9ca3af; margin-bottom: 10px;">Stay connected with us:</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="padding: 0 8px;">
                      <a href="https://www.linkedin.com/in/nexhubcommunity/" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 26px;" />
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="https://www.instagram.com/nexhubcommunity/" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 26px;" />
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="https://chat.whatsapp.com/IrfYbZfyJGrF3KuPiM8ElH" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style="width: 26px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

          `
        };
        
        console.log('Sending email with the following details:');
        console.log('- From:', emailContent.from);
        console.log('- To:', emailContent.to);
        console.log('- Subject:', emailContent.subject);
        
        await transporter.sendMail(emailContent);
        console.log('Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError.message);
      if (emailError.code) {
        console.error('Error code:', emailError.code);
      }
      // Don't fail the request if email fails, just log it
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error processing recruitment application:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
} 