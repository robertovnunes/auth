const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('../models/User');

function verifyToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        console.log('[401] Unauthorized');
        return res.status(401).send('Unauthorized');
    }
    try{
        const secret = process.env.SECRET;
        jwt.verify(token, secret, (err, user) => {
            req.user = user;
            next();
        });
    }catch(err){
        console.log('[403] Forbidden');
        return res.status(403).json({msg:'Forbidden'});
    }
}

router.get('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id, '-password');
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
});

module.exports = router;