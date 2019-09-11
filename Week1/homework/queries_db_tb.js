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
  IndepYear  SMALLINT(6) ,
  Population  INT(11) NOT NULL DEFAULT '0',
  LifeExpectancy  FLOAT(3,1) ,
  GNP  FLOAT(10,2) ,
  GNPOld  FLOAT(10,2) ,
  LocalName  CHAR(45) NOT NULL DEFAULT '',
  GovernmentForm  CHAR(45) NOT NULL DEFAULT '',
  HeadOfState  CHAR(60) ,
  Capital  CHAR(22) NOT NULL DEFAULT ''
) `;

const dropTableCity = `DROP table IF EXISTS city`;
const CreateTableCity = `CREATE TABLE city (
  ID INT(11) NOT NULL AUTO_INCREMENT,
  Name CHAR(35) NOT NULL DEFAULT '',
  CountryCode CHAR(3) NOT NULL DEFAULT '',
  District CHAR(20) NOT NULL DEFAULT '',
  Population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
)`;

const insertContires = [
    "INSERT INTO country VALUES ('USA','United States','North America','North America',9363520.00,1776,278357000,77.1,8510700.00,8110900.00,'United States','Federal Republic','George W. Bush','WASHINGTON, D.C.')",
    "INSERT INTO country VALUES ('UZB','Uzbekistan','Asia','Southern and Central Asia',447400.00,1991,24318000,63.7,14194.00,21300.00,'Uzbekiston','Republic','Islam Karimov','TASHKENT')",
    "INSERT INTO country VALUES ('VEN','Venezuela','South America','South America',912050.00,1811,24170000,73.1,95023.00,88434.00,'Venezuela','Federal Republic','Hugo Ch�vez Fr�as','CARACAS')",
    "INSERT INTO country VALUES ('NLD','Netherlands','Europe','Western Europe',41526.00,1581,15864000,78.3,371362.00,360478.00,'Nederland','Constitutional Monarchy','Beatrix','AMSTERDAM')",
    "INSERT INTO country VALUES ('ANT','Netherlands Antilles','North America','Caribbean',800.00,NULL,217000,74.7,1941.00,NULL,'Nederlandse Antillen','Nonmetropolitan Territory of The Netherlands','Beatrix','WILLEMSTAD')",
    "INSERT INTO country VALUES ('BVT','Bouvet Island','Antarctica','Antarctica',59.00,NULL,0,NULL,0.00,NULL,'Bouvet�ya','Dependent Territory of Norway','Harald V','')",
    "INSERT INTO country VALUES ('CCK','Cocos (Keeling) Islands','Oceania','Australia and New Zealand',14.00,NULL,600,NULL,0.00,NULL,'Cocos (Keeling) Islands','Territory of Australia','Elisabeth II','WEST ISLAND')",
    "INSERT INTO country VALUES ('ALB','Albania','Europe','Southern Europe',28748.00,1912,3401200,71.6,3205.00,2500.00,'Shqip�ria','Republic','Rexhep Mejdani','TIRANA')",
    "INSERT INTO country VALUES ('AND','Andorra','Europe','Southern Europe',468.00,1278,78000,83.5,1630.00,NULL,'Andorra','Parliamentary Coprincipality','','ANDORRA LA VELLA')",
    "INSERT INTO country VALUES ('AUT','Austria','Europe','Western Europe',83859.00,1918,8091800,77.7,211860.00,206025.00,'�sterreich','Federal Republic','Thomas Klestil','VIENNA')",
    "INSERT INTO country VALUES ('RUS','Russian Federation','Europe','Eastern Europe',17075400.00,1991,146934000,67.2,276608.00,442989.00,'Rossija','Federal Republic','Vladimir Putin','MOSCOW')",
    "INSERT INTO country VALUES ('ATA','Antarctica','Antarctica','Antarctica',13120000.00,NULL,0,NULL,0.00,NULL,'�','Co-administrated','','')",
    "INSERT INTO country VALUES ('CAN','Canada','North America','North America',9970610.00,1867,31147000,79.4,598862.00,625626.00,'Canada','Constitutional Monarchy, Federation','Elisabeth II','OTTAWA')",
    "INSERT INTO country VALUES ('CHN','China','Asia','Eastern Asia',9572900.00,-1523,1277558000,71.4,982268.00,917719.00,'Zhongquo','Peoples Republic','Jiang Zemin','BEIJING')",
    "INSERT INTO country VALUES ('BRA','Brazil','South America','South America',8547403.00,1822,170115000,62.9,776739.00,804108.00,'Brasil','Federal Republic','Fernando Henrique Cardoso','BRASILIA')",
    "INSERT INTO country VALUES ('IND','India','Asia','Southern and Central Asia',3287263.00,1947,1013662000,62.5,447114.00,430572.00,'Bharat/India','Federal Republic','Kocheril Raman Narayanan','NEW DELHI')",
    "INSERT INTO country VALUES ('ARG','Argentina','South America','South America',2780400.00,1816,37032000,75.1,340238.00,323310.00,'Argentina','Federal Republic','Fernando de la R�a','BUENOS AIRES')",
    "INSERT INTO country VALUES ('KAZ','Kazakstan','Asia','Southern and Central Asia',2724900.00,1991,16223000,63.2,24375.00,23383.00,'Qazaqstan','Republic','Nursultan Nazarbajev','NUR-SULTAN')",
];

const insertCities = [
    "INSERT INTO city VALUES (ID,'Amsterdam','NLD','Noord-Holland',731200)",
    "INSERT INTO city VALUES (ID,'Rotterdam','NLD','Zuid-Holland',593321)",
    "INSERT INTO city VALUES (ID,'Oran','DZA','Oran',609823)",
    "INSERT INTO city VALUES (ID,'Haag','NLD','Zuid-Holland',440900)",
    "INSERT INTO city VALUES (ID,'Mumbai (Bombay)','IND','Maharashtra',10500000)",
    "INSERT INTO city VALUES (ID,'Seoul','KOR','Seoul',9981619)",
    "INSERT INTO city VALUES (ID,'S�o Paulo','BRA','S�o Paulo',9968485)",
    "INSERT INTO city VALUES (ID,'Shanghai','CHN','Shanghai',9696300)",
    "INSERT INTO city VALUES (ID,'Jakarta','IDN','Jakarta Raya',9604900)",
    "INSERT INTO city VALUES (ID,'Karachi','PAK','Sindh',9269265)",
    "INSERT INTO city VALUES (ID,'Istanbul','TUR','Istanbul',8787958)",
    "INSERT INTO city VALUES (ID,'Ciudad de M�xico','MEX','Distrito Federal',8591309)",
    "INSERT INTO city VALUES (ID,'Moscow','RUS','Moscow (City)',8389200)",
    "INSERT INTO city VALUES (ID,'New York','USA','New York',8008278)",
];
module.exports = {
    dropDbWorld,
    creatDbWorld,
    dropTableCountry,
    CreateTableCountry,
    dropTableCity,
    CreateTableCity,
    insertContires,
    insertCities,
};
1;