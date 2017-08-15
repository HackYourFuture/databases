CREATE TABLE Farm (
    FarmName varchar(255) ,
    Surface int,
    City varchar(255),
    sort varchar(255),
    PRIMARY KEY (FarmName)
);

CREATE TABLE Stable (
    StableName varchar(255),
    Color varchar(255),
    Capacity int,
    FarmName varchar(255),
    PRIMARY KEY (StableName),
    FOREIGN KEY (FarmName) REFERENCES Farm(FarmName)

);

CREATE TABLE Sheep (
    Nr int NOT NULL,
    Race varchar(255),
    weight int,
    StableName varchar(255),
    PRIMARY KEY (Nr),
    FOREIGN KEY (StableName) REFERENCES Stable(StableName)

);
CREATE TABLE Farmer (
    FarmerName varchar(255),
    LastName varchar(255) NOT NULL,
    Age int,
    Address varchar(255),
    PRIMARY KEY (FarmerName)
);

CREATE TABLE FarmFarmer (
  FarmerName varchar(255) REFERENCES Farmer(FarmerName),
  FarmName varchar(255) REFERENCES Farm(FarmName),
  PRIMARY KEY (FarmerName,FarmName)

);

INSERT INTO Farm(FarmName,Surface,City,sort)
VALUES ('A','2000','Amsterdam','Animal');

INSERT INTO Farmer
VALUES ('Mohandis','cruis','34','somewhere'),
       ('peter','cloney','54','anywhere');

INSERT INTO Stable
VALUES ('sheeps1','red','40','a'),
       ('sheeps2','blue','50','a'),
       ('sheeps3','green','60','b');


INSERT INTO Sheep
VALUES ('1','cutton','40','sheeps1'),
       ('2','milky','43','sheeps2'),
       ('3','meet','34','sheeps2');
