const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'big',
});


const execQuery = util.promisify(connection.query.bind(connection));
connection.connect();

async function seedDatabase() {

    const CREATE_TABLE = `
        CREATE TABLE IF NOT EXISTS big
        (
            id_pk INT PRIMARY KEY AUTO_INCREMENT,
            number   INT
        );`;

    execQuery(CREATE_TABLE);
    let rows = []
    for (i = 1; i <= 1000000; i++) {
        rows.push([i]);
        if(i%10000 === 0){
            console.log("i="+i);
            await execQuery('INSERT INTO big(number) VALUES ?',[rows]);
            rows = [];
        }
    }
}

async function queries() {
    let start = new Date();
    await execQuery('select * from big where id_pk = 230');

    let end = new Date() - start
    console.info('Execution time with a primary key: %dms', end)


    start = new Date();
    await execQuery('select * from big where number = 230');
    end = new Date() - start
    console.info('Execution time with no index: %dms', end)

}

seedDatabase().then(() => queries().then(()=>connection.end()));

