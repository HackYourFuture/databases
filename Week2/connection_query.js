//C:\Users\knowl\Documents\hyf\databases\Week2\connection_query.js
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
            CREATE DATABASE IF NOT EXISTS w2_research;
            USE w2_research;
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