
CREATE TABLE User(
   ID   INT              NOT NULL AUTO_INCREMENT,
   NAME VARCHAR (30)     NOT NULL,
   listID INT            NOT NULL,       
   PRIMARY KEY (ID)
);
CREATE TABLE List(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   todoID INT 	         NOT NULL,       
   PRIMARY KEY (ID)
);
CREATE TABLE Todo(
   ID   INT              NOT NULL,
   listID INT            NOT NULL,
   TASK VARCHAR(20)		 NOT NULL,
   STATUS VARCHAR (10),
   startDate DATETIME,
   endDate  DATETIME,
   PRIMARY KEY (ID)
);
