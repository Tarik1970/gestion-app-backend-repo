const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Ajoutez cette ligne pour importer cors

const app = express();
const port = 3000;

// Middleware pour permettre les requêtes Cross-Origin (CORS)
// Permet à votre frontend (sur un autre port/domaine) de communiquer avec votre backend
app.use(cors()); // <-- Ajoutez cette ligne APRÈS 'const app = express();'

app.use(express.json());

mongoose.connect('process.env.MongoUIR')
    .then(() => console.log('Connecté à MongoDB !'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    isCompleted: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

app.get('/', (req, res) => {
    res.send('Bienvenue sur votre API de gestion !');
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log('Attendez le message "Connecté à MongoDB !" pour confirmer la connexion à la base de données.');
});