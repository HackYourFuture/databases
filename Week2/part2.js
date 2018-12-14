
// ====== Homework Part2 ======
// The code down below should be written inside CLI

/*
CREATE TRIGGER trigger1 AFTER INSERT ON countryLanguage FOR EACH ROW
BEGIN
IF (SELECT COUNT(Language) FROM countryLanguage WHERE countryCode = NEW.countryCode) >= 10
THEN SIGNAL SQLSTATE '40000' SET MESSAGE_TEXT = 'Worning: The number languages is above 9';
END IF;
END;//
*/






























const util = require("util");
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

const execQuery = util.promisify(con.query.bind(con));

async function main() {

  const languages = [
    {
      countryCode: "ABW",
      Language: "Sanskrit",
      isOfficial: "f",
      percentage: 5.5
    },
    {
      countryCode: "IDN",
      Language: "Sanskrit",
      isOfficial: "f",
      percentage: 100
    },
    {
      countryCode: "AUS",
      Language: "Sanskrit",
      isOfficial: "f",
      percentage: 5.5
    },
    {
      countryCode: "JPN",
      Language: "Sanskrit",
      isOfficial: "f",
      percentage: 5.5
    }
  ];

  function printAnswer(results, i) {
    console.log("=====  Answer " + i + " =====");
    results.forEach(result => {
      for (let el in result) {
        console.log(result[el]);
      }
    });
  }

  con.connect(err => console.log(err ? err.stack : "connected..."));

  try {
    for (let i = 0; i < languages.length; i++) {
      let result = await execQuery("INSERT INTO countryLanguage SET ?", languages[i]);
      console.log(result);
      // printAnswer(result, 1);
    }
  } catch (err) {
    console.log(err.message);
  }

  con.end(err => console.log(err ? err : "disconnected."));
}


main();

// languages.forEach(async lang => {
//   let result = await execQuery("INSERT INTO countryLanguage SET ?", lang);
//   console.log(result);
// });