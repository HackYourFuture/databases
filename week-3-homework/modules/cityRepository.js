const database = require('./database');

// Each of this repositories contain the way to extract data from a particular entity
// It is the so-called Repository Pattern

// Function that returns all the cities
async function  getCities() {
    return database.query('SELECT * from city order by ID desc');
};

// Function that returns all the cities taking as parameters order by and page size
async function  getCities(orderBy, pageSize) {
    let sql = 'SELECT * from city' ;
    if (orderBy != null && orderBy > 0 ) {
        sql += ' order by ' + orderBy;
    }
     if (pageSize != null && pageSize > 0 ) {
        sql += ' LIMIT ' + pageSize;
    } 
    return database.query(sql);
};

// asks the database for specific city by it's id
async function  findCityById(id) {
    let findSql = 'select * from city where ID = ?'; // ? is equal to placeholder
    return database.query(findSql, id);
};

// Dangerous find city by name -> can be attacked
async function  findCityByName(name) {
    let findByName = "SELECT * from city where  name like '" + name + "' order by ID desc"; // ? is equal to placeholder
    return database.query(findByName);
};

// deletes a city by id
async function  deleteCityByID(id) {
    let deleteStatement = 'delete from city where id = ? '; // ? is equal to placeholder
    return database.query(deleteStatement, id);
};

// correct way of implementing it with a ? -> what we call a prepared statement
async function  findCityByNameSanitize(name) {
    let findByName = "SELECT * from city where name like ? order by ID desc"; // ? is equal to placeholder
    return database.query(findByName, name);
};

// updates a city by Id. 
async function updateCity(data) {
    var updateSQL = "UPDATE city set Name = ?, CountryCode = ?, Population = ?, District = ? where ID = ?" ; 
    return database.query(updateSQL, data); 
};

// inserts (creates a new city with the parameters passed in the data array)
async function insertCity(data) {
    var insertSQL = "INSERT INTO city (Name, CountryCode, Population, District) VALUES (?, ?, ?, ?)";
    return database.query(insertSQL, data); 
}

// Madrid is a view on top of city
async function  getMadridCities() {
    return database.query('SELECT * from madridCity order by population desc');
};


// we export the important methods
module.exports = {
  getCities, deleteCityByID, findCityById, findCityByName,findCityByNameSanitize, updateCity, insertCity, getMadridCities
};