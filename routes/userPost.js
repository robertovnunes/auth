const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.post('/user', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = { name, email, password, role };
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

        const userExists = await User.findOne().where('email').equals(email);
        if(userExists != null){
            res.status(400).json({error: 'Email already exists'});
            return;
        }
        await User.create(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

module.exports = router;