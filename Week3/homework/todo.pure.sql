DROP SCHEMA IF EXISTS todo;
CREATE SCHEMA todo;
USE todo;
SET AUTOCOMMIT = 0;

/* Create Users */
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	  id          INT         NOT NULL AUTO_INCREMENT,
    name        VARCHAR(20),
    surname     VARCHAR(20),
    email       VARCHAR(40) UNIQUE DEFAULT NULL,
                PRIMARY KEY(id)
);

/* Seed Users */
INSERT INTO users VALUES (NULL, 'john',    'doe',      'johndoe@mail.com');
INSERT INTO users VALUES (NULL, 'patrick', 'anthropy', 'panthropy@mail.com');
INSERT INTO users VALUES (NULL, 'jason',   'pot',      'jpot@mail.com');

/* Create Categories */
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
	  id      INT         NOT NULL AUTO_INCREMENT,
    title   VARCHAR(20),
            PRIMARY KEY (id)
);

/* Seed Categories */
INSERT INTO categories VALUES (1, 'Sport');
INSERT INTO categories VALUES (2, 'Eating');
INSERT INTO categories VALUES (3, 'Studying');
INSERT INTO categories VALUES (4, 'Shopping');

/* Create Todos */
DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (
	  id          INT         NOT NULL AUTO_INCREMENT,
    title       VARCHAR(50) NOT NULL,
    description TEXT        DEFAULT NULL,
    tags        VARCHAR(50) DEFAULT NULL,
                PRIMARY KEY (id)
);

/* Seed Todos */
INSERT INTO todos VALUES (1, 'Drink water',     'You neede to drink 2lt water everyday',  'important, immediately');
INSERT INTO todos VALUES (2, 'Play football',   'Dont miss that match!',                  'not required');
INSERT INTO todos VALUES (3, 'Study for exam',  'I must be successful!',                  'not required');

/* Todo Lists */
DROP TABLE IF EXISTS todo_lists;
CREATE TABLE IF NOT EXISTS todo_lists (
	  id          INT         NOT NULL AUTO_INCREMENT,
    user_id     INT,
    todo_id     INT,
    category_id INT,
    is_done     TINYINT     NOT NULL DEFAULT 0,
    deadline	DATETIME	DEFAULT NULL,
    remind_date DATETIME    DEFAULT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (todo_id)       REFERENCES todos(id)		ON DELETE CASCADE,
                FOREIGN KEY (user_id)       REFERENCES users(id)		ON DELETE CASCADE,
                FOREIGN KEY (category_id)   REFERENCES categories(id)	ON DELETE CASCADE
);


INSERT INTO todo_lists VALUES(1, 1, 1, 1, 0, '2019-08-12 22:10:10', '2019-08-11 22:10:10');
INSERT INTO todo_lists VALUES(2, 2, 1, 2, 0, '2019-08-11 22:13:10', '2019-08-12 22:10:10');
INSERT INTO todo_lists VALUES(3, 2, 2, 1, 0, '2019-08-11 22:13:10', '2019-08-12 22:10:10');

/* Time Trigger */
DROP TRIGGER IF EXISTS date_reminder;
DELIMITER $$
CREATE TRIGGER date_reminder
	BEFORE INSERT
		ON todo_lists
			FOR EACH ROW
            BEGIN
				DECLARE message VARCHAR(100);
                IF new.remind_date < NOW() OR new.deadline < NOW()
                THEN
					SET message = 'Time is passed already!';
                    SET LC_MESSAGES = message; SIGNAL SQLSTATE '45000';
				END IF;
			END $$
DELIMITER ;