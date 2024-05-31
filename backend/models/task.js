const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: { type: String, unique: true, required: true },
    description: String,
    status: { type: String, default: 'Pending' },
    timestamp: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
