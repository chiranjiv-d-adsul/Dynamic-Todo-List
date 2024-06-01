import React from 'react';
import Task from './Task';
import DropArea from './DropArea';

const TaskList = ({ tasks, status, moveTask, editTask, deleteTask, setActiveTask, onDrop }) => {
    return (
        <div className="w-full md:w-1/3 bg-[#F0F5F5] px-2">
            <h2 className="text-xl font-bold  text-[#868892]">{status}</h2>
            <DropArea onDrop={() => onDrop(status, null)} />
            <div className="flex flex-col">
                {tasks.filter(task => task.status === status).map(task => (
                    <React.Fragment key={task._id}>
                        <Task
                            task={task}
                            moveTask={moveTask}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            setActiveTask={setActiveTask}
                        />
                        <DropArea onDrop={() => onDrop(status, task._id)} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
