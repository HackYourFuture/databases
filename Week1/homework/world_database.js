'use strict';

const countries = [
  {
    country_name: 'Russia',
    country_code: 49,
    country_population: 143895551,
    continent: 'Europe',
    surface_areas: 17098246,
  },
  {
    country_name: 'Germany',
    country_code: 7,
    country_population: 82438639,
    continent: 'Europe',
    surface_areas: 357021,
  },
  {
    country_name: 'UK',
    country_code: 44,
    country_population: 66959016,
    continent: 'Europe',
    surface_areas: 243610,
  },
  {
    country_name: 'France',
    country_code: 33,
    country_population: 65480710,
    continent: 'Europe',
    surface_areas: 547030,
  },
  {
    country_name: 'Italy',
    country_code: 39,
    country_population: 59216525,
    continent: 'Europe',
    surface_areas: 301230,
  },
  {
    country_name: 'Ukraine',
    country_code: 380,
    country_population: 43795220,
    continent: 'Europe',
    surface_areas: 603628,
  },
  {
    country_name: 'Spain',
    country_code: 34,
    country_population: 46441049,
    continent: 'Europe',
    surface_areas: 504781,
  },
  {
    country_name: 'Poland',
    country_code: 48,
    country_population: 38028278,
    continent: 'Europe',
    surface_areas: 312685,
  },
  {
    country_name: 'Netherlands',
    country_code: 31,
    country_population: 17132908,
    continent: 'Europe',
    surface_areas: 41526,
  },
  {
    country_name: 'Romania',
    country_code: 40,
    country_population: 19483360,
    continent: 'Europe',
    surface_areas: 238391,
  },
  {
    country_name: 'China',
    country_code: 86,
    country_population: 1387160730,
    continent: 'Asia',
    surface_areas: 35980,
  },
  {
    country_name: 'India',
    country_code: 91,
    country_population: 1324009090,
    continent: 'Asia',
    surface_areas: 3287590,
  },
  {
    country_name: 'Indonesia',
    country_code: 62,
    country_population: 255462000,
    continent: 'Asia',
    surface_areas: 1919440,
  },
  {
    country_name: 'Pakistan',
    country_code: 92,
    country_population: 202785000,
    continent: 'Asia',
    surface_areas: 803940,
  },
  {
    country_name: 'Bangladesh',
    country_code: 880,
    country_population: 158762000,
    continent: 'Asia',
    surface_areas: 144000,
  },
];

const cities = [
  {
    city_name: 'Vienna',
    country_Abbreviation_code: 'AUT',
    city_population: 1900547,
  },
  {
    city_name: 'Zurich',
    country_Abbreviation_code: 'CHE',
    city_population: 1370779,
  },
  {
    city_name: 'Auckland',
    country_Abbreviation_code: 'NZL',
    city_population: 1556875,
  },
  {
    city_name: 'Munich',
    country_Abbreviation_code: 'DEU',
    city_population: 1503708,
  },
  {
    city_name: 'Vancouver',
    country_Abbreviation_code: 'CAN',
    city_population: 2555884,
  },
  {
    city_name: 'Dusseldorf',
    country_Abbreviation_code: 'DEU',
    city_population: 624876,
  },
  {
    city_name: 'Frankfort',
    country_Abbreviation_code: 'DEU',
    city_population: 759657,
  },
  {
    city_name: 'Geneva',
    country_Abbreviation_code: 'CHE',
    city_population: 198979,
  },
  {
    city_name: 'Copenhagen',
    country_Abbreviation_code: 'DNK',
    city_population: 1320826,
  },
  {
    city_name: 'Basel',
    country_Abbreviation_code: 'CHE',
    city_population: 171017,
  },
  {
    city_name: 'Sydney',
    country_Abbreviation_code: 'AUS',
    city_population: 4859432,
  },
  {
    city_name: 'Amsterdam',
    country_Abbreviation_code: 'NLD',
    city_population: 1131690,
  },
  {
    city_name: 'Berlin',
    country_Abbreviation_code: 'DEU',
    city_population: 3556792,
  },
  {
    city_name: 'Bern',
    country_Abbreviation_code: 'CHE',
    city_population: 133115,
  },
  {
    city_name: 'Wellington',
    country_Abbreviation_code: 'NZL',
    city_population: 207900,
  },
  {
    city_name: 'Rotterdam',
    country_Abbreviation_code: 'NLD',
    city_population: 623652,
  },
];

module.exports = { countries, cities };
