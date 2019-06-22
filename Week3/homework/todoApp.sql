
DROP SCHEMA IF EXISTS todoapp;
CREATE SCHEMA todoapp;
USE todoapp;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  `user_id` varchar
(50) NOT NULL,
  `name` varchar
(50) NOT NULL,
  `email` varchar
(254) NOT NULL,
  PRIMARY KEY
(`user_id`)
) ;


LOCK TABLES `users` WRITE;
INSERT INTO 
users
VALUES
  ('8vS4PDKvV-aXUgnSu1I4B', 'jack', 'jack@gmail.com'),
  ('8wuS06DCjCTqv8AD6qTUX', 'mike', 'mike@hotmail.com'),
  ('HCN4HAjIj3lIKB9tb9doc', 'noer', 'noer@gmail.com'),
  ('Hk0yPR8DvmIC7WYOvDkgP', 'mohammad', 'mohammad@gmail.com'),
  ('KHuSxKyVy6AGwuIW3-o1y', 'ahmad', 'ahmad@gmail.com'),
  ('RfVkWYLz7t9xWnECw8zfo', 'ammar', 'ammar@gmail.com'),
  ('sPcDYztwcEjYTEIYLP8h3', 'omar', 'omar@gmail.com'),
  ('tIzOGGdf-95KfrApfy6yq', 'marko', 'marko@hotmail.com'),
  ('Vn9vc1d5XFxE4T4B0PVGe', 'bert', 'bert@kgmail.com'),
  ('ySEt2NHE0HvW0sAtX97mK', 'marion', 'marion@hotmail.com');
UNLOCK TABLES;



DROP TABLE IF EXISTS todolists;

CREATE TABLE todolists
(
  `user_id` varchar
(50) NOT NULL,
  `todolist_id` varchar
(50) NOT NULL,
  `todolist_name` varchar
(50) NOT NULL,
  `reminder` datetime DEFAULT NULL,
  PRIMARY KEY
(`todolist_id`),
  FOREIGN KEY
(`user_id`) REFERENCES `users`
(`user_id`) ON
DELETE CASCADE
);

LOCK TABLES `todolists` WRITE;
INSERT INTO 
todolists
VALUES
  ('RfVkWYLz7t9xWnECw8zfo', '-gEwx6en9qLEr0ZRuE5Q-', 'cleaning material', '2019-11-03 00:00:00'),
  ('Hk0yPR8DvmIC7WYOvDkgP', '0U8YAoKhi31TGu9BHPYjt', 'furniture', '2019-10-02 00:00:00'),
  ('Vn9vc1d5XFxE4T4B0PVGe', '3UthG7gWxIAcI-WbXAM9j', 'grocery1', '2019-05-29 00:00:00'),
  ('ySEt2NHE0HvW0sAtX97mK', '6oWRF5tlAh234uyPUHn76', 'house stuff 123', '2019-07-09 00:00:00'),
  ('8vS4PDKvV-aXUgnSu1I4B', 'BvDSlKNJeadmhjtyANlBG', 'library', '2019-04-02 00:00:00'),
  ('Vn9vc1d5XFxE4T4B0PVGe', 'iLI-Z83ooba6RQAglkwyk', 'laundry', '2019-05-02 00:00:00'),
  ('KHuSxKyVy6AGwuIW3-o1y', 'Lr8AxOBnJ6U_j7XiAl4Vq', 'fruits', '2019-10-02 00:00:00'),
  ('sPcDYztwcEjYTEIYLP8h3', 'lZSG7Ww5h84e9J5LOxe1T', 'digital stuff', '2019-10-02 00:00:00'),
  ('HCN4HAjIj3lIKB9tb9doc', 'MsOjgJCz0KuUQ9z_4NTUu', 'language', '2019-09-02 00:00:00'),
  ('8wuS06DCjCTqv8AD6qTUX', 'NEeJQhlvb7r4O3hMsd7CI', 'housing', '2019-04-02 00:00:00'),
  ('8wuS06DCjCTqv8AD6qTUX', 'PKcCDX58hzwDZAv3ETGzC', 'course', '2019-04-02 00:00:00'),
  ('tIzOGGdf-95KfrApfy6yq', 'sJDNvkiIpkARhvdkC_sMt', 'meetings', '2019-04-09 00:00:00');
UNLOCK TABLES;

DROP TABLE IF EXISTS todos;

CREATE TABLE todos
(
  `todolist_id` varchar
(50) NOT NULL,
  `todo_id` varchar
(50) NOT NULL,
  `todo_name` varchar
(100) NOT NULL,
  `done` enum
('true','false') DEFAULT 'false',
  `due_date` datetime DEFAULT NULL,
  `tag` varchar
(50) DEFAULT NULL,
  PRIMARY KEY
(`todo_id`),
  FOREIGN KEY
(`todolist_id`) REFERENCES `todolists`
(`todolist_id`) ON
DELETE CASCADE
)
;


LOCK TABLES `todos` WRITE;
INSERT INTO 
todos
VALUES
  ('0U8YAoKhi31TGu9BHPYjt', '-lN3LY3dCMjGWuMStvhKS', 'buy 2 seat sofa', 'false', '2019-05-11 00:00:00', 'important'),
  ('BvDSlKNJeadmhjtyANlBG', '0Zl3I9F7pahr60VchlB4S', 'complete the new book', 'false', '2019-05-11 00:00:00', 'important'),
  ('MsOjgJCz0KuUQ9z_4NTUu', '4aAdJk8-x1D0HuIzySQn_', 'study for dutch', 'false', '2019-05-11 00:00:00', 'important'),
  ('PKcCDX58hzwDZAv3ETGzC', 'EvaKslrpsLvIMa7w9tnS4', 'prepare for the next class', 'false', '2019-05-11 00:00:00', 'important'),
  ('Lr8AxOBnJ6U_j7XiAl4Vq', 'FDbqiidUvi1lzeloEPeKS', 'buy some apple from albert heijn', 'false', '2019-05-11 00:00:00', 'important'),
  ('Lr8AxOBnJ6U_j7XiAl4Vq', 'fw7b-88-yyyk7yH5f_TD8', 'buy some banana from albert heijn', 'false', '2019-05-11 00:00:00', 'important'),
  ('3UthG7gWxIAcI-WbXAM9j', 'Gn_j4OOH6yz7Ju0kfnhlF', 'cheese', 'false', '2019-05-11 00:00:00', 'important'),
  ('-gEwx6en9qLEr0ZRuE5Q-', 'HEBnYHFdEXNTHBqpb-6Cv', 'buy sth 2', 'true', '2019-05-11 00:00:00', 'important'),
  ('lZSG7Ww5h84e9J5LOxe1T', 'KLkHVZReKTowBejB2RtYF', 'buy a keyboard for laptop', 'false', '2019-05-11 00:00:00', 'important'),
  ('Lr8AxOBnJ6U_j7XiAl4Vq', 'lcbZXwQO6B3_gvUk9seTs', 'buy some orange from albert heijn', 'false', '2019-05-11 00:00:00', 'important'),
  ('BvDSlKNJeadmhjtyANlBG', 'MsRc4TQx40JOvnQGSGc9U', 'take a new book', 'false', '2019-05-11 00:00:00', 'important'),
  ('0U8YAoKhi31TGu9BHPYjt', 'wJj3VTdcq0jngm_ECD_nK', 'buy 3 seat sofa', 'false', '2019-05-11 00:00:00', 'important'),
  ('3UthG7gWxIAcI-WbXAM9j', 'Xw31tfx0fp8pvd8ClC1KE', 'potatoes', 'false', '2019-05-11 00:00:00', 'important'),
  ('-gEwx6en9qLEr0ZRuE5Q-', 'Z7G6bsE4NFNPm9tGqIDBC', 'buy sth', 'false', '2019-05-11 00:00:00', 'important'),
  ('3UthG7gWxIAcI-WbXAM9j', 'ztqrZLSrEUhO0El871W5m', 'chili peppers', 'false', '2019-05-11 00:00:00', 'important'),
  ('0U8YAoKhi31TGu9BHPYjt', 'ZUB8p0IiJJs5UrgSf0Ka8', 'buy the carpets and curtains', 'false', '2019-05-11 00:00:00', 'important');
UNLOCK TABLES;