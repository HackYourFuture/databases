var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'new_world',
});

connection.query(
  `SELECT countrylanguage.CountryCode AS code, country.Name, COUNT(countrylanguage.language) AS total FROM countrylanguage JOIN country ON countrylanguage.CountryCode = country.Code GROUP BY (countrylanguage.CountryCode) `,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    const countryCode = 'USA';
    const Language = 'Del1';
    const IsOfficial = 'T';
    const Percentage = 8.3;

    const filteredLang = results.filter(result => result.code === countryCode);
    filteredLang.forEach(lang => {
      if (lang.total >= 10) {
        console.log(`Sorry this country can't has 10 languages or more`);
      } else {
        insertQuery(countryCode, Language, IsOfficial, Percentage);
      }
    });
  }
);

const insertQuery = (countryCode, Language, IsOfficial, Percentage) => {
  let insert_queries = [
    `INSERT INTO countrylanguage VALUES ('${countryCode}', '${Language}', '${IsOfficial}', ${Percentage})`,
  ];

  for (let i in insert_queries) {
    console.log('Going to run ', insert_queries[i]);
    connection.query(insert_queries[i], function(error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('the reply is ', results[0]);
    });
  }
};
