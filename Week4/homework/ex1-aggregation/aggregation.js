// aggregation.js
import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';

const populationSchema = new mongoose.Schema({
    Country: String,
    Year: Number,
    Age: String,
    M: Number,
    F: Number
});

const Population = mongoose.model('Population', populationSchema);

// Way to get the data in the csv file into your MongoDB database
export async function importCSV() {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream('./population_pyramid_1950-2022.csv')
            .pipe(csv())
            .on('data', (data) => {
                results.push({
                    Country: data.Country,
                    Year: Number(data.Year),
                    Age: data.Age,
                    M: Number(data.M),
                    F: Number(data.F)
                });
            })
            .on('end', async () => {
                await Population.insertMany(results);
                console.log("CSV Imported");
                resolve();
            })
            .on('error', reject);
    });
}

/* Write a function that will return the array of the
 total population (M + F over all age groups) for a given per year.*/
export async function getTotalPopulationPerYear(country) {
    const result = await Population.aggregate([
        { $match: { Country: country } },
        { $group: { _id: "$Year", countPopulation: { $sum: { $add: ["$M", "$F"] } } } },
        { $sort: { _id: 1 } }
    ]);
    console.log(result);
}

/*Write a function that will return all the information of each 
continent for a given and field but add 
a new field that will be the addition of and .*/
export async function getContinentDataWithTotalPopulation(year, age) {
    const result = await Population.aggregate([
        { $match: { Year: year, Age: age } },
        { $addFields: { TotalPopulation: { $add: ["$M", "$F"] } } }
    ]);
    console.log(result);
}