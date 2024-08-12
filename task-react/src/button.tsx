import React, { useState } from 'react';
import { createTask } from './api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './button.css';

interface UserFormProps {
    onClose: () => void;
    ontaskCreated: () => void;
}

const Taskform: React.FC<UserFormProps> = ({ onClose, ontaskCreated }) => {
    const [task_name, setName] = useState('');
    const [task_desc, setDesc] = useState('');
    const [task_end, setEndDate] = useState('');
    const [task_category, setcategory] = useState('');
    const [task_start, setStartDate] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTask(task_name, task_desc, task_start, task_end, task_category );
        ontaskCreated();
        onClose();
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            setEndDate(formattedDate);
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            setStartDate(formattedDate);
        }
    };

    return (
        <div style={styles.overlay} className="button">
            <div style={styles.popup} className="sub-btn">
                <h2>Create New User</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup} className="formgroup">
                        <label>Task title:</label>
                        <input
                            type="text"
                            value={task_name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.formGroup} className="group">
                        <label>Description:</label>
                        <textarea
                            value={task_desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div style={styles.formGroup} className='dgroup'>
                        <label>Task Category:</label>
                        <input
                            type="text"
                            value={task_category}
                            onChange={(e) => setcategory(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.formGroup} className='bar'>
                        <label>Starting Date:</label>
                        <DatePicker
                            selected={task_start ? new Date(task_start) : null}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                    </div>
                    <div style={styles.formGroup} className='bar'>
                        <label>Completetion Date:</label>
                        <DatePicker
                            selected={task_end ? new Date(task_end) : null}
                            onChange={handleEndDateChange}
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                    </div>
                    <div style={styles.buttonGroup} className='dbar'>
                        <button type="submit">Create User</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Taskform;

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
        color: 'black',  // White text color
        padding: '10px 20px',  // Padding for button
        borderRadius: '20px',  // Rounded corners
        border: 'none',  // Remove default border
        fontSize: '16px',  // Font size
        cursor: 'pointer',  // Cursor changes to pointer on hover
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',  // Subtle shadow
        transition: 'background-color 0.3s ease',  // Smooth transition
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
};
