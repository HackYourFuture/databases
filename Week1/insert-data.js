"use strict"
// Inserting data into tables
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

db.connect();

const countries = [
  "INSERT INTO country VALUES ('China', 1417442217, 9706961, 'Asia')",
  "INSERT INTO country VALUES ('India', 1360507890, 17287590, 'Asia')",
  "INSERT INTO country VALUES ('United States', 327768130, 9372610, 'America')",
  "INSERT INTO country VALUES ('Indonesia', 268019280, 1904569, 'Asia')",
  "INSERT INTO country VALUES ('Brazil', 211555788, 8515767, 'America')",
  "INSERT INTO country VALUES ('Pakistan', 202466623, 881912, 'Asia')",
  "INSERT INTO country VALUES ('Turkey', 82401503, 783562, 'Asia')",
  "INSERT INTO country VALUES ('Germany', 82365961, 357114, 'Europe')",
  "INSERT INTO country VALUES ('France', 65343299, 551695, 'Europe')",
  "INSERT INTO country VALUES ('United Kingdom', 66742203, 242900, 'Europe')",
  "INSERT INTO country VALUES ('Italy', 59258533, 301336, 'Europe')",
  "INSERT INTO country VALUES ('Spain', 46402858, 505992, 'Europe')",
  "INSERT INTO country VALUES ('Netherlands', 17105606, 41850, 'Europe')",
  "INSERT INTO country VALUES ('Norway', 5375146, 323802, 'Europe')",
  "INSERT INTO country VALUES ('Qatar', 2722038, 11586, 'Asia')",
  "INSERT INTO country VALUES ('Bahrain', 1595454, 765, 'Asia')",
  "INSERT INTO country VALUES ('Switzerland', 8574562, 41284, 'Europe')",
  "INSERT INTO country VALUES ('Estonia', 1305357, 45227, 'Europe')",
  "INSERT INTO country VALUES ('Macau', 636870, 30, 'Asia')",
  "INSERT INTO country VALUES ('Montenegro', 629378, 13812, 'Europe')",
  "INSERT INTO country VALUES ('Luxembourg', 593501, 2586, 'Europe')",
  "INSERT INTO country VALUES ('Malta', 432566, 316, 'Europe')",
  "INSERT INTO country VALUES ('Iceland', 338893, 103000, 'Europe')",
  "INSERT INTO country VALUES ('Andorra', 76953, 468, 'Europe')",
  "INSERT INTO country VALUES ('Monaco', 38897, 202, 'Europe')",
  "INSERT INTO country VALUES ('San Marino', 33557, 61, 'Europe')"
];

countries.forEach((country) => {
  db.query(country, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    }
  });
});

const cities = [
  "INSERT INTO city VALUES ('Amsterdam', 1131690, 'Netherlands')",
  "INSERT INTO city VALUES ('Rotterdam', 1007780, 'Netherlands')",
  "INSERT INTO city VALUES ('The Hague', 474292, 'Netherlands')",
  "INSERT INTO city VALUES ('Utrecht', 290529, 'Netherlands')",
  "INSERT INTO city VALUES ('Eindhoven', 209620, 'Netherlands')",
  "INSERT INTO city VALUES ('Tilburg', 199613, 'Netherlands')",
  "INSERT INTO city VALUES ('Groningen', 181194, 'Netherlands')",
  "INSERT INTO city VALUES ('Almere', 176432, 'Netherlands')",
  "INSERT INTO city VALUES ('Breda', 167673, 'Netherlands')",
  "INSERT INTO city VALUES ('Nijmegen', 158732, 'Netherlands')",
  "INSERT INTO city VALUES ('Enschede', 153655, 'Netherlands')",
  "INSERT INTO city VALUES ('Haarlem', 147590, 'Netherlands')",
  "INSERT INTO city VALUES ('Arnhem', 141674, 'Netherlands')",
  "INSERT INTO city VALUES ('Zaanstad', 140085, 'Netherlands')",
  "INSERT INTO city VALUES ('Amersfoort', 139914, 'Netherlands')",
  "INSERT INTO city VALUES ('Apeldoorn', 136670, 'Netherlands')",
  "INSERT INTO city VALUES ('sHertogenbosch', 134520, 'Netherlands')",
  "INSERT INTO city VALUES ('Hoofddorp', 132734, 'Netherlands')",
  "INSERT INTO city VALUES ('Maastricht', 122378, 'Netherlands')",
  "INSERT INTO city VALUES ('Sao Paulo', 21650181, 'Brazil')",
  "INSERT INTO city VALUES ('Rio de Janeiro', 13293172, 'Brazil')",
  "INSERT INTO city VALUES ('Brasilia', 4469585, 'Brazil')",
  "INSERT INTO city VALUES ('Madrid', 6497124, 'Spain')",
  "INSERT INTO city VALUES ('Barcelona', 5494125, 'Spain')",
  "INSERT INTO city VALUES ('Valencia', 829879, 'Spain')",
  "INSERT INTO city VALUES ('Sevilla', 703206, 'Spain')"
];
cities.forEach((city) => {
  db.query(city, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    }
  });
});

db.end();