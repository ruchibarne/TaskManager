import express, { Request, Response } from 'express';
import { openDb } from '../database';
import cors from 'cors';

const app = express();
const port = 3001;
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // URL of your React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));





app.get('/', async (req: Request, res: Response) => {
    const db = await openDb();
    const result = await db.get('SELECT 1 + 1 AS result'); // Simple test query
    res.send(result);
});

app.post('/posttask', async (req: Request, res: Response) => {
    try {
        const db = await openDb();
        const { task_title, task_desc, task_start, task_end, task_category  } = req.body;
        const result = await db.run("INSERT INTO tasks (task_name, task_desc, task_start, task_end, task_category, task_done) VALUES (?, ?, ?, ?, ?, 'undone')", [task_title, task_desc, task_start, task_end, task_category]);
        res.sendStatus(200);
    
    } catch (error) {
        console.error(error);
        res.send(error);
    }
    
});

app.get('/tasks', async (req: Request, res: Response) => {
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks');
    res.json(tasks);
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



