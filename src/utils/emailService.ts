import { createTransport } from 'nodemailer';
import { renderToString } from 'react-dom/server';
import React from 'react';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  eventId: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registrationDate: Date;
}

/**
 * Sends an event registration confirmation email with hall ticket attachment
 * @param data Participant and event data for email
 * @returns Promise resolving to success boolean
 */
export const sendEventRegistrationEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Create a unique registration ID
    const registrationId = `NEX-${data.eventId}-${Date.now().toString().slice(-6)}`;
    
    // Generate hall ticket PDF
    const hallTicketBuffer = await generateHallTicket({
      ...data,
      registrationId
    });

    // Configure SMTP transport
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'noreply.nexhub@gmail.com',
        pass: 'fkyu fxrx vmpt jqey', // Use an app password rather than account password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: '"NexHub Community" <noreply.nexhub@gmail.com>',
      to: data.email,
      subject: `Registration Confirmation for ${data.eventName}`,
      html: getEmailTemplate(data, registrationId),
      attachments: [
        {
          filename: `NexHub_${data.eventName.replace(/\s+/g, '_')}_HallTicket.pdf`,
          content: hallTicketBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    // Save registration to database (implementation would be added here)
    
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

/**
 * Generate PDF hall ticket for event
 */
const generateHallTicket = async (data: EmailData & { registrationId: string }): Promise<Buffer> => {
  // In a real implementation, you would:
  // 1. Create an HTML template for the hall ticket
  // 2. Use puppeteer to render the HTML to PDF
  // 3. Return the PDF buffer
  
  const hallTicketHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Event Hall Ticket</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .ticket {
          width: 800px;
          margin: 0 auto;
          border: 2px solid #3563E9;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #3563E9;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .event-details, .attendee-details {
          margin-bottom: 20px;
        }
        h1, h2 {
          margin: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .qr-placeholder {
          text-align: center;
          margin-top: 20px;
          border: 1px dashed #ccc;
          padding: 20px;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 15px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <h1>NexHub Community</h1>
          <h2>Event Hall Ticket</h2>
        </div>
        <div class="content">
          <div class="event-details">
            <h3>Event Details</h3>
            <table>
              <tr>
                <th>Event Name:</th>
                <td>${data.eventName}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>${data.eventDate}</td>
              </tr>
              <tr>
                <th>Time:</th>
                <td>${data.eventTime}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>${data.eventLocation}</td>
              </tr>
            </table>
          </div>
          
          <div class="attendee-details">
            <h3>Attendee Information</h3>
            <table>
              <tr>
                <th>Registration ID:</th>
                <td>${data.registrationId}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>${data.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>${data.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>${data.phone}</td>
              </tr>
              <tr>
                <th>Organization:</th>
                <td>${data.organization}</td>
              </tr>
            </table>
          </div>
          
          <div class="qr-placeholder">
            <p>QR Code for check-in will be displayed here</p>
            <p>(Registration ID: ${data.registrationId})</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Please bring this hall ticket (printed or on your mobile device) to the event.</p>
          <p>For any queries, contact us at info@nexhubcommunity.org</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Use puppeteer to generate PDF from HTML
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(hallTicketHtml);
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  await browser.close();
  
  return pdfBuffer;
};

/**
 * Generate HTML email template for confirmation email
 */
const getEmailTemplate = (data: EmailData, registrationId: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Registration Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          padding: 20px;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .content {
          padding: 20px 0;
        }
        .event-info {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .event-info p {
          margin: 5px 0;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3563E9;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Registration Confirmation</h1>
        </div>
        
        <div class="content">
          <p>Hello ${data.name},</p>
          
          <p>Thank you for registering for <strong>${data.eventName}</strong>. Your registration has been confirmed.</p>
          
          <div class="event-info">
            <p><strong>Event:</strong> ${data.eventName}</p>
            <p><strong>Date:</strong> ${data.eventDate}</p>
            <p><strong>Time:</strong> ${data.eventTime}</p>
            <p><strong>Location:</strong> ${data.eventLocation}</p>
            <p><strong>Registration ID:</strong> ${registrationId}</p>
          </div>
          
          <p>We have attached your hall ticket to this email. Please bring it with you to the event (either printed or on your mobile device).</p>
          
          <div class="cta">
            <a href="https://nexhubcommunity.vercel.app/events/${data.eventId}" class="button">View Event Details</a>
          </div>
          
          <p>If you have any questions, feel free to reply to this email or contact us at info@nexhubcommunity.org.</p>
          
          <p>We're looking forward to seeing you at the event!</p>
          
          <p>Best regards,<br>NexHub Community Team</p>
        </div>
        
        <div class="footer">
          <p>This email was sent to ${data.email} because you registered for an event at NexHub Community.</p>
          <p>&copy; ${new Date().getFullYear()} NexHub Community. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default { sendEventRegistrationEmail }; 