import {createNewConnection, useDatabase} from "./connection_query.js";

const connection = createNewConnection();

const accountData = [
    { account_number: 101, balance: 1000.00 },
    { account_number: 102, balance: 1500.50 },
    { account_number: 103, balance: 500.75 },
];

const accountChangesData = [
    { account_number: 101, amount: -100.00, changed_date: '2024-08-01 10:00:00', remark: 'ATM Withdrawal' },
    { account_number: 102, amount: 200.00, changed_date: '2024-08-01 12:00:00', remark: 'Direct Deposit' },
    { account_number: 103, amount: -50.25, changed_date: '2024-08-02 09:30:00', remark: 'Online Purchase' },
    { account_number: 101, amount: 300.00, changed_date: '2024-08-02 14:00:00', remark: 'Salary Deposit' },
];

// Function to insert data into a table
const insertData = (tableName, data) => {
    const keys = Object.keys(data[0]);
    const columns = keys.join(', ');
    const values = data.map(row => keys.map(key => connection.escape(row[key])).join(', ')).join('), (');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(`Data inserted into table ${tableName} successfully!`);
    });
};


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');

    useDatabase(connection)
        .then(() => {
            insertData('account', accountData);
            insertData('account_changes', accountChangesData);
        })
        .catch((error) => {
            console.error('Error inserting data into the database:', error);
        })
        .finally(() => {
            connection.end();
        });
});