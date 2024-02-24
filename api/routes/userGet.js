// Importando o Router do express
const {Router} = require('express');
const router = Router();
const User = require('../models/User');


// Definindo a rota GET para os usuários
/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Use para solicitar todos os usuários
 *    responses:
 *      '200':
 *        description: Uma resposta bem-sucedida
 *        content: 
 *         application/json:
 *          schemas:
 *           type: object
 *           properties:
 *            name: 
 *             type: string
 *            email:
 *             type: string
 *      '204':
 *        description: Nem um usuário cadastrado
 *      '500':
 *        description: Erro interno do servidor
 *    
 */
router.get('/users', async (req, res) => {
    try {
        console.log('GET /users');
        // Buscando os usuários no banco de dados
        const users = await User.find({}, '-password');
        // Enviando a resposta com os usuários
        if(users.length > 0) {
            console.log('200 [OK]');
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        } else {
            console.log('204 [EMPTY]');
            res.status(204).json([]);
        }
    } catch (err) {
        // Tratando qualquer erro que possa ocorrer
        console.log('500 [ERROR]');
        console.error(err);
        res.status(500).json({error: 'An error occurred while fetching users'});
    }
});
/**
* @swagger
* /api/user/email/{email}:
*  get:
*    description: Use para buscar um usuário pelo email
*    parameters:
*      - in: path
*        name: email
*        required: true
*        type: string
*    responses:
*      '200':
*        description: Uma resposta bem-sucedida
*        content: 
*         application/json:
*          schema:
*           type: object
*           properties:
*            name: 
*             type: string
*            email:
*             type: string
*      '404':
*        description: Usuário não encontrado
*      '500':
*        description: Erro interno do servidor
*/
// Definindo a rota GET para um usuário específico
router.get('/user/email/:email', async (req, res) => {
    try {
        console.log('GET /user/:email');
        const email = req.params.email;
        const user = await User.findOne({email: email}, '-password');
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