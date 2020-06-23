// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'epic_todolist'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },

};
