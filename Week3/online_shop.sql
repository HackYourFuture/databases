CREATE DATABASE online_shop;

,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

CREATE TABLE users(
username varchar(50) NOT NULL,
email varchar(250) NOT NULL,
PRIMARY KEY(email)
);

CREATE TABLE orders(
id INT NOT NULL AUTO_INCREMENT,
purchase_date DATE NOT NULL,
user_email varchar(250) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(user_email) REFERENCES users(email)
);

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
name varchar(50) NOT NULL,
price INT(6) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE products_orders(
order_id INT NOT NULL,
product_id INT NOT NULL,
FOREIGN KEY(order_id) REFERENCES orders(id),  
FOREIGN KEY(product_id) REFERENCES products(id)
);
