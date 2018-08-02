CREATE DATABASE hyf;
USE hyf;

CREATE TABLE class(
  classNumber INT(11) NOT NULL,
  startDate DATE,
  endDate DATE,
  project TEXT,
  PRIMARY KEY (classNumber)
);

CREATE TABLE student(
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL,
  phone VARCHAR(15),
  joinDate DATE,
  leaveDate DATE,
  isGraduated TINYINT(1) DEFAULT 0,
  classNumber INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (classNumber) REFERENCES class(classNumber)
);

CREATE TABLE organizer(
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL,
  phone VARCHAR(15),
  joinDate DATE,
  PRIMARY KEY (id)
);

CREATE TABLE teacher(
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL,
  phone VARCHAR(15),
  joinDate DATE,
  PRIMARY KEY (id)
);

CREATE TABLE module(
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  weeks INT(11) NOT NULL,
  desciption TEXT,
  gitRepo TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE moduleTeacher(
  teacherId INT(11) NOT NULL,
  moduleId INT(11) NOT NULL,
  FOREIGN KEY (teacherId) REFERENCES teacher(id),
  FOREIGN KEY (moduleId) REFERENCES module(id),
  PRIMARY KEY (teacherId,moduleId)
);

CREATE TABLE teachingLog(
  classNumber INT(11) NOT NULL,
  teacherId INT(11) NOT NULL,
  moduleId INT(11) NOT NULL,
  FOREIGN KEY (classNumber) REFERENCES class(classNumber),
  FOREIGN KEY (teacherId) REFERENCES moduleTeacher(teacherId),
  FOREIGN KEY (moduleId) REFERENCES moduleTeacher(moduleId),
  PRIMARY KEY (classNumber,teacherId,moduleId)
);