import { connection } from "./connection.js";
import {
  insertInvitee,
  insertMeeting,
  insertRoom,
  inviteeTable,
  inviteeValues,
  meetingTable,
  meetingValues,
  roomTable,
  roomValues,
} from "./sql_commands.js";

export const getInviteTable = () => {
  connection.query(inviteeTable, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`The reply is ${results[0]}`);
  });
};

export const getMeetingTable = () => {
  connection.query(meetingTable, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`The next reply is ${results[0]}`);
  });
};
export const getRoomTables = () => {
  connection.query(roomTable, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`The last reply is ${results[0]}`);
  });
};

export const populateInvitee = () => {
  connection.query(insertInvitee, [inviteeValues], (error, results) => {
    if (error) {
      throw error;
    }
    results;
  });
};
export const populateRoom = () => {
  connection.query(insertRoom, [roomValues], (error, results) => {
    if (error) {
      throw error;
    }
    results;
  });
};
export const populateMeeting = () => {
  connection.query(insertMeeting, [meetingValues], (error, results) => {
    if (error) {
      throw error;
    }
    results;
  });
};
