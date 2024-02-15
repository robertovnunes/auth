const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    if (!user) {
        return res.status(404).send('User not found');
    }
    try {
        await User.deleteOne({_id: id});
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred while deleting the user'});
    }
});

module.exports = router;