const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

const insertInto = 'INSERT INTO `city` (Name, CountryCode, District, Population) VALUES ?';

const cities = [
  ['Kabul', 'AFG', 'Kabol', 1780000],
  ['Las Vegas', 'USA', 'Nevada', 641676],
  ['St Petersburg', 'RUS', 'Pietari', 4991000],
  ['Kimitsu', 'JPN', 'Chiba', 1386000],
  ['Oshawa', 'CAN', 'Ontario', 994837],
  ['Modinagar', 'IND', 'Uttar Pradesh', 130325],
  ['Rotterdam', 'NLD', 'Zuid-Holland', 623652],
  ['Groningen', 'NLD', 'Groningen', 200336],
  ['Yonkers', 'USA', 'New York', 202019],
  ['Erzurum', 'TUR', 'Erzurum', 361235],
  ['Tampere', 'FIN', 'Pirkanmaa', 226996],
  ['Haarlem', 'NLD', 'Noord-Holland', 156645],
  ['Erlangen', 'DEU', 'Baijeri', 108336],
  ['Leiden', 'NLD', 'Zuid-Holland', 121562],
  ['Shanghai', 'CHN', 'Shanghai', 24240000],
  ['Amman', 'JOR', 'Amman', 4008000],
  ['Hadano', 'JPN', 'Kanagawa', 167378],
];

connection.query(insertInto, [cities], (error, results, fields) => {
  if (error) {
    return console.log(err.message);
  }
  console.log('Row inserted ', results.affectedRows);
});

connection.end();
