'use strict';

const Todo = require('./appModel').Todo;
const List = require('./appModel').List;
const Users = require('./appModel').Users;

// todo functions

exports.readAToDo = (req, res) => {
  Todo.getToDoById(req.params.toDoId, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
};

exports.createAToDo = (req, res) => {
  const newToDo = new Todo(req.body);
  //handles null error
  if (!newToDo.Name || !newToDo.ListID) {
    res.status(400).send({ error: true, message: 'Please provide todo name' });
  } else {
    Todo.createToDo(newToDo, (err, todo) => {
      if (err) res.send(err);
      res.json(todo);
    });
  }
};

exports.readAllToDo = (req, res) => {
  Todo.getAllToDo((err, toDos) => {
    // console.log('controller');
    if (err) res.send(err);
    // console.log('res', toDos);
    res.send(toDos);
  });
};

exports.deleteAToDo = (req, res) => {
  Todo.removeToDo(req.params.toDoId, err => {
    if (err) res.send(err);
    res.json({ message: 'Todo successfully deleted' });
  });
};

exports.updateAToDo = (req, res) => {
  Todo.updateToDoById(req.params.toDoId, new Todo(req.body), (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
};

exports.markAsDone = (req, res) => {
  Todo.completeToDo(req.params.toDoId, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
};

// todo list functions

exports.listAllToDoList = (req, res) => {
  List.getAllToDoList((err, toDoList) => {
    // console.log('controller');
    if (err) res.send(err);
    // console.log('res', toDoList);
    res.send(toDoList);
  });
};

exports.createAToDoList = (req, res) => {
  const newToDoList = new List(req.body);

  //handles null error
  if (!newToDoList.userId || !newToDoList.toDoList || !newToDoList.reminder) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide userID, user name and a reminder date' });
  } else {
    List.createToDoList(newToDoList, (err, toDoList) => {
      if (err) res.send(err);
      res.json(toDoList);
    });
  }
};

exports.deleteAToDoList = function(req, res) {
  List.removeToDoList(req.params.toDoListId, err => {
    if (err) res.send(err);
    res.json({ message: 'Todo list successfully deleted' });
  });
};

// user functions

exports.createAUser = (req, res) => {
  const newUser = new Users(req.body);

  //handles null error
  if (!newUser.user) {
    res.status(400).send({ error: true, message: 'Please provide a user name' });
  } else {
    Users.createUser(newUser, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  }
};

exports.listAllUsers = (req, res) => {
  Users.getAllUsers((err, users) => {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', users);
    res.send(users);
  });
};
