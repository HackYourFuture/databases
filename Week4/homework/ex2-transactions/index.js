import { connectDB } from './db.js';
import { seedDatabase } from './setup.js';
import { transferFunds } from './transfer.js';

// Main function to connect to the database, seed it, and perform a fund transfer
(async () => {
  try {
    await connectDB();
    console.log("DB Connection fully established");

    await seedDatabase();
    console.log("Seeding completed");

    await transferFunds(101, 102, 1000, 'Transfer to account 102');
    console.log("Transfer completed successfully");
  } catch (err) {
    console.error("Error:", err.message);
  }
})();