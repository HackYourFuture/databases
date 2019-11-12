class User {
  constructor(id, username) {
    this._id = id;
    this._username = username;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set username(username) {
    this._username = username;
  }

  get username() {
    return this._username;
  }
}

module.exports = new User();
