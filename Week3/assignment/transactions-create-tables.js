//C:\Users\knowl\Documents\hyf\databases\Week3\assignment\transactions-create-tables.js
import {createNewConnection,useDatabase} from "./connection_query.js";

// Schema for the tables
const accountTable = {
    account_number: 'INT PRIMARY KEY',
    balance: 'DECIMAL(10, 2) NOT NULL'
};

const accountChangesTable = {
    change_number: 'INT AUTO_INCREMENT PRIMARY KEY',
    account_number: 'INT NOT NULL',
    amount: 'DECIMAL(10, 2) NOT NULL',
    changed_date: 'DATETIME NOT NULL',
    remark: 'VARCHAR(255)'
};


// Function to create a table
const createTable = (tableName, schema, foreignKeys='') => {
    const columns = Object.entries(schema).map(([key, type]) => `${key} ${type}`).join(', ');
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns}${foreignKeys ? `, ${foreignKeys}` : ''})`;

    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(`Table ${tableName} created successfully!`);
    });
};

const connection = createNewConnection();

// Connect to the database and create the tables
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');


    useDatabase(connection)
        .then(() => {
            createTable('account', accountTable);
            createTable('account_changes', accountChangesTable, 'FOREIGN KEY (account_number) REFERENCES account(account_number)');
        })
        .catch((error) => {
            console.error('Error setting up the database:', error);
        })
        .finally(() => {
            connection.end();
        })

});