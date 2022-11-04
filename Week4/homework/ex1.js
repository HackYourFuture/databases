import { MongoClient } from "mongodb";

import * as dotenv from "dotenv";
dotenv.config(); // make node work with .env file

/**
 * Importing csv using mongoimport tool in terminal
 *
 * mongoimport --uri="mongodb+srv://<username>:<password>@<cluster>.xi8iggm.mongodb.net/databaseWeek4?retryWrites=true&w=majority" --type=csv -v --db=databaseWeek4 --collection=countries --file=ex1-aggregation/population_pyramid_1950-2022.csv --headerline
 */

async function main() {
	const client = new MongoClient(process.env.MONGODB_URL);

	try {
		await client.connect();

		// Make the appropriate DB calls
		await getPopulationByCountry(client, "Germany");

        await getAllByYearAndAge(client,1950,"0-4")
	} finally {
		// Close the connection to the MongoDB cluster
		await client.close();
	}
}

main().catch(console.error);

async function getPopulationByCountry(client, country) {
	const pipeline = [
		{
			$match: {
				Country: country,
			},
		},
		{
			$group: {
				_id: "$Year",
				countPopulation: {
					$sum: {
						$add: ["$F", "$M"],
					},
				},
			},
		},
	];

	const aggCursor = client
		.db("databaseWeek4")
		.collection("countries")
		.aggregate(pipeline);

	await aggCursor.forEach((item) => {
		console.log(`${item._id}: ${item.countPopulation}`);
	});
}



async function getAllByYearAndAge(client,year,age) {
	const pipeline =[
        {
          '$match': {
            'Year': year, 
            'Age': age, 
            'Country': {
              '$in': [
                'AFRICA', 'ASIA', 'EUROPE', 'NORTHERN AMERICA', 'LATIN AMERICA AND THE CARIBBEAN', 'OCEANIA'
              ]
            }
          }
        }, {
          '$addFields': {
            'TotalPopulation': {
              '$sum': {
                '$add': [
                  '$F', '$M'
                ]
              }
            }
          }
        }
      ]

	const aggCursor = client
		.db("databaseWeek4")
		.collection("countries")
		.aggregate(pipeline);

	await aggCursor.forEach((item) => {
		console.log(item);
	});
}


