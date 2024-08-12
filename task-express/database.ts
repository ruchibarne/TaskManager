import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


async function DeleteData(){
    const db = await openDb();
    await db.exec(`DELETE from tasks;`)
    console.log("deleted successfully")
}


DeleteData;
// Open the database
export async function openDb() {
    return open({
        filename: './database.db', // Path to your database file
        driver: sqlite3.Database
    });
}

//initialize database
export async function initializeDb() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT,
            task_desc TEXT,
            task_start text,
            task_end text,
            task_category text,
            task_done text
        );
    `);
}
