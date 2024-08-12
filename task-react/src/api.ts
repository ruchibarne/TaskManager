import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Your Express backend URL

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export const createTask = async (task_name :string,
    task_desc :string,
    task_start:string,
    task_end :string,
    task_category :string) => {
    try {
        const response = await axios.post(`${API_URL}/posttask`, { task_name, task_desc, task_start, task_end, task_category });
        return response.data;
    } catch (error) {
        console.error('Error creating task', error);
        throw error;
    }
};

