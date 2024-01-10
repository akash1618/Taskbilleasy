const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../model');
const SECRET_KEY = 'f%M6UVy@m3O-Pe}';
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                error: 'user already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await users.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.findOne({ username });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid Credentials'
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

