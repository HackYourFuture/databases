'use strict';

module.exports = app => {
  const toDoApp = require('./appController');

  // todoList Routes
  // for a todo
  app
    .route('/users/:userId/:toDoListId/:toDoId')
    .get(toDoApp.readAToDo)
    .post(toDoApp.createAToDo)
    .delete(toDoApp.deleteAToDo)
    .put(toDoApp.updateAToDo);

  app.route('/users/:userId/:toDoListId/:toDos').get(toDoApp.readAllToDo);

  app.route('/users/:userId/:toDoListId/:toDoId/:completed').put(toDoApp.markAsDone);

  // for todo list
  app
    .route('/users/:userId/:toDoListId')
    .get(toDoApp.listAllToDoList)
    .post(toDoApp.createAToDoList)
    .delete(toDoApp.deleteAToDoList);

  // for a user
  app.route('/users/:userId').post(toDoApp.createAUser);

  // for users
  app.route('/users').get(toDoApp.listAllUsers);

  // for a user
  // app
  //   .route('/users/:userId')
  //   .get(toDoApp.readUser)
  //   .post(toDoApp.createAUser)
  //   .delete(toDoApp.deleteAUser);

  // for all users
  //   app
  //     .route('/users')
  //     .get(toDoApp.listAllUsers)
  //     .delete(toDoApp.deleteAllUsers);
};
