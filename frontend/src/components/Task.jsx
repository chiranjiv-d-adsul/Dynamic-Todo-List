import React from 'react';

const Task = ({ task, moveTask, editTask, deleteTask, index,setActiveTask}) => {
    const nextStatus = {
        'Pending': 'In Progress',
        'In Progress': 'Completed'
    };


    return (

            <div className=" bg-white p-4 rounded shadow mb-4 flex justify-between items-center cursor-grab active:border-2 active:border-blue-500"
             draggable = "true"
                                onDragStart={() => setActiveTask(task)}
                                    onDragEnd={() => setActiveTask(null)}>
            <div>
                <h3 className="text-lg font-bold text-[#485151]">{task.title}</h3>
                <p>{task.description}</p>
                {task.status === 'Completed' && (
                    <p className="text-gray-500 mt-2">Completed at: {new Date(task.timestamp).toLocaleString()}</p>
                )}
            </div>
            <div className="flex items-center">
                {task.status !== 'Completed' && (
                    <button
                        className="ml-4 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                        onClick={() => moveTask(task._id, nextStatus[task.status])}
                    >
                        {task.status === 'Pending' ? 'Start' : 'Complete'}
                    </button>
                )}
                {task.status === 'Pending' && (
                    <button
                        className="ml-4 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                        onClick={() => editTask(task._id)}
                    >
                        Edit
                    </button>
                )}
                {task.status === 'Completed' && (
                    <button
                        className="ml-4 p-2 bg-red-500 hover:bg-red-800 text-white rounded"
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default Task;
