import { User } from "../models/userSchema";
import nodemailer from "nodemailer";
import { generateToken } from "../middleware/jwt.js";

// Setup to send emails from the app using nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS_NODEMAILER,
    pass: process.env.EMAIL_PASSWORD_NODEMAILER,
  },
});

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // TODO validators in schema or controller or both?

    // Create new user and generate verification token
    const newUser = new User({ name, email, password });
    const token = generateToken({ userId: newUser._id }); // Payload with user ID
    newUser.validationToken = token; // Store validation token in user's validationToken field
    await newUser.save();

    // Set up email options
    // IMPORTANT adapt to our new app name
    const mailOptions = {
      from: "LeckerLex",
      to: newUser.email,
      subject: "Confirm Your Registration - LeckerLex",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Welcome to Photo Journal!</h2>
        <p style="font-size: 16px; color: #555;">Hi ${newUser.name},</p>
        <p style="font-size: 16px; color: #555;">
          Thank you for registering on Photo Journal App! To get started, we just need to verify your email address. 
          Please click the button below to confirm your account:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a 
            href="${process.env.BASE_URL}${
        process.env.PORT
      }/email-verification/${token}" 
            style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;"
          >
            Verify Email
          </a>
        </div>
        <p style="font-size: 16px; color: #555;">
          Or, if the button doesn't work, you can copy and paste the following link into your browser:
        </p>
        <p style="font-size: 16px; color: #555; word-wrap: break-word;">
          <a href="${process.env.BASE_URL}${
        process.env.PORT
      }/email-verification/${token}" style="color: #4CAF50;">${
        process.env.BASE_URL
      }${process.env.PORT}/email-verification/${token}</a>
        </p>
        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">
          If you didn’t sign up for Photo Journal, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center;">
          &copy; ${new Date().getFullYear()} Photo Journal App. All rights reserved.
        </p>
      </div>
    `,
      text: `
      Welcome to Photo Journal, ${newUser.name}!
      Thank you for registering. Please verify your email address by clicking the link below:
      ${process.env.BASE_URL}${process.env.PORT}/email-verification/${token}
      
      If you didn’t sign up for Photo Journal, please ignore this email.
  
      Best regards,
      The Photo Journal Team
    `,
    };

    // Send the verification email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending verification email", error);
        res.status(500).json({ msg: "Error sending verification email." });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({
          msg: "User created. Verification email has been sent!",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
