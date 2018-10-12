CREATE database elektronicsmarkets;
USE elektronicsmarkets;

CREATE TABLE producttype(
    producttypeid INT NOT NULL AUTO_INCREMENT,
    typename VARCHAR(50) NOT NULL,
    sub1typename VARCHAR(50),
    sub2typename VARCHAR(50),
    sub3typename VARCHAR(50),
    description VARCHAR(1000),
    PRIMARY KEY (producttypeid)
);

CREATE TABLE products(
    productid INT NOT NULL AUTO_INCREMENT,
    barkodinfo INT NOT NULL,
    producttypeid INT NOT NULL,
    productname VARCHAR(50) NOT NULL,
    trademarkid INT NOT NULL,
    purchaseprice DECIMAL(13,2) NOT NULL,
	retailprice DECIMAL(13,2),
	profit DECIMAL(13,2),
	stocksstatus BOOLEAN NOT NULL DEFAULT FALSE,
    description VARCHAR(1000),
    PRIMARY KEY (productid)
);

CREATE TABLE trademark(
    trademarkid INT NOT NULL AUTO_INCREMENT,
    trademarkname VARCHAR(50) NOT NULL,
    supplierid INT NOT NULL,
    suppliercontact INT NOT NULL,
    servicename VARCHAR(50) NOT NULL,
    servicecontact INT NOT NULL,
	description VARCHAR(1000),
    PRIMARY KEY (trademarkid)
);

CREATE TABLE shops(
    shopid INT NOT NULL AUTO_INCREMENT,
    shopname VARCHAR(50) NOT NULL,
    shopcontact INT NOT NULL,
    director INT NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY (shopid)
);

CREATE TABLE employee(
    employeeid INT NOT NULL AUTO_INCREMENT,
    employeename VARCHAR(50) NOT NULL,
    employeesurname VARCHAR(50) NOT NULL,
    gender ENUM('m','f') NOT NULL,
    duty VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    workplaceid INT NOT NULL,
    supervisorid INT NOT NULL,
    employeecontact INT NOT NULL,
    salaryid INT NOT NULL,
    jobstartingdate DATE NOT NULL,
    performancescroe INT(2),
	description VARCHAR(1000),
    PRIMARY KEY (employeeid)
);

CREATE TABLE contactinfo(
    contactinfoid INT NOT NULL AUTO_INCREMENT,
    phonenumber1 VARCHAR(20),
    phonenumber2 VARCHAR(20),
    address1 VARCHAR(50),
    address2 VARCHAR(50),
    email1 VARCHAR(50),
    email2 VARCHAR(50),
    description VARCHAR(1000),
    PRIMARY KEY (contactinfoid)
);

CREATE TABLE salary(
    salaryid INT NOT NULL AUTO_INCREMENT,
    outgoingid INT,
    employeeid INT NOT NULL,
    hourlyamount DECIMAL(13,2) NOT NULL,
	monthlyamount DECIMAL(13,2),
    salarydate date,
    transferdate date,
	description VARCHAR(1000),
    PRIMARY KEY (salaryid)
);

CREATE TABLE orderrequest(
    orderid INT NOT NULL AUTO_INCREMENT,
    orderdate DATE NOT NULL,
    productid INT NOT NULL,
    customerid INT NOT NULL,
	payment INT NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY (orderid)
);

CREATE TABLE supplier(
    supplierid INT NOT NULL AUTO_INCREMENT,
    suppliername VARCHAR(50) NOT NULL,
    suppliercontact INT NOT NULL,
    payment INT NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY (supplierid)
);

CREATE TABLE customer(
    customerid INT NOT NULL AUTO_INCREMENT,
    customername VARCHAR(50) NOT NULL,
    customersurname VARCHAR(50) NOT NULL,
    customercontact INT NOT NULL,
    orderhistory INT NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY (customerid)
);

CREATE TABLE outgoing(
    outgoingid INT NOT NULL AUTO_INCREMENT,
    outgoingowner INT NOT NULL,
    amount DECIMAL(13,2),
    paymenttype VARCHAR(50),
    paymentdate DATE,
    paymentstatus BOOLEAN NOT NULL DEFAULT FALSE,
    description VARCHAR(1000),
    PRIMARY KEY (outgoingid)
);

CREATE TABLE income(
    incomeid INT NOT NULL AUTO_INCREMENT,
    incomeowner INT NOT NULL,
    amount DECIMAL(13,2),
    paymenttype VARCHAR(50),
    paymentdate DATE,
    paymentstatus BOOLEAN NOT NULL DEFAULT FALSE,
    description VARCHAR(1000),
    PRIMARY KEY (incomeid)
);

CREATE TABLE finance(
    financeid INT NOT NULL AUTO_INCREMENT,
    registerdate DATE,
    outgoingid INT NOT NULL,
    incomeid INT NOT NULL,
    instantcapital DECIMAL(13,2),
    instantdebt DECIMAL(13,2),
    description VARCHAR(1000),
    PRIMARY KEY (financeid)
);

ALTER TABLE products ADD FOREIGN KEY (producttypeid) REFERENCES producttype(producttypeid);
ALTER TABLE products ADD FOREIGN KEY (trademarkid) REFERENCES trademark(trademarkid);
ALTER TABLE trademark ADD FOREIGN KEY (suppliercontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE trademark ADD FOREIGN KEY (servicecontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE shops ADD FOREIGN KEY (shopcontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE shops ADD FOREIGN KEY (director) REFERENCES employee(employeeid);
ALTER TABLE employee ADD FOREIGN KEY (workplaceid) REFERENCES shops(shopid);
ALTER TABLE employee ADD FOREIGN KEY (supervisorid) REFERENCES employee(employeeid);
ALTER TABLE employee ADD FOREIGN KEY (employeecontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE employee ADD FOREIGN KEY (salaryid) REFERENCES salary(salaryid);
ALTER TABLE salary ADD FOREIGN KEY (outgoingid) REFERENCES outgoing(outgoingid);
ALTER TABLE salary ADD FOREIGN KEY (employeeid) REFERENCES employee(employeeid);
ALTER TABLE orderrequest ADD FOREIGN KEY (productid) REFERENCES products(productid);
ALTER TABLE orderrequest ADD FOREIGN KEY (payment) REFERENCES income(incomeid);
ALTER TABLE supplier ADD FOREIGN KEY (suppliercontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE supplier ADD FOREIGN KEY (payment) REFERENCES outgoing(outgoingid);
ALTER TABLE customer ADD FOREIGN KEY (customercontact) REFERENCES contactinfo(contactinfoid);
ALTER TABLE customer ADD FOREIGN KEY (orderhistory) REFERENCES orderrequest(orderid);
ALTER TABLE outgoing ADD FOREIGN KEY (outgoingowner) REFERENCES supplier(supplierid);
ALTER TABLE income ADD FOREIGN KEY (incomeowner) REFERENCES customer(customerid);
ALTER TABLE finance ADD FOREIGN KEY (incomeid) REFERENCES income(incomeid);
ALTER TABLE finance ADD FOREIGN KEY (outgoingid) REFERENCES outgoing(outgoingid);

INSERT INTO producttype VALUES (null, 'COMPUTER_CPU_INTEL', 'INTEL', 'CPU', 'COMPUTER', 'Intel CPU Products');

