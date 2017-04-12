const mysql = require('mysql'),
    fs = require('fs')

class DB {

    config() {
        var config = JSON.parse(fs.readFileSync(`${__dirname}/config-secret.json`))
        return config
    }

    connection() {
      var connection = mysql.createConnection({
            host: this.config().host,
            user: this.config().user,
            password: this.config().password,
            port: this.config().port,
            database: this.config().database
        })
        return connection
    }

    connectToDB() {
        this.connection().connect(err => {
            if (err) console.log(`There's an error with connection`)
        })
    }
}

module.exports = new DB();