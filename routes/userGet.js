// Importando o Router do express
const {Router} = require('express');
const router = Router();
const User = require('../models/User');


// Definindo a rota GET para os usuários
router.get('/users', async (req, res) => {
    try {
        // Buscando os usuários no banco de dados
        const users = await User.find();

        // Enviando a resposta com os usuários
        if(users.length > 0) {
            res.status(200).json(users);
        } else {
            res.json({message: 'No users found'});
        }
    } catch (err) {
        // Tratando qualquer erro que possa ocorrer
        console.error(err);
        res.status(500).json({error: 'An error occurred while fetching users'});
    }
});

router.get('/user/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email: email});
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occurred while fetching user'});
    }
});

// Exportando o router
module.exports = router;