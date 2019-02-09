const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'class18password',
  database: 'new_world2',
});

/*delimiter $$
CREATE TRIGGER insert
    BEFORE INSERT
        ON india
            FOR EACH ROW
            
            BEGIN
                DECLARE message VARCHAR(200);
                DECLARE lastInsertedItem INT
                SET lastInsertedItem= (select count(language) from india where id=new.id);
                IF lastInsertedItem >=10 
                THEN
                set message = 'last input indicate that this country have more than 10 spoken language !!';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
END $$
delimiter;*/
connection.connect();

connection.query(`insert into india values(1,'english')`, (error, result, fields) => {
  if (error) {
    throw error;
  }
  console.log(result);
});
