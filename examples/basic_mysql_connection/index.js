const express = require('express'),
	  app = express()

const { count, done, notDone, recent, added, all } = require('./actions')

app.get('/count', count)
app.get('/done', done)
app.get('/notdone', notDone)
app.get('/recent', recent)
app.get('/added', added)
app.get('/all', all)

app.listen(1033)
