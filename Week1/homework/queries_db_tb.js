'use strict';

const dropDbWorld = `DROP SCHEMA IF EXISTS world`;
const creatDbWorld = `CREATE SCHEMA world`;

const dropTableCountry = `DROP TABLE IF EXISTS country`;
const CreateTableCountry = `CREATE TABLE  country  (
  Code  CHAR(3) NOT NULL DEFAULT '',
  Name  CHAR(52) NOT NULL DEFAULT '',
  Continent  enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
  Region  CHAR(26) NOT NULL DEFAULT '',
  SurfaceArea  FLOAT(10,2) NOT NULL DEFAULT '0.00',
  IndepYear  SMALLINT(6) DEFAULT NULL,
  Population  INT(11) NOT NULL DEFAULT '0',
  LifeExpectancy  FLOAT(3,1) DEFAULT NULL,
  GNP  FLOAT(10,2) DEFAULT NULL,
  GNPOld  FLOAT(10,2) DEFAULT NULL,
  LocalName  CHAR(45) NOT NULL DEFAULT '',
  GovernmentForm  CHAR(45) NOT NULL DEFAULT '',
  HeadOfState  CHAR(60) DEFAULT NULL,
  Capital  INT(11) DEFAULT NULL,
  Code2  CHAR(2) NOT NULL DEFAULT '',
 PRIMARY KEY ( Code )
) `;

const dropTableCity = `DROP table IF EXISTS city`;
const CreateTableCity = `CREATE TABLE city (
  ID INT(11) NOT NULL AUTO_INCREMENT,
  Name CHAR(35) NOT NULL DEFAULT '',
  CountryCode CHAR(3) NOT NULL DEFAULT '',
  District CHAR(20) NOT NULL DEFAULT '',
  Population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID),
  KEY CountryCode (CountryCode),
  CONSTRAINT city_ibfk_1 FOREIGN KEY (CountryCode) REFERENCES country (Code)
)`;

module.exports = {
    dropDbWorld,
    creatDbWorld,
    dropTableCountry,
    CreateTableCountry,
    dropTableCity,
    CreateTableCity,
};