const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb'
});

connection.connect();

// creating database world
let sql = "create database if not exists world"
connection.query(sql, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

connection.query("use world")

let countries_query = "create table if not exists countries(country_name varchar(20) unique, country_population bigint, continent varchar(20), surface_area int,primary key(country_name))"
connection.query(countries_query, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

let insert_countries = [
  "insert into countries values ('France',64979548,'Europe',551500)",
  "insert into countries values ('Netherlands',17035938,'Europe',41.543)",
  "insert into countries values ('Canada',36624199,'Americas',9984670)",
  "insert into countries values ('United States',324459463,'Americas',9833516)",
  "insert into countries values ('China',7550262101,'Asia',9598094)",
  "insert into countries values ('Germany',82114224,'Europe',357375)",
  "insert into countries values ('Australia',24450561,'Oceania',7692024)",
  "insert into countries values ('India',1339180127,'Asia',3287263)",
  "insert into countries values ('Argentina',44271041,'Americas',2780400)",
  "insert into countries values ('Syria',18269868,'Asia',185180)",
  "insert into countries values ('Algeria',41318142,'Africa',2381741)",
  "insert into countries values ('Greenland',56480,'Americas',2166000)",
  "insert into countries values ('Japan',127484450,'Asia',377915)",
  "insert into countries values ('Italy',59359900,'Europe',301318)",
  "insert into countries values ('Kazakhstan',18204499,'Asia',2724900)",
  "insert into countries values ('Turkey',80745020,'Asia',783562)",
  "insert into countries values ('Romania',19679306,'Europe',238391)",
  "insert into countries values ('Brazil',209288278,'Americas',8514877)",
  "insert into countries values ('Mexico',129163276,'Americas',1964375)",
  "insert into countries values ('Russia',143989754,'Europe',17098242)"
]

for (let i in insert_countries) {
  connection.query(insert_countries[i], function (error, results) {
    if (error) {
      throw error;
    }
    console.log(results);
  });
}

let cities_query = "create table if not exists cities(city_name varchar(25) unique,country varchar(20),city_population int,primary key(city_name))"
connection.query(cities_query, function (error, results) {
  if (error) {
    throw error;
  }
  console.log(results);
});

let insert_cities = [
  "insert into cities values ('Paris','France',2152000)",
  "insert into cities values ('Marseille','France',808000)",
  "insert into cities values ('Lyon','France',422000)",
  "insert into cities values ('Toulouse','France',366000)",
  "insert into cities values ('Nice','France',346000)",
  "insert into cities values ('Amsterdam','Netherlands',741636)",
  "insert into cities values ('Rotterdam','Netherlands',598199)",
  "insert into cities values ('The Hague','Netherlands',474292)",
  "insert into cities values ('Utrecht','Netherlands',290529)",
  "insert into cities values ('Eindhoven','Netherlands',209620)",
  "insert into cities values ('Toronto','Canada',2600000)",
  "insert into cities values ('Montreal','Canada',1600000)",
  "insert into cities values ('Calgary','Canada',1019942)",
  "insert into cities values ('Ottawa','Canada',812129)",
  "insert into cities values ('New York','United States',8550405)",
  "insert into cities values ('Los Angeles','United States',3971883)",
  "insert into cities values ('Chicago','United States',2720546)",
  "insert into cities values ('Houston','United States',2296224)",
  "insert into cities values ('Philadelphia','United States',1567442)",
  "insert into cities values ('Phoenix','United States',1563025)",
  "insert into cities values ('Shanghai','China',22315474)",
  "insert into cities values ('Beijing','China',11716620)",
  "insert into cities values ('Tianjin','China',11090314)",
  "insert into cities values ('Guangzhou','China',11071424)",
  "insert into cities values ('Shenzhen','China',10358381)",
  "insert into cities values ('Berlin','Germany',3439100)",
  "insert into cities values ('Hamburg','Germany',1769117)",
  "insert into cities values ('Munich','Germany',1330440)",
  "insert into cities values ('Cologne','Germany',998105)",
  "insert into cities values ('Frankfurt','Germany',671927)",
  "insert into cities values ('Sydney','Australia',4900000)",
  "insert into cities values ('Melbourne','Australia',4500000)",
  "insert into cities values ('Perth','Australia',2000000)",
  "insert into cities values ('Adelaide','Australia',1300000)",
  "insert into cities values ('Brisbane','Australia',2300000)",
  "insert into cities values ('Mumbai','India',12691836)",
  "insert into cities values ('Delhi','India',10927986)",
  "insert into cities values ('Bengaluru','India',5104047)",
  "insert into cities values ('Kolkata','India',4631392)",
  "insert into cities values ('Chennai','India',4328063)",
  "insert into cities values ('Buenos Aires','Argentina',13076300)",
  "insert into cities values ('Cordoba','Argentina',1428214)",
  "insert into cities values ('Rosario','Argentina',1173533)",
  "insert into cities values ('Mendoza','Argentina',876884)",
  "insert into cities values ('San Miguel de Tucuman','Argentina',781023)",
  "insert into cities values ('Damascus','Syria',1569394)",
  "insert into cities values ('Aleppo','Syria',1602264)",
  "insert into cities values ('Homs','Syria',775404)",
  "insert into cities values ('Hamah','Syria',460602)",
  "insert into cities values ('Latakia','Syria',340181)",
  "insert into cities values ('Algiers','Algeria',1977663)",
  "insert into cities values ('Boumerdas','Algeria',786499)",
  "insert into cities values ('Oran','Algeria',645984)",
  "insert into cities values ('Tebessa','Algeria',634332)",
  "insert into cities values ('Constantine','Algeria',450097)",
  "insert into cities values ('Nuuk','Greenland',14798)",
  "insert into cities values ('Sisimiut','Greenland',5.227)",
  "insert into cities values ('Ilulissat','Greenland',4413)",
  "insert into cities values ('Qaqortoq','Greenland',3224)",
  "insert into cities values ('Tokyo','Japan',8336599)",
  "insert into cities values ('Yokohama','Japan',3574443)",
  "insert into cities values ('Osaka','Japan',2592413)",
  "insert into cities values ('Nagoya','Japan',2191279)",
  "insert into cities values ('Sapporo','Japan',1883027)",
  "insert into cities values ('Rome','Italy',2318895)",
  "insert into cities values ('Milan','Italy',1236837)",
  "insert into cities values ('Naples','Italy',959470)",
  "insert into cities values ('Turin','Italy',870456)",
  "insert into cities values ('Palermo','Italy',648260)",
  "insert into cities values ('Almaty','Kazakhstan',2000900)",
  "insert into cities values ('karagandy','Kazakhstan',451800)",
  "insert into cities values ('Shymkent','Kazakhstan',414032)",
  "insert into cities values ('Taraz','Kazakhstan',358153)",
  "insert into cities values ('Astana','Kazakhstan',345604)",
  "insert into cities values ('Istanbul','Turkey',14804116)",
  "insert into cities values ('Ankara','Turkey',3517182)",
  "insert into cities values ('Izmir','Turkey',2500603)",
  "insert into cities values ('Bursa','Turkey',1412701)",
  "insert into cities values ('Adana','Turkey',1248988)",
  "insert into cities values ('Bucharest','Romania',1877155)",
  "insert into cities values ('Timisoara','Romania',315053)",
  "insert into cities values ('Craiova','Romania',304142)",
  "insert into cities values ('Constanta','Romania',303399)",
  "insert into cities values ('Brasov','Romania',276088)",
  "insert into cities values ('Sao Paulo','Brazil',10021295)",
  "insert into cities values ('Rio de Janeiro','Brazil',6023699)",
  "insert into cities values ('Salvador','Brazil',2711840)",
  "insert into cities values ('Fortaleza','Brazil',2400000)",
  "insert into cities values ('Belo Horizonte','Brazil',237224)",
  "insert into cities values ('Mexico','Mexico',12294193)",
  "insert into cities values ('Iztapalapa','Mexico',1820888)",
  "insert into cities values ('Ecatepec','Mexico',1806226)",
  "insert into cities values ('Guadalajara','Mexico',1640589)",
  "insert into cities values ('Puebla','Mexico',1590256)",
  "insert into cities values ('Moscow','Russia',11514330)",
  "insert into cities values ('Saint Petersburg','Russia',4848742)",
  "insert into cities values ('Novosibirsk','Russia',1473737)",
  "insert into cities values ('Yekaterinburg','Russia',1350136)",
  "insert into cities values ('Nizhny Novgorod','Russia',1250615)"
]

for (let i in insert_cities) {
  connection.query(insert_cities[i], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  });
}

connection.end();