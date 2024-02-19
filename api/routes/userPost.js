const { Router } = require('express');
const bcrypt = require('bcryptjs');

const router = Router();
const User = require('../models/User');

router.post('/user', async (req, res) => {
    try {
        let { name, email, password, role } = req.body;
        const hash = await bcrypt.hash(password, 10);
        password = hash;
        if (!name || !email || !password || !role) {
            if(!name){
                res.status(400).json({ error: 'Name is required' });
            } else if (!email){
                res.status(400).json({ error: 'Email is required' });
            } else if (!password){
                res.status(400).json({ error: 'Password is required' });
            } else if (!role){
                res.status(400).json({ error: 'Role is required' });
            } else {
                res.status(400).json({ error: 'All fields are required' });
            }
            return;
        }
        const user = { name, email, password, role };
        const userExists = await User.findOne().where('email').equals(email);
        if(userExists != null){
            res.status(400).json({error: 'Email already exists'});
            return;
        }
        await User.create(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

module.exports = router;