const mysql = require('mysql'),
    fs = require('fs')

class DB {

    constructor () {
     this.config = JSON.parse(fs.readFileSync(`${__dirname}/config-secret.json`))
     this.connection = mysql.createConnection({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            port: this.config.port,
            database: this.config.database
        })
    }
}
module.exports = new DB();