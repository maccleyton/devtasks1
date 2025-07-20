const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../database/knex'); // vamos criar esse arquivo para configurar o knex

// Rota POST /users - cadastrar novo usuário
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Verifica se email já existe
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o novo usuário no banco de dados
        const [id] = await knex('users').insert({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ id, name, email });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;