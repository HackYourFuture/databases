--
-- Definition for database hospital
--
DROP DATABASE IF EXISTS hospital;
CREATE DATABASE hospital
	CHARACTER SET utf8
	COLLATE utf8_general_ci;

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

-- 
-- Set default database
--
USE hospital;

--
-- Definition for table departments
--
CREATE TABLE departments (
  d_id INT(11) NOT NULL AUTO_INCREMENT,
  d_name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (d_id)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table ward
--
CREATE TABLE ward (
  ward_no INT(11) NOT NULL AUTO_INCREMENT,
  ward_name VARCHAR(50) DEFAULT NULL,
  dep_id INT(11) DEFAULT NULL,
  PRIMARY KEY (ward_no),
  CONSTRAINT FK_word_departments_d_id FOREIGN KEY (dep_id)
    REFERENCES departments(d_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table doctor
--
CREATE TABLE doctor (
  doctor_id INT(11) NOT NULL AUTO_INCREMENT,
  fname VARCHAR(255) DEFAULT NULL,
  lname VARCHAR(255) DEFAULT NULL,
  skill VARCHAR(255) DEFAULT NULL,
  ward_no INT(11) DEFAULT NULL,
  PRIMARY KEY (doctor_id),
  CONSTRAINT FK_doctor_ward_ward_no FOREIGN KEY (ward_no)
    REFERENCES ward(ward_no) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table patient
--
CREATE TABLE patient (
  patient_id INT(11) NOT NULL AUTO_INCREMENT,
  fname VARCHAR(255) DEFAULT NULL,
  lname VARCHAR(255) DEFAULT NULL,
  submit_on TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  diseases VARCHAR(255) DEFAULT NULL,
  ward_no INT(11) DEFAULT NULL,
  PRIMARY KEY (patient_id),
  CONSTRAINT FK_patient_ward_ward_no FOREIGN KEY (ward_no)
    REFERENCES ward(ward_no) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table nurses
--
CREATE TABLE nurses (
  nurse_id INT(11) NOT NULL AUTO_INCREMENT,
  fname VARCHAR(255) DEFAULT NULL,
  lname VARCHAR(255) DEFAULT NULL,
  date_of_birth DATE DEFAULT NULL,
  doctor_id INT(11) DEFAULT NULL,
  ward_no INT(11) DEFAULT NULL,
  PRIMARY KEY (nurse_id),
  CONSTRAINT FK_nurses_doctor_doctor_id FOREIGN KEY (doctor_id)
    REFERENCES doctor(doctor_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_nurses_ward_ward_no FOREIGN KEY (ward_no)
    REFERENCES ward(ward_no) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table nurses_patients
--
CREATE TABLE nurses_patients (
  patient_id INT(11) NOT NULL DEFAULT 0,
  nurse_id INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (nurse_id, patient_id),
  CONSTRAINT FK_nurses_patients_nurses_nurse_id FOREIGN KEY (nurse_id)
    REFERENCES nurses(nurse_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_nurses_patients_patient_patient_id FOREIGN KEY (patient_id)
    REFERENCES patient(patient_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
