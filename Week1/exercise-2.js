const MySQL = require('mysql');

const connection = MySQL.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const useDatabase = 'USE world;';

const countriesPopulation =
  'SELECT name FROM country where population > 8000000;';

const findingCountries = 'SELECT name FROM country where name LIKE "%land%";';

const findingCountriesAccordingToPopulation =
  'SELECT name FROM city WHERE population BETWEEN 500000 and 1000000;';

const nameOfEuropeCountries =
  'SELECT name FROM country WHERE Continent = "Europe";';

const countriesSortAccordingToSurfaceArea =
  'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;';

const getCitiesNameInNetherlands =
  'SELECT name FROM city WHERE countrycode = "NLD";';

const getRotterdamPopulation =
  'SELECT name, population FROM city WHERE name = "Rotterdam";';

const TopCountriesBySurfaceArea =
  'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;';

const MostPopulatedCities =
  'SELECT name, population FROM city ORDER BY population DESC LIMIT 10;';

const MostPopulatedNumberOfTheWorld = 'SELECT sum(population) FROM country;';

const useDatabases = () => {
  connection.query(useDatabase, (err, res) => {
    err ? console.log(err) : console.log(res, 'Database used');
  });
};

const countriesPopulations = () => {
  connection.query(countriesPopulation, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'countries with population greater than 8 million');
  });
};

const findCountries = () => {
  connection.query(findingCountries, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'countries having "Land" in their name');
  });
};

const CountriesPopulation = () => {
  connection.query(findingCountriesAccordingToPopulation, (err, res) => {
    err
      ? console.log(err)
      : console.log(
          res,
          'cities with population in between 500,000 and 1 million',
        );
  });
};

const EuropeCountries = () => {
  connection.query(nameOfEuropeCountries, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'name of all the countries in Europe');
  });
};

const countriesSurfaceArea = () => {
  connection.query(countriesSortAccordingToSurfaceArea, (err, res) => {
    err
      ? console.log(err)
      : console.log(
          res,
          'countries sorted in the descending order of their surface areas',
        );
  });
};

const netherlandsCityNames = () => {
  connection.query(getCitiesNameInNetherlands, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'the names of all the cities in the Netherlands');
  });
};

const rotterdamPopulation = () => {
  connection.query(getRotterdamPopulation, (err, res) => {
    err ? console.log(err) : console.log(res, 'the population of Rotterdam');
  });
};

const topCountriesSurfaceArea = () => {
  connection.query(TopCountriesBySurfaceArea, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'the top 10 countries by Surface Area');
  });
};

const populatedCities = () => {
  connection.query(MostPopulatedCities, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'the top 10 most populated cities');
  });
};

const populatedNumberOfTheWorld = () => {
  connection.query(MostPopulatedNumberOfTheWorld, (err, res) => {
    err
      ? console.log(err)
      : console.log(res, 'the population number of the world');
  });
};

connection.connect();

useDatabases();
countriesPopulations();
findCountries();
CountriesPopulation();
EuropeCountries();
countriesSurfaceArea();
netherlandsCityNames();
rotterdamPopulation();
topCountriesSurfaceArea();
populatedCities();
populatedNumberOfTheWorld();

connection.end();
