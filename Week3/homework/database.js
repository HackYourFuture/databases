const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghufran',
  password: 'deiri',
  database: 'userdb',
});

connection.connect();

const cb = function(error, results, fields) {
  if (error) {
    throw error;
  }
};

connection.query('CREATE DATABASE IF NOT EXISTS todos', cb());

connection.query('use todos', cb());

connection.query(
  ` CREATE TABLE IF NOT EXISTS users (
    userID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    email varchar(50) DEFAULT NULL,
    PRIMARY KEY (userID)
  )`,
  cb(),
);

connection.query(
  ` INSERT IGNORE INTO users VALUES 
  (1,'Jane','Jane@gmail.com'),
  (2,'Sam','Sam@gmail.com'),
  (3,'Dan','Dan@gmail.com');`,
  cb(),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS category (
    catID int(11) NOT NULL AUTO_INCREMENT,
    cat_name varchar(50) DEFAULT NULL,
    PRIMARY KEY (catID)
  )`,
  cb(),
);

connection.query(
  ` INSERT IGNORE INTO category VALUES (1,'home'),(2,'work'),(3,'school'),(4,'shopping'), (5, 'sport');`,
  cb(),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS todolists (
    listID int(11) NOT NULL AUTO_INCREMENT,
    description varchar(50) DEFAULT NULL,
    userID int(11) NOT NULL,
    catID int(11) DEFAULT NULL,
    reminder datetime DEFAULT NULL,
    PRIMARY KEY (listID),
    FOREIGN KEY (userID) REFERENCES users (userID)
    ON DELETE CASCADE,
    FOREIGN KEY (catID) REFERENCES category (catID)
    ON DELETE CASCADE
  )`,
  cb(),
);

connection.query(
  ` INSERT IGNORE INTO todolists VALUES 
  (1,'cleaning',3,1,'2019-08-30 00:00:00'),
  (2,'project',2,2,'2019-12-31 00:00:00'),
  (3,'homework',1,3,'2018-09-20 00:00:00'),
  (4,'food',2,4,NULL);`,
  cb(),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS todoitem (
    todoID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    PRIMARY KEY (todoID)
  )`,
  cb(),
);
connection.query(
  ` INSERT IGNORE INTO todoitem VALUES 
  (1,'clean the house'),(2,'finish the projest'),(3,'do homework'),(4,'eggs')`,
  cb(),
);

connection.query(
  ` CREATE TABLE IF NOT EXISTS todolists_items (
    todolists_items tinyint(4) DEFAULT NULL,
    todoID int(11) NOT NULL,
    listID int(11) NOT NULL,
    PRIMARY KEY (todoID,listID),
    FOREIGN KEY (todoID) REFERENCES todoitem (todoID)
    ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES todolists (listID)
    ON DELETE CASCADE
  )`,
  cb(),
);

connection.query(
  ` INSERT IGNORE INTO todolists_items VALUES (1,3,3), (0,2,2), (1,4,4), (1,1,1);`,
  cb(),
);

connection.end();
