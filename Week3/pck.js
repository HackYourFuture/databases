const dbQueries = 
{
    create_db : `CREATE DATABASE IF NOT EXISTS todo_app`,
    
    use_db : `USE todo_app`,
    
    users : `CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT, 
            name CHAR(52) NOT NULL,
            PRIMARY KEY(user_id))`,
    
    todo_lists : `CREATE TABLE IF NOT EXISTS todo_lists(
                list_id INT AUTO_INCREMENT,
                name CHAR(35),
                description CHAR(200),
                PRIMARY KEY(list_id))`,     

    todo_items : `CREATE TABLE IF NOT EXISTS todo_items(
                item_id INT AUTO_INCREMENT,
                name CHAR(35),
                tag CHAR(35),
                description CHAR(200),
                isComplete CHAR(3),
                deadline DATE,
                PRIMARY KEY (item_id))`,

    categories :  `CREATE TABLE IF NOT EXISTS categories(
                    category_id INT AUTO_INCREMENT,
                    name CHAR(35),
                    PRIMARY KEY(category_id))`,

    userList : `CREATE TABLE IF NOT EXISTS userList(
                user_id INT NOT NULL,
                list_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (list_id) REFERENCES todo_lists (list_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                PRIMARY KEY (user_id, list_id))`,

    listItems : `CREATE TABLE IF NOT EXISTS listItems(
                item_id INT NOT NULL,
                list_id INT NOT NULL,
                FOREIGN KEY (item_id) REFERENCES todo_items (item_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (list_id) REFERENCES todo_lists (list_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                PRIMARY KEY (item_id, list_id))`
};

module.exports = {dbQueries}