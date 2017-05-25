const express = require('express'),
	  app = express(),
	  dbConnect = require('./DB-connection/db-connect.js'),
	  bodyParser = require('body-parser')

const { count, done, notDone, recent, lModified, allDB, insert, modifyData, update, updateSend, deletePage, deleteSend } = require('./actions')

// Connect to the database once.
dbConnect.connection.connect(err => {
            if (err) console.log(`There's an error with connection`)
        })

// set EJS as a view engine, and using body-parser to work with forms.
app.set('view engine', 'ejs');
app.use(bodyParser());

app.get('/', count)
app.get('/count', count)
app.get('/done', done)
app.get('/notdone', notDone)
app.get('/recent', recent)
app.get('/last', lModified)
app.get('/db', allDB)
app.get('/insert', insert)
app.get('/update', update)
app.get('/delete', deletePage)

app.post('/send', modifyData)
app.post('/updateSend', updateSend)
app.post('/deleteSend', deleteSend)
app.listen(8080)