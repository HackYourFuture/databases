// Import required modules
import mongoose from 'mongoose';
import { importCSV, getTotalPopulationPerYear, getContinentDataWithTotalPopulation } from './aggregation.js';

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/databaseWeek4");
        console.log("Connected to MongoDB");

        // Step 1 (Optional): Import CSV
        await importCSV();

        // Step 2: Total population per year
        await getTotalPopulationPerYear("Netherlands");

        // Step 3: Total population per continent for a year and age group
        await getContinentDataWithTotalPopulation(2020, "100+");

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}
main();