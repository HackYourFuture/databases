import { MongoClient } from "mongodb";

import * as dotenv from "dotenv";
dotenv.config();
import { setup } from "./setup.js";
import { transfer } from "./transfer.js";

async function main() {
	const client = new MongoClient(process.env.MONGODB_URL);
	try {
		await client.connect();

		// Make the appropriate DB calls
		await setup(client);
        await transfer(client,101,102,500);
        await transfer(client,101,102,200);
        await transfer(client,102,101,30);
	} finally {
		// Close the connection to the MongoDB cluster
		await client.close();
	}
}
main().catch(console.error);
