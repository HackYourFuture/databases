import {
  getBetweenPopulation,
  getBiggestCountries,
  getDescendentOrder,
  getEuropeanCountries,
  getLand,
  getMostPopulatedCities,
  getNlCities,
  getOverEightMillionPeople,
  getRotterdamPopulation,
  getWorldPopulation,
} from "./country-queries.js";
import { connection } from "./sqlConnect.js";

connection.connect();
const answerExerciseQuestions = () => {
  //What are the names of countries with population greater than 8 million?
  getOverEightMillionPeople();

  //What are the names of countries that have “land” in their names?
  getLand();

  //What are the names of the cities with population in between 500,000 and 1 million?
  getBetweenPopulation();

  //What's the name of all the countries on the continent ‘Europe’?
  getEuropeanCountries();

  //List all the countries in the descending order of their surface areas.
  getDescendentOrder();

  //What are the names of all the cities in the Netherlands?
  getNlCities();

  //What is the population of Rotterdam?
  getRotterdamPopulation();

  //What's the top 10 countries by Surface Area?
  getBiggestCountries();

  //What's the top 10 most populated cities?
  getMostPopulatedCities();

  //What is the population number of the world?
  getWorldPopulation();
};

answerExerciseQuestions();
connection.end();
