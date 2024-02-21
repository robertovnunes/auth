// Importando o Router do express
const {Router} = require('express');
const router = Router();
const User = require('../models/User');


// Definindo a rota GET para os usuários
router.get('/users', async (req, res) => {
    try {
        console.log('GET /users');
        // Buscando os usuários no banco de dados
        const users = await User.find();

        // Enviando a resposta com os usuários
        if(users.length > 0) {
            console.log('200 [OK]');
            res.status(200).json(users);
        } else {
            console.log('204 [EMPTY]');
            res.status(204).json({message: 'No users found'});
        }
    } catch (err) {
        // Tratando qualquer erro que possa ocorrer
        console.log('500 [ERROR]');
        console.error(err);
        res.status(500).json({error: 'An error occurred while fetching users'});
    }
});

router.get('/user/:email', async (req, res) => {
    try {
        console.log('GET /user/:email');
        const email = req.params.email;
        const user = await User.findOne({email: email});
        if (user) {
            console.log('200 [OK]');
            res.status(200).json(user);
        } else {
            console.log('404 [NOT FOUND]');
            res.status(404).json({error: 'User not found'});
        }
    } catch (err) {
        console.log('500 [ERROR]');
        console.error(err);
        res.status(500).json({error: 'An error occurred while fetching user'});
    }
});

// Exportando o router
module.exports = router;