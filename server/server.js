// server.js - Email Backend for BrailleRead
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Email server is running!' });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email options
  const mailOptions = {
    from: `"BrailleRead Contact Form" <${process.env.EMAIL_USER}>`, // Your email
    to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER, // Where you want to receive emails
    replyTo: `"${name}" <${email}>`, // User's email - when you hit reply, it goes to them!
    subject: `New Contact from ${name} - BrailleRead`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">📧 New Contact Form Submission</h2>
          <p style="color: #e0e7ff; margin: 5px 0 0 0;">BrailleRead Landing Page</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600; width: 100px;">Name:</td>
                <td style="padding: 10px 0; color: #1f2937;"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Message</h3>
            <p style="line-height: 1.8; color: #4b5563; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; border-radius: 0 0 12px 12px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            💡 <strong>Tip:</strong> Click "Reply" to respond directly to ${name}
          </p>
          <p style="color: #6b7280; font-size: 11px; margin: 10px 0 0 0;">
            Sent from BrailleRead Contact Form • ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `,
    // Plain text version for email clients that don't support HTML
    text: `
New Contact Form Submission - BrailleRead

From: ${name}
Email: ${email}

Message:
${message}

---
Reply to this email to respond directly to ${name}
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});