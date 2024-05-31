import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, status, moveTask, editTask, deleteTask }) => {
    return (
        <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            {tasks.filter(task => task.status === status).map(task => (
                <Task
                    key={task._id}
                    task={task}
                    moveTask={moveTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
