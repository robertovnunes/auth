const {Router} = require('express');
const router = Router();
const User = require('../models/User');


/**
* @swagger
* /api/user/{id}:
*  patch:
*    description: Use para criar um usuário
*    parameters:
*      - in: path
*        name: id
*        required: true
*        type: string
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              name: name
*              email: email
*              password: password
*              cpass: cpass
*              role: role
*    responses:
*      '201':
*        description: Uma resposta bem-sucedida
*      '404':
*        description: Usuário não encontrado
*      '500':
*        description: Erro interno do servidor
*/
router.patch('/user/:id', async (req, res) => {
    const id = req.params.id;
        try {
            const {name, email, role} = req.body;
            const user = {name, email, role};
            const updatedUser = await User.updateOne({_id: id}, user);
            if (updatedUser.matchedCount === 0) {
                res.status(404).json({error: 'User not found'});
                return;
            }
            let users = await User.find();
            res.status(200).json({message: 'User updated successfully', data:users});
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'An error occurred while updating the user'});
        }
    }
);
module.exports = router;