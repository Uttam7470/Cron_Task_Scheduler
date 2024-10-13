import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger.js'; // Assuming you are using winston for logging

dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Optional: Add a connection timeout
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 5,
});

// Send email function
export const sendEmail = async (to, subject, text, html = '') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`, // Fallback to HTML if not provided
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}: ${info.response}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    throw error;
  }
};
