import React, { useEffect, useState } from 'react';
import { getTasks } from './api';
import Taskform from './button';
import './home.css'

interface Task {
    task_id :number;
    task_name :string;
    task_desc :string;
    task_start :string;
    task_end :string;
    task_category :string;
    task_done :string;
}

const Home: React.FC = () => {
    const [Tasks, setTasks] = useState<Task[]>([]);
    const [countTodo, setCountTodo] = useState<number>(0);
    const [passedDateCount, setpassedDate] = useState<number>(0);
    const [unpassedDateCount, setunpassedDate] = useState<number>(0);
    const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
    const [ToDoTasks, setToDoTasks] = useState<Task[]>([]);
    const [underdueTasks, setunderdueTasks] = useState<Task[]>([]);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTasks();
            setTasks(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const countTodo = Tasks.filter((task) => task.task_category === 'todo').length;
        setCountTodo(countTodo);
    }, [Tasks]);

    useEffect(() => {
        const countOverdueTasks = () => {
            const today = new Date();
            const count = Tasks.filter(task => {
                const doneDate = new Date(task.task_end);
                return doneDate < today;
            }).length;
            setpassedDate(count);
        };

        countOverdueTasks();
    }, [Tasks]);

    

    useEffect(() => {
        const countdueTasks = () => {
            const today = new Date();
            const count = Tasks.filter(task => {
                const doneDate = new Date(task.task_end);
                return doneDate >= today;
            }).length;
            setunpassedDate(count);
        };

        countdueTasks();
    }, [Tasks]);

    

    useEffect(() => {
        const filterOverdueTasks = () => {
            const today = new Date();
            const filteredUsers = Tasks.filter(task => {
                const doneDate = new Date(task.task_end);
                return doneDate < today;
            });
            setOverdueTasks(filteredUsers);
        };

        filterOverdueTasks();
    }, [[Tasks]]);

    useEffect(() => { 
        const filterToDoTasks = () => {
            const today = new Date();
            const filteredUsers = Tasks.filter(task => {
                const startDate = new Date(task.task_start);
                return startDate > today;
            });
            setToDoTasks(filteredUsers);
        };

        filterToDoTasks();
    }, [[Tasks]]);

    useEffect(() => {
        const filterOverdueTasks = () => {
            const today = new Date();
            const filteredUsers = Tasks.filter(task => {
                const doneDate = new Date(task.task_end);
                const startdate = new Date(task.task_start);
                return doneDate > today && startdate < today;
            });
            setunderdueTasks(filteredUsers);
        };

        filterOverdueTasks();
    }, [[Tasks]]);
    
    const handleTaskCreated = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    return (
        <div className="page">
            <div className="searchbar">
            <input type="text" name="" id="" />
            </div>
            <div className="main">
                <div className="tasklist static">
                    <div className="card passed">
                        <h3>Expired tasks</h3>
                        <h4>{passedDateCount}</h4>
                    </div>
                    <div className="card uncomplete">
                        <h3>Incomplete tasks</h3>
                        <h4>{unpassedDateCount}</h4>
                    </div>
                    <div className="card">
                        <h3>Total tasks</h3>
                        <h4>{Tasks.length}</h4>
                    </div>

                    <button onClick={() => setIsFormOpen(true)}>Add Task</button>
                        {isFormOpen && (
                        <Taskform
                            onClose={() => setIsFormOpen(false)}
                            ontaskCreated={handleTaskCreated}
                        />
                        )}

                </div>
                <div className="tasklist todo">
                    <h3>ToDo Tasks {unpassedDateCount}</h3>
                    {ToDoTasks.map(Task => (
                        <div className='bar' key={Task.task_id}>
                            {Task.task_name} ({Task.task_desc})
                        </div>
                    ))}
                </div>
                <div className="tasklist progress">
                    <h3>Ongoing Tasks {unpassedDateCount}</h3>
                    {underdueTasks.map(Task => (
                        <div className='bar' key={Task.task_id}>
                            {Task.task_name} ({Task.task_desc})
                        </div>
                    ))}
                </div>
                <div className="tasklist done">
                    <h3>Done Tasks {passedDateCount}</h3>
                    {overdueTasks.map(Task => (
                        <div className='bar' key={Task.task_id}>
                            {Task.task_name} ({Task.task_desc})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;


const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}