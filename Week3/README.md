
CREATE DATABASE IF NOT EXISTS supermarket;

USE supermarket;

CREATE TABLE IF NOT EXISTS supermarket.products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL
  unit VARCHAR(15) NOT NULL,
  minimum_quantity_allowed INT NOT NULL,
  PRIMARY KEY (id))
  ENGINE = DB;

CREATE TABLE IF NOT EXISTS supermarket.supplier (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  mobilephone VARCHAR(20) NOT NULL,
  localphone VARCHAR(20) NULL,
  email VARCHAR(45) NOT NULL,
  address VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
  ENGINE = DB;

CREATE TABLE IF NOT EXISTS supermarket.purchase (
  id INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  supplier_id INT NOT NULL,
  PRIMARY KEY (id, supplier_id),
  INDEX fk_purchase_supplier_idx (supplier_id ASC),
  CONSTRAINT fk_purchase_supplier
  FOREIGN KEY (supplier_id)
  REFERENCES supermarket.supplier(id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
  ENGINE = DB;

CREATE TABLE IF NOT EXISTS supermarket.purchase_products (
  id INT NOT NULL AUTO_INCREMENT,
  products_id INT NOT NULL,
  purchase_id INT NOT NULL,
  quantity INT NOT NULL,
  expiration_date DATE NOT NULL,
  purchasing_price DECIMAL NOT NULL,
  selling_price DECIMAL NOT NULL,
  PRIMARY KEY (id , products_id , purchase_id ),
  INDEX fk_supermarket_products_idx (products_id ASC),
  INDEX fk_supermarket_purchase 1_idx (purchase_id  ASC),
  CONSTRAINT fk_supermarket_product1
  FOREIGN KEY (products_id)
  REFERENCES supermarket.products (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT  fk_supermarket_purchase1
  FOREIGN KEY (purchase_id)
  REFERENCES supermarket.purchase (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
ENGINE = DB;

CREATE TABLE IF NOT EXISTS supermarket.sale (
  id INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  PRIMARY KEY (id))
ENGINE = DB;

CREATE TABLE IF NOT EXISTS supermarket_sale.products (
  purchase_products_id INT NOT NULL,
  sale_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (purchase_products_id, sale_id),
  INDEX fk_sale_products_sale1_idx (sale_id ASC),
  CONSTRAINT fk_sale_products_purchase_part1
  FOREIGN KEY (purchase_products_id)
  REFERENCES supermarket.purchase_products (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT fk_sale_products_sale1
  FOREIGN KEY (sale_id)
  REFERENCES supermarket.sale (id)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
ENGINE = DB; 
