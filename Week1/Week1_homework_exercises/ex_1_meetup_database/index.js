import { connection } from "./connection.js";
import {
  getInviteTable,
  getMeetingTable,
  getRoomTables,
  populateInvitee,
  populateMeeting,
  populateRoom,
} from "./queries.js";

connection.connect();

const creatingTables = () => {
  getInviteTable();
  getMeetingTable();
  getRoomTables();
};
const updatingTables = () => {
  populateInvitee();
  populateMeeting();
  populateRoom();
};

creatingTables();
updatingTables();

connection.end();
