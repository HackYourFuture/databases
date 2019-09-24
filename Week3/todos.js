const { DROP, SET } = require('./dbUtils');
const CREATE_TODO_TABLE = `
        ${DROP} 
        ${SET}
        CREATE TABLE todo_list (
          list_id int(11) NOT NULL AUTO_INCREMENT,
          list_name varchar(45) NOT NULL,
          reminder datetime DEFAULT NULL,
          User_id int(11) NOT NULL,
          PRIMARY KEY (list_id),
          KEY User_id (User_id),
          CONSTRAINT todo_list_ibfk_1 FOREIGN KEY (User_id) REFERENCES User (User_id)
        ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

const CREATE_TODO_USER = `
        ${DROP} 
        ${SET}
        CREATE TABLE User (
          User_id int(11) NOT NULL,
          Name varchar(50) DEFAULT NULL,
          Email varchar(50) DEFAULT NULL,
          PRIMARY KEY (User_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

const CREATE_TODOS = `
        ${DROP} 
        ${SET}
        CREATE TABLE todos (
          Todo_id int(11) NOT NULL,
          Todo_Desc varchar(50) DEFAULT NULL,
          Due_Date datetime DEFAULT NULL,
          Tag varchar(50) DEFAULT NULL,
          Done enum('true','false') DEFAULT NULL,
          list_id int(11) DEFAULT NULL,
          PRIMARY KEY (Todo_id),
          KEY list_id (list_id),
          CONSTRAINT todos_ibfk_1 FOREIGN KEY (list_id) REFERENCES todo_list (list_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
