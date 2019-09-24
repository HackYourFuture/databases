const question1 = `
SELECT
   country.name AS country,
   city.name AS capital 
FROM
   city,
   country 
WHERE
   country.capital = city.id 
   AND country.name = ? `;

const question2 = `
   SELECT
      countrylanguage.language AS language 
   FROM
      country,
      countrylanguage 
   WHERE
      countrylanguage.countrycode = country.code 
      AND country.region = ? 
   GROUP BY
      language 
   ORDER BY
      language`;

const question3 = `
      SELECT
        countrylanguage.language,
        COUNT(city.name) as total_cities 
      FROM
        country,
        city,
        countrylanguage 
      WHERE
        country.code = city.countrycode 
        AND country.code = countrylanguage.countrycode 
        AND countrylanguage.language = ? 
      GROUP BY
        language`;

const question4 = `SELECT
        region,
        language,
        country.name AS country,
        isofficial as officialOrNot
     FROM
        country,
        countrylanguage
     WHERE
        countrylanguage.isOfficial = 'T'
        AND
        countrylanguage.countrycode = country.code
        AND region = ?
        AND language = ? `;

const question5 = `
        SELECT
           continent,
           count(DISTINCT language) AS total_spoken_language 
        FROM
           country,
           countrylanguage 
        WHERE
           countrylanguage.countrycode = country.code 
        GROUP BY
           continent 
        ORDER BY
           total_spoken_language DESC`;

module.exports = { question1, question2, question3, question4, question5 };
