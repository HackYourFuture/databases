//C:\Users\knowl\Documents\hyf\databases\Week3\assignment\connection_query.js
import mysql from 'mysql';


export const createNewConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        multipleStatements: true,
    });
};

export const useDatabase = (connection)  => {
    return new Promise((resolve, reject) => {
        const createDatabaseAndUse = `
            CREATE DATABASE IF NOT EXISTS transactions;
            USE transactions;
        `;
        connection.query(createDatabaseAndUse, (err, results) => {
            if (err) {
                console.error('Error creating or selecting database:', err.stack);
                reject(err);
                return;
            }
            console.log('Database selected successfully.');
            resolve();
        });
    });
};