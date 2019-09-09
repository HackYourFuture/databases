const database = require('./database');

// Each of this repositories contain the way to extract data from a particular entity
// It is the so-called Repository Pattern

// function to asynchronously retrieve all countries order by their code in ascending order
async function  getCountries() {
    return database.query('SELECT * from country order by code asc');
};

// function to asynchronously retrieve all countries order by their code (PK) 
async function  getCountryByCode(countryCode) {
    return database.query('SELECT * from country where Code = ?', countryCode);
};

// returns the diffferenct country codes, normally they should be distinct since it is the key
async function  getDistinctCountryCodes() {
    return database.query('SELECT DISTINCT code FROM country order by CODE');
};

// function that retrieves both code and name from the countries table
async function  getDistinctCountryCodesAndNames() {
    return database.query('SELECT DISTINCT code, name FROM country order by CODE');
};

module.exports = {
  getCountries, getCountryByCode, getDistinctCountryCodes, getDistinctCountryCodesAndNames
};