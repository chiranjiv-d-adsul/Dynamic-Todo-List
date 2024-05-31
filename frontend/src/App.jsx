// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import './index.css';

axios.defaults.baseURL = "http://localhost:5000";

axios.defaults.withCredentials = true;

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error("There was an error fetching tasks!", error);
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error("There was an error adding the task!", error);
            alert(error.response.data.message)
        }
    };

    const moveTask = async (id, status) => {
        try {
            const response = await axios.put(`/tasks/${id}`, { status });
            setTasks(tasks.map(task => task._id === id ? response.data : task));
        } catch (error) {
            console.error("There was an error moving the task!", error);
        }
    };

    const editTask = async (id) => {
        const newTitle = prompt("Enter new title:");
        const newDescription = prompt("Enter new description:");
        if (newTitle || newDescription) {
            try {
                const response = await axios.put(`/tasks/${id}`, {
                    title: newTitle,
                    description: newDescription
                });
                setTasks(tasks.map(task => task._id === id ? response.data : task));
            } catch (error) {
                console.error("There was an error editing the task!", error);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("There was an error deleting the task!", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Dynamic To-Do List</h1>
            <div className="mb-8">
                <input
                    className="border p-2 mr-2"
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    className="border p-2 mr-2"
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={addTask}
                >
                    Add Task
                </button>
            </div>
            <div className="flex justify-between">
                <TaskList tasks={tasks} status="Pending" moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
                <TaskList tasks={tasks} status="In Progress" moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
                <TaskList tasks={tasks} status="Completed" moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
};

export default App;
