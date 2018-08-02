CREATE DATABASE order_product;

use order_product;

CREATE TABLE costumer(
  costumer_id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(1024) NOT NULL,
  password VARCHAR(1024),
  name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(1024),
  number INT ,
  city VARCHAR(30),
  zip_code NCHAR(10),
  address VARCHAR(255),
  house_number NCHAR(10)
);

CREATE TABLE order_table(
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  date DATETIME,
  costumer_id INT, 
  FOREIGN KEY (costumer_id) REFERENCES costumer (costumer_id)
);

CREATE TABLE order_product(
  order_id INT,
  product_id INT,
  PRIMARY KEY (order_id , product_id),
  quantity INT NOT NULL
);

CREATE TABLE product(
  product_id INT PRIMARY KEY,
  brand VARCHAR(40),
  price DEC,
  color VARCHAR(30),
  model VARCHAR(30)
);
