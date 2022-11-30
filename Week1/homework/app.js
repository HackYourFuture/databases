import express, { query } from "express";
import mysql from "mysql";
import {
  queries,
  populationOfRotterdam,
  topSurfaceCountries,
  topCityPopulation,
  sumWorldPopulation,
} from "./queries.js";
import {
  includingland,
  cityPopulation,
  countiesOnEu,
  surfaceAreas,
  citiesInNetherlands,
} from "./queries.js";

// creating connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

// conncet and test connection
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const invitee_array = [
  { invitee_name: "Sami", invited_by: "Jone" },
  { invitee_name: "Salem", invited_by: "Ali" },
  { invitee_name: "Rob", invited_by: "Fede" },
  { invitee_name: "Heba", invited_by: "Anna" },
  { invitee_name: "Yasser", invited_by: "Ahmed" },
];

const room_array = [
  { room_name: "Living_room", floor_number: "2" },
  { room_name: "Sleeping_room", floor_number: "3" },
  { room_name: "Computer_room", floor_number: "2" },
  { room_name: "Studying_room", floor_number: "2" },
  { room_name: "Meeting_room", floor_number: "1" },
];

// creating database
app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE meetup";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database was created");
  });
});

// creating Invitee table
app.get("/createinviteetable", (req, res) => {
  const sql =
    "CREATE TABLE Invitee(invitee_no int AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY(invitee_no))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Invitee table was created...");
  });
});

// creating Room table
app.get("/createroomtable", (req, res) => {
  const sql =
    "CREATE TABLE Room (room_no int AUTO_INCREMENT, room_name VARCHAR(255), floor_number int, PRIMARY KEY(room_no))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Room table was created...");
  });
});

// Inserting data to Invitee table
app.get("/addtoinviteetable", (req, res) => {
  for (let i = 0; i < 5; i++) {
    let invitee_data = invitee_array[i];
    let sql = "INSERT INTO Invitee SET ?";
    let query = connection.query(sql, invitee_data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }
  res.send("5 records were added to Invitee table...");
});

// Inserting data to Room table
app.get("/addtoroomtable", (req, res) => {
  for (let i = 0; i < 5; i++) {
    let room_data = room_array[i];
    let sql = "INSERT INTO Room SET ?";
    let query = connection.query(sql, room_data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }
  res.send("5 records were added to Room table...");
});

// quries of population with more 8 million
app.get("/querypopulation", queries);

// quries name of country containing land
app.get("/queryland", includingland);

// quries name of cities having population between 500000 and 1 million
app.get("/querycities", cityPopulation);

// Select contries on  the continent ‘Europe’
app.get("/conutriesoneu", countiesOnEu);

// List all the countries in the descending order of their surface areas.’
app.get("/countriesarea", surfaceAreas);

// names of all the cities in the Netherlands?
app.get("/citiesinnld", citiesInNetherlands);

//the population of Rotterdam
app.get("/rotterdampopulation", populationOfRotterdam);

// top 10 countries by Surface Area?
app.get("/top10sizecountries", topSurfaceCountries);

// top 10 most populated cities
app.get("/topcitypopulation", topCityPopulation);

//the population number of the world
app.get("/sumworldpopulation", sumWorldPopulation);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
