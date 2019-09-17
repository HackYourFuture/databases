'use strict';

const connection = require('./connectDatabase');
const prompt = require('./prompt').prompt;

const answer = async (q, ques1, ques2) => {
  try {
    let ans1, ans2;
    if (ques1 !== undefined) {
      ans1 = await prompt(ques1);
    }
    if (ques2 !== undefined) {
      ans2 = await prompt(ques2);
    }
    const results = await connection.query(q, [ans1, ans2]);
    if (results.length) {
      results.forEach(result => {
        console.log(JSON.parse(JSON.stringify(result)));
      });
      return;
    }
    console.log('Not found');
  } catch (e) {
    console.log(e.stack);
  } finally {
    await connection.end();
  }
};

const q1 = `SELECT C.Name , T.Name
FROM country C
JOIN city T
   ON C.Capital = T.ID
WHERE C.Name = ?`;

const q2 = `SELECT L.Language
FROM country C
JOIN countrylanguage L
   ON C.Code = L.CountryCode 
WHERE C.Region = ?
GROUP BY L.Language`;

const q3 = ` SELECT COUNT(*) as Number
FROM city T
JOIN countrylanguage L
    ON T.CountryCode = L.CountryCode
WHERE L.Language = ?`;

const q4 = ` 
SELECT DISTINCT C.Name
FROM country C                  
JOIN countrylanguage L 
    ON L.CountryCode = C.Code
WHERE L.IsOfficial = 'T' AND C.Region = ? AND L.Language = ?`;

const q5 = ` SELECT C.Continent, COUNT(DISTINCT L.Language) Number
FROM country C                  
JOIN countrylanguage L 
    ON L.CountryCode = C.Code
GROUP BY C.Continent;`;

module.exports = { answer, q1, q2, q3, q4, q5 };
