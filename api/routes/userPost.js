const { Router } = require('express');
const bcrypt = require('bcryptjs');

const router = Router();
const User = require('../models/User');

/**
* @swagger
* /api/user:
*  post:
*    description: Use para criar um usuário
*    parameters:
*      - in: body
*        name: user
*        schema:
*          type: object
*          properties:
*            name:
*              type: string
*              required: true
*            email: 
*              type: string
*              required: true
*            password:
*              type: string
*              required: true
*            cpass:
*              type: string
*              required: true
*    responses:
*      '201':
*        description: Uma resposta bem-sucedida
*      '400':
*        description: Campos obrigatórios não informados, email já cadastrado ou senhas não conferem
*      '500':
*        description: Erro interno do servidor
*/
router.post('/user', async (req, res) => {
    try {
        console.log('POST /user');
        let { name, email, password, cpass, role } = req.body;
        if (!name || !email || !password  || !cpass || !role) {
            if(!name){
                console.log('400 [BAD REQUEST - NAME MISSING]');
                res.status(400).json({ error: 'Name is required' });
            } else if (!email){
                console.log('400 [BAD REQUEST - EMAIL MISSING]');
                res.status(400).json({ error: 'Email is required' });
            } else if (!password){
                console.log('400 [BAD REQUEST - PASSWORD MISSING]');
                res.status(400).json({ error: 'Password is required' });
            } else if (!cpass){
                console.log('400 [BAD REQUEST - CONFIRM PASSWORD MISSING]');
                res.status(400).json({ error: 'Confirm password is required' });
            } else if (!role){
                console.log('400 [BAD REQUEST - ROLE MISSING]');
                res.status(400).json({ error: 'Role is required' });
            } else {
                console.log('400 [BAD REQUEST - ALL FIELDS MISSING]');
                res.status(400).json({ error: 'All fields are required' });
            }
            return;
        }
        const userExists = await User.findOne().where('email').equals(email);
        if(userExists != null){
            console.log('400 [BAD REQUEST - EMAIL ALREADY EXISTS]');
            res.status(400).json({error: 'Email already exists'});
            return;
        }
        if(password != cpass){
            console.log('400 [BAD REQUEST - PASSWORDS DO NOT MATCH]');
            res.status(400).json({error: 'Passwords do not match'});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        const user = { name, email, password, cpass, role };
        await User.create(user);
        console.log('201 [OK]');
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log('500 [ERROR]');
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

module.exports = router;