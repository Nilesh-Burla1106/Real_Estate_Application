const express = require("express");
const bcrypt = require("bcrypt");
const EmployeeModel = require("./Employee");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

// Create a Nodemailer transporter (Use environment variables for security)
const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER,  // Ensure to use environment variables
        pass: process.env.EMAIL_PASS,  // Keep password secure
    },
});

// Store OTPs temporarily (for testing purposes)
let otpStore = {};

// Login Route
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Find the user by email and role
        const user = await EmployeeModel.findOne({ email: email, role: role });

        if (user) {
            // Compare the input password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Successful login, send back the role
                return res.json({ message: "Success", role: user.role });
            } else {
                // Incorrect password
                return res.status(400).json({ message: "Incorrect password" });
            }
        } else {
            // User not found
            return res.status(404).json({ message: "No record found" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user found with this email' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const resetURL = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset</p><p>Click this <a href="${resetURL}">link</a> to set a new password.</p>`
        });

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        console.error("Error sending password reset link:", err);
        res.status(500).json({ message: 'Error sending password reset link' });
    }
});


// Send OTP Route
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const userExists = await EmployeeModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Store OTP with a timestamp
        otpStore[email] = { otp, timestamp: Date.now() };

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Registration",
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        };

        console.log("Sending OTP to:", email);  // Log to verify email
        await transporter.sendMail(mailOptions);
        return res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("OTP sending error:", error);
        return res.status(500).json({ error: "Failed to send OTP" });
    }
});

// Register with OTP verification
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, otp } = req.body;

        // Check if the role is valid
        if (!role || !['admin','manager','telecaller','advisor','accountant'].includes(role)) {
            return res.status(400).json({ error: "Invalid role selected" });
        }

        // Verify OTP
        const storedOtpData = otpStore[email];
        if (!storedOtpData || storedOtpData.otp !== otp || Date.now() - storedOtpData.timestamp > 10 * 60 * 1000) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Check if the user is already registered
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new EmployeeModel({
            name,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser = await newUser.save();

        // Clean up OTP store
        delete otpStore[email];

        return res.json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Failed to register user" });
    }
});

// Password Reset Route
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        console.error("Missing token or password in request body");
        return res.status(400).json({ message: "Token and password are required" });
    }

    try {
        const user = await EmployeeModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.warn("Invalid or expired reset token:", token);
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        console.log("Password reset successfully for user:", user.email);

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
