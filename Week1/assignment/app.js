import express from 'express';
const app = express();

/* Exercise 1: */
import { createInvitee, getInvitee } from './db/invitee.js';
import { createRoom, getRoom } from './db/room.js';
import { createMeeting, getMeeting } from './db/meeting.js';

const invitee = {
  invitee_no: 1,
  invitee_name: 'John Doe',
  invited_by: 'Jane Doe',
};

const room = {
  room_no: 1,
  room_name: 'Meeting Room 1',
  floor_number: 1,
};

const meeting = {
  meeting_no: 1,
  meeting_title: 'Team Meeting',
  starting_time: '2021-01-01 09:00:00',
  ending_time: '2021-01-01 10:00:00',
  room_no: 1,
};

createInvitee(invitee)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

createRoom(room)
  .then((result) => {
    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });

createMeeting(meeting)
  .then((result) => {
    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });

getInvitee(1)
  .then((result) => {
    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });

getRoom(1)
  .then((result) => {
    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });

getMeeting(1)
  .then((result) => {
    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });

/* Exercise 2: */
import {
  getCountryWithPopulationGreaterThan8Million,
  getCountryWithLandInName,
  getCitiesWithPopulationBetween500kAnd1M,
  getCountriesInEurope,
  getCountriesBySurfaceArea,
  getCitiesInNetherlands,
  getPopulationOfRotterdam,
  getTop10CountriesBySurfaceArea,
  getTop10MostPopulatedCities,
  getPopulationOfTheWorld,
} from './db/world_DB_exercise2.js';

getCountryWithPopulationGreaterThan8Million()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getCountryWithLandInName()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getCitiesWithPopulationBetween500kAnd1M()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getCountriesInEurope()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getCountriesBySurfaceArea()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getCitiesInNetherlands()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getPopulationOfRotterdam()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getTop10CountriesBySurfaceArea()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getTop10MostPopulatedCities()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

getPopulationOfTheWorld()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
