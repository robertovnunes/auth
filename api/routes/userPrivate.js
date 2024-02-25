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
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret, (err, user) => {
            req.user = user;
            next();
        });
    } catch (err) {
        console.log('[403] Forbidden');
        return res.status(403).json({msg: 'Forbidden'});
    }
}

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    description: Rota privada para buscar um usuário, necessário token de autenticação
 *    parameters:
 *    - in: path
 *    name: id
 *    required: true
 *    responses:
 *      '201':
 *        description: Uma resposta bem-sucedida
 *      '404':
 *        description: Usuário não encontrado
 *      '401':
 *        description: Não autorizado
 *      '403':
 *        description: Proibido
 *      '500':
 *        description: Erro interno do servidor
 */
router.get('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id, '-password');
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
});

module.exports = router;