const express = require('express'),
	  app = express()

const { count, done, notDone, recent, lModified, allDB } = require('./actions')

app.set('view engine', 'ejs');

app.get('/', count)
app.get('/count', count)
app.get('/done', done)
app.get('/notdone', notDone)
app.get('/recent', recent)
app.get('/last', lModified)
app.get('/db', allDB)

app.listen(8080)