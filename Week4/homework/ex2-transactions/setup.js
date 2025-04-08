import { mongoose } from './db.js';

// Create the schema for the Accounts collection
const accountSchema = new mongoose.Schema({
    account_number: Number,
    balance: Number,
    account_changes: [{
        change_number: Number,
        amount: Number,
        changed_date: Date,
        remark: String
    }]
});

// Create a model using the schema
const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

// Function to seed the database with initial data
export async function seedDatabase() {
    // Delete all existing records from the Accounts collection before seeding
    await Account.deleteMany();
    // Insert initial data into the Accounts collection
    await Account.insertMany([
        {
            account_number: 101,
            balance: 5000,
            account_changes: []
        },
        {
            account_number: 102,
            balance: 2000,
            account_changes: []
        }
    ]);
    console.log("Seeding completed");
}