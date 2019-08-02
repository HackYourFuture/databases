const Express = require('express');

const { getCapitalOfCountry, getLanguagesOfRegion, isOfficial, totalLanguages, totalCities } = require('./src/part1');

const app = new Express();

app.use(Express.json());

app.get('/01', getCapitalOfCountry);
app.get('/02', getLanguagesOfRegion);
app.get('/03', totalCities);
app.get('/04', isOfficial);
app.get('/05', totalLanguages);

app.listen(3333, err => {
  if (err) return console.log(err);

  console.log('Server listening: http://localhost:3333');
});
