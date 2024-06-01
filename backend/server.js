const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Task = require('./models/task');

dotenv.config();
const app = express();
const port = 5000;

const corsConfig = {
    origin: "http://localhost:5173",
    // origin: "https://iridescent-bombolone-8c2d79.netlify.app",

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  app.use(cors(corsConfig));
  app.options("", cors(corsConfig));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const taskSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     status: { type: String, default: 'Pending' },
//     timestamp: Date
// });


app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description });
        await task.save();
        res.json(task);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            res.status(400).json({ message: 'Task title must be unique' });
        } else {
            res.status(500).json({ message: 'An error occurred while creating the task' });
        }
    }
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { status, title, description } = req.body;
    const task = await Task.findById(id);
    if (status) task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status === 'Completed') {
        task.timestamp = new Date();
    }
    await task.save();
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
});
app.listen(port, () => console.log(`Server running on port ${port}`));
