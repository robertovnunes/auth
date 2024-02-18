const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.patch('/user/:id', async (req, res) => {
        const id = req.params.id;
        const {name, email, password, role} = req.body;
        const user = {name, email, password, role};
        try {
            const updatedUser = await User.updateOne({_id: id}, user);
            if (updatedUser.matchedCount === 0) {
                res.status(404).json({error: 'User not found'});
                return;
            }
            res.status(200).json({message: 'User updated successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'An error occurred while updating the user'});
        }
    }
);
module.exports = router;