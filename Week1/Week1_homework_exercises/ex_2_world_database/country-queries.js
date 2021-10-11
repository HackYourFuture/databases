import {
  biggerThan8M,
  biggestSurfaceCountries,
  europeanCountries,
  landCountries,
  netherlandCities,
  populationOfTheWorld,
  rotterdamPeople,
  smallerThan1M,
  top10PopulatedCities,
  top10SurfaceCountry,
} from "./sql-clauses.js";

import { connection } from "./sqlConnect.js";
export const getOverEightMillionPeople = () => {
  connection.query(biggerThan8M, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These countries ${JSON.stringify(
        results
      )} have population higher than 8 millions.`
    );
  });
};

export const getLand = () => {
  connection.query(landCountries, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These countries ${JSON.stringify(results)} contain land in their names.`
    );
  });
};

export const getBetweenPopulation = () => {
  connection.query(smallerThan1M, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These countries ${JSON.stringify(results)} contain land in their names.`
    );
  });
};

export const getEuropeanCountries = () => {
  connection.query(europeanCountries, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`These countries ${JSON.stringify(results)} are from Europe`);
  });
};

export const getDescendentOrder = () => {
  connection.query(biggestSurfaceCountries, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These countries ${JSON.stringify(
        results
      )} are sorted in descendent order according to their Surface Area`
    );
  });
};

export const getNlCities = () => {
  connection.query(netherlandCities, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These cities ${JSON.stringify(results)} belongs to The Netherlands.`
    );
  });
};

export const getRotterdamPopulation = () => {
  connection.query(rotterdamPeople, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `Rotterdam has a population of  ${JSON.stringify(results)} people.`
    );
  });
};

export const getBiggestCountries = () => {
  connection.query(top10SurfaceCountry, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These countries ${JSON.stringify(
        results
      )} are the biggest in surface area. `
    );
  });
};

export const getMostPopulatedCities = () => {
  connection.query(top10PopulatedCities, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `These cities ${JSON.stringify(results)} are the most populated.`
    );
  });
};

export const getWorldPopulation = () => {
  connection.query(populationOfTheWorld, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      `The population of the world is  ${JSON.stringify(results)} People.`
    );
  });
};
