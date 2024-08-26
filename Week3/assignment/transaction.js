import {createNewConnection, useDatabase} from "./connection_query.js";

const connection = createNewConnection();

const transferAmount = (fromAccount, toAccount, amount) => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) return reject(err);

            // Deduct amount from the source account
            const deductAmountQuery = `
                UPDATE account
                SET balance = balance - ${connection.escape(amount)}
                WHERE account_number = ${connection.escape(fromAccount)}
            `;

            connection.query(deductAmountQuery, (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        reject(err);
                    });
                }

                // Add amount to the destination account
                const addAmountQuery = `
                    UPDATE account
                    SET balance = balance + ${connection.escape(amount)}
                    WHERE account_number = ${connection.escape(toAccount)}
                `;

                connection.query(addAmountQuery, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            reject(err);
                        });
                    }

                    // Log the change in the account_changes table for the source account
                    const logChangeFromAccount = `
                        INSERT INTO account_changes (account_number, amount, changed_date, remark)
                        VALUES (${connection.escape(fromAccount)}, -${connection.escape(amount)}, NOW(), 'Transfer to account ${connection.escape(toAccount)}')
                    `;

                    connection.query(logChangeFromAccount, (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                reject(err);
                            });
                        }

                        // Log the change in the account_changes table for the destination account
                        const logChangeToAccount = `
                            INSERT INTO account_changes (account_number, amount, changed_date, remark)
                            VALUES (${connection.escape(toAccount)}, ${connection.escape(amount)}, NOW(), 'Transfer from account ${connection.escape(fromAccount)}')
                        `;

                        connection.query(logChangeToAccount, (err, result) => {
                            if (err) {
                                return connection.rollback(() => {
                                    reject(err);
                                });
                            }

                            // Commit the transaction if everything is successful
                            connection.commit(err => {
                                if (err) {
                                    return connection.rollback(() => {
                                        reject(err);
                                    });
                                }
                                console.log('Transaction completed successfully.');
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    });
};


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');

    useDatabase(connection)
        .then(() => {
            return transferAmount(101, 102, 1000);
        })
        .catch((error) => {
            console.error('Error during transaction:', error);
        })
        .finally(() => {
            connection.end();
        });
});