const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const encryptions = require('../utils/keygenration.utils');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            const extraa = otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: true,
                upperCaseAlphabets: true,
                specialChars: true,
            });
            return res.status(400).json({ message: `Username already exists, please try something else like ${username + extraa}` });
        }

        const publicKey = encryptions.genrateKey();
        const privateKey = encryptions.genrateKey();

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            publicKey,
            privateKey,
            passwordHash
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', keys: { loginKey: privateKey, publicKey: publicKey } });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


exports.login = async (req, res) => {
    try {
        const { privateKey, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ privateKey });
        if (!user) {
            return res.status(400).json({ message: 'Invalid privateKey' });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid  password' });
        }

        // Generate JWT token with an 8-hour expiration
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Return the token and some user details
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                username: user.username,
                avatar: user.avatar,
                publicKey: user.publicKey
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
