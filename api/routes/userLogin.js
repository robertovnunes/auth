const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }
  if (!password) {
    return res.status(400).send('Password is required');
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log('[404] User not found');
    return res.status(404).json({msg: 'User not found'});
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    console.log('[401] Incorrect password');
    return res.status(401).json({msg: 'Incorrect password'});
  }
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({
      id: user._id
    },
      secret,);
      console.log('[OK] User logged in');
    res.status(200).json({msg: 'Login successful', token: token});
  } catch (err) {
    console.log('[500] An error occurred while logging in');
    res.status(500).json({msg: 'An error occurred while logging in'});
  }

});

module.exports = router;