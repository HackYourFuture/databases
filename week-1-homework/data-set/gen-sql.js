'use strict'

const fs = require('fs')

const filenames = [
    'car_makers',
    'car_names',
    'cars_data',
    'continents',
    'countries',
    'models'
]

for (const filename of filenames) {

    const contents = fs.readFileSync(`${__dirname}/${filename}.csv`, 'utf8')

    const entries = contents.split(/\r?\n/g)
    const header = entries.shift()

    let insertStatement =
`INSERT INTO ${filename} (${header})
VALUES
`

    for (const entry of entries) {
        if (!entry) {
            continue
        }
        insertStatement += `(${entry}),\n`
    }

    console.log(insertStatement)
    console.log()
}
