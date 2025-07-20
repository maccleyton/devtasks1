console.log('Arquivo index.js carregado')
require('dotenv').config();
const express = require('express');
const knex = require('knex');
const cors = require('cors');

const app = express();

const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API DevTasks está no ar 🚀')
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Configura knex (já deve ter a config do SQLite)
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './devtasks.sqlite'
    },
    useNullAsDefault: true
});

// Rota listar todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db('tasks').select('*');
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Rota criar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const { title, description } = req.body;
        const [id] = await db('tasks').insert({ title, description });
        res.status(201).json({ id, title, description });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Rota deletar uma tarefa
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db('tasks').where({ id }).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

// Rota atualizar uma tarefa por ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await db('tasks').where({ id }).update({ title, description });
        res.json({ id, title, description });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});