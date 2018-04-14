CREATE DATABASE IF NOT EXISTS Company;
USE Company;

CREATE TABLE IF NOT EXISTS Employee (
  eID INT(4) NOT NULL,
  eName VARCHAR(45) NOT NULL,
  initials VARCHAR(10) NULL DEFAULT NULL,
  dateOfBirth DATE NOT NULL,
  position VARCHAR(20) NOT NULL,
  salary DECIMAL(7,2) NOT NULL,
  room VARCHAR(10) NOT NULL,
  bossNr INT(4) NULL DEFAULT NULL,
  dID INT(2) NOT NULL,
  PRIMARY KEY (eID));

CREATE TABLE IF NOT EXISTS Location (
  code VARCHAR(5) NOT NULL,
  description VARCHAR(45) NOT NULL,
  country VARCHAR(45) NOT NULL,
  mgrID INT(4) NULL DEFAULT NULL,
  PRIMARY KEY (code));

CREATE TABLE IF NOT EXISTS Department (
  dID INT(2) NOT NULL,
  dName VARCHAR(25) NOT NULL,
  LocationCode VARCHAR(5) NOT NULL,
  secretaryID INT(4) NULL DEFAULT NULL,
  PRIMARY KEY (dID));

CREATE TABLE IF NOT EXISTS SalaryScale (
  scale INT(2) NOT NULL,
  lowerLimit DECIMAL(7,0) NOT NULL,
  upperLimit DECIMAL(7,0) NOT NULL,
  PRIMARY KEY (scale));

ALTER TABLE Employee
  ADD CONSTRAINT Employee_has_boss_fk
    FOREIGN KEY (bossNr) REFERENCES Employee (eID),
  ADD CONSTRAINT Employee_work_in_Department_fk
    FOREIGN KEY (dID) REFERENCES Department (dID);

ALTER TABLE Location
  ADD CONSTRAINT Location_has_Manager_fk
    FOREIGN KEY (mgrID) REFERENCES Employee (eID);

ALTER TABLE Department
  ADD CONSTRAINT Department_has_Secretary_fk
    FOREIGN KEY (secretaryID) REFERENCES Employee (eID),
  ADD CONSTRAINT Department_is_in_Location_fk
    FOREIGN KEY (LocationCode) REFERENCES Location (code);

INSERT INTO SalaryScale VALUES (1,700,1200);
INSERT INTO SalaryScale VALUES (2,1201,1400);
INSERT INTO SalaryScale VALUES (3,1401,2000);
INSERT INTO SalaryScale VALUES (4,2001,3000);
INSERT INTO SalaryScale VALUES (5,3001,9999);

INSERT INTO Location VALUES ( 'AMS', 'Amsterdam Damrak', 'The Netherlands', null);
INSERT INTO Location VALUES ( 'ROT', 'Rotterdam Maashaven', 'The Netherlands', null);
INSERT INTO Location VALUES ( 'PAR', 'Paris', 'France', null);
INSERT INTO Location VALUES ( 'LON', 'London City', 'Great Britain', null);
INSERT INTO Location VALUES ( 'HAM', 'Hamburg', 'Germany', null);
INSERT INTO Department VALUES (10, 'Accounting','AMS', null);
INSERT INTO Department VALUES (20, 'Research', 'PAR', null);
INSERT INTO Department VALUES (30, 'Sales','AMS', null);
INSERT INTO Department VALUES (40, 'Supply & Distribution', 'ROT', null);
INSERT INTO Department VALUES (50, 'Manufacturing','HAM', null);
INSERT INTO Department VALUES (60, 'Operations','LON', null);

INSERT INTO Employee VALUES (7839, 'King', 'W.A.', '1981-11-17', 'CEO',  5000, '15A00', null, 10);
INSERT INTO Employee VALUES (7698, 'Barends', 'J.R.', '1981-05-01', 'Manager', 2850, '411', 7839, 30);
INSERT INTO Employee VALUES (7566, 'Duval', 'P.', '1981-04-02', 'Manager', 2975, 'A3-01', 7839, 20);
INSERT INTO Employee VALUES (7782, 'Clark', null, '1981-06-09', 'Manager', 2450, '11B23', 7839, 10 );
INSERT INTO Employee VALUES (7902, 'Macron', 'F.P.', '1981-12-03', 'Analyst', 2000, 'AAX-2', 7566, 20);
INSERT INTO Employee VALUES (7369, 'Danny', 'D.', '1980-12-17', 'Technician', 1800, 'AAX-11', 7902, 20);
INSERT INTO Employee VALUES (7499, 'Adema', 'A.', '1981-02-20', 'Salesman', 1600, '223', 7698, 30);
INSERT INTO Employee VALUES (7521, 'Deutekom', 'C. van', '1981-01-22', 'Secretary', 1050, '135', 7698, 20);
INSERT INTO Employee VALUES (7788, 'Magrait', 'F.', '1982-12-09', 'Analyst', 2200, 'B2-04', 7566, 20);
INSERT INTO Employee VALUES (7654, 'Martens', null, '1981-09-28', 'Salesman', 2250, '231', 7698, 30);
INSERT INTO Employee VALUES (7844, 'Dijkstra', 'E.W.', '1981-09-08', 'Salesman', 1500, '204', 7698, 30);
INSERT INTO Employee VALUES (7876, 'Papail', 'E.', '1983-01-12', 'Technician', 1700, 'AAX-11', 7788, 20);
INSERT INTO Employee VALUES (7900, 'Jansen', 'J.', '1981-12-03', 'Salesman', 1950, '15A01', 7698, 30 );
INSERT INTO Employee VALUES (7934, 'Miller', 'C.A.', '1982-01-23', 'Secretary', 1250, '15A01', 7782, 10);
INSERT INTO Employee VALUES (7417, 'Jager', 'R. de', '1970-03-10', 'Manager', 2685, 'C03-09', 7839, 40);
INSERT INTO Employee VALUES (7421, 'Drupper', 'K.', '1967-03-10', 'Analyst', 1685, 'C01-14', 7417, 40);
INSERT INTO Employee VALUES (7443, 'Holleder', 'W.', '1963-01-10', 'Technician', 1865, 'C01-19', 7417, 40);
INSERT INTO Employee VALUES (7623, 'Fritz', 'F.J.', '1963-03-12', 'Manager', 2985, 'A3-01', 7839, 50);
INSERT INTO Employee VALUES (7635, 'Frulich', 'M.', '1995-05-12', 'Technician', 1320, 'B7-24', 7623, 50);
INSERT INTO Employee VALUES (7647, 'Derckx', 'J.', '1998-01-12', 'Technician', 980, 'B7-25', 7623, 50);
INSERT INTO Employee VALUES (7658, 'Dietrich', 'M.', '1998-01-12', 'Secretary', 780, 'B7-25', 7623, 50);
INSERT INTO Employee VALUES (7663, 'Muller', 'A.', '1990-01-12', 'Technician', 1590, 'B4-28', 7623, 50);

UPDATE Location SET mgrID=7698 WHERE code='AMS';
UPDATE Location SET mgrID=7698 WHERE code='ROT';
-- UPDATE Location SET mgrID=7566 WHERE code='PAR';
-- UPDATE Location SET mgrID=7839 WHERE code='LON';
UPDATE Location SET mgrID=7623 WHERE code='HAM';

UPDATE Department SET secretaryID=7934 WHERE dID=10;
UPDATE Department SET secretaryID=7521 WHERE dID=20;
UPDATE Department SET secretaryID=7934 WHERE dID=30;
-- UPDATE Department SET secretaryID=7934 WHERE dID=40;
UPDATE Department SET secretaryID=7647 WHERE dID=50;
-- UPDATE Department SET secretaryID=7934 WHERE dID=60;
