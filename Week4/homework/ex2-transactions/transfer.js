import { mongoose } from './db.js';

const Account = mongoose.models.Account;

// Define an async funcction to trnsfer funds between accounts
export async function transferFunds(from, to, amount, remark) {
    // Start MongoDB session (required for the transaction)
    const session = await mongoose.startSession();
    session.startTransaction(); // Begin the transaction

    try {
        // Find the source account
        const fromAccount = await Account.findOne({ account_number: from }).session(session);
        // Find the destination account
        const toAccount = await Account.findOne({ account_number: to }).session(session);

        // Check if both accounts exist and if the source account has sufficient balance
        if (!fromAccount || !toAccount) throw new Error("One or both accounts not found.");
        if (fromAccount.balance < amount) throw new Error("Insufficient balance.");

        // Perform the fund transfer
        fromAccount.balance -= amount;
        toAccount.balance += amount;
       
         //Reocrd transaction in source account's history
        fromAccount.account_changes.push({
            change_number: fromAccount.account_changes.length + 1,
            amount: -amount,
            changed_date: new Date(),
            remark
        });
        // Record transaction in destination account's history
        toAccount.account_changes.push({
            change_number: toAccount.account_changes.length + 1,
            amount: amount,
            changed_date: new Date(),
            remark
        });

        // Save the updated accounts using the session
        await fromAccount.save({ session });
        await toAccount.save({ session });

        // Commit the transaction (permanently apply the changes)
        await session.commitTransaction();
        console.log("Transaction completed successfully");

    } catch (err) {
        // Rollback the transaction if any error occurs
        await session.abortTransaction();
        console.error("Transaction failed:", err.message);
    } finally {
        // End the session (cleanup)
        await session.endSession();
    }
}