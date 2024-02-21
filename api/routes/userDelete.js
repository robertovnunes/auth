const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const getuser = require('./userGet');

router.delete('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            console.log('404 [NOT FOUND]');
            return res.status(404).send('User not found');
        }
        await User.deleteOne({ email: email });
        console.log('200 [OK]');
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error(err);
        console.log('500 [ERROR]');
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
});

module.exports = router;