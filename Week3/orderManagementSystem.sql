CREATE DATABASE orderManagementSystem;

USE orderManagementSystem;

CREATE TABLE customer(
  customerID INT PRIMARY KEY AUTO_INCREMENT,
  customerFirstName VARCHAR(1024),
  customerLastName VARCHAR(1024),
  customerPhoneNumber VARCHAR(1024)
);

CREATE TABLE foodAndBeverages (
  itemID INT PRIMARY KEY AUTO_INCREMENT,
  itemName VARCHAR(1024),
  unitPrice DECIMAL( 10, 2 ) NOT NULL,
  description TEXT,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customerID)
);

CREATE TABLE orders(
  orderID INT PRIMARY KEY AUTO_INCREMENT,
  quantity INT,
  orderDate DATETIME,
  customerPhoneNumber VARCHAR(1024),
  customer_ID INT NOT NULL,
  FOREIGN KEY (customer_ID) REFERENCES customer(customerID)
);

CREATE TABLE delivery(
  deliveryID INT PRIMARY KEY AUTO_INCREMENT,
  deliveryAddress VARCHAR(1024),
  deliveryDate DATETIME,
  order_ID INT NOT NULL,
  FOREIGN KEY (order_ID) REFERENCES orders(orderID)
);

CREATE TABLE regularCustomer(
    regCustomer INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE customerMember(
  totalpuch INT PRIMARY KEY AUTO_INCREMENT,
  totalPurchases INT
);

CREATE TABLE employee(
  employeeID INT PRIMARY KEY AUTO_INCREMENT,
  employeeFirstName VARCHAR(1024),
  employeeLastName VARCHAR(1024),
  employeeAddress VARCHAR(1024),
  employeePhoneNumber VARCHAR(1024),
  delivery_ID INT NOT NULL,
  FOREIGN KEY (delivery_ID) REFERENCES delivery(deliveryID)
);


===========================================================================================


/*MariaDB [(none)]> use orderManagementSystem;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [orderManagementSystem]> SHOW TABLES;
+---------------------------------+
| Tables_in_orderManagementSystem |
+---------------------------------+
| customer                        |
| customerMember                  |
| delivery                        |
| employee                        |
| foodAndBeverages                |
| orders                          |
| regularCustomer                 |
+---------------------------------+
7 rows in set (0.00 sec)
*/

=========================================================================================

/*An order management system for a Food Catering Company that offers food delivery.

The Entity Relationship Diagram has five Entities. 

1. Relationship between customer and foodAndBeverage is one to many.Customer requests and item.
2. Customer submits an order. This is a many ot many relationship.
3. On order and delivery the relationship is many to many.
4. On employment and delivery the relationship is one to many.
5. On customer and delivery the relationship is many to many.

- I did not include data types for each field in the E.R.D because i want to keep my diagram clean. i have included data
types in the .sql file.
- regulaCustomer and customerMemeber are optional entities. */