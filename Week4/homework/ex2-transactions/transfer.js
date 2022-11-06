export async function transfer(client, fromAccount, toAccount, amount) {
	const accountsCollection = client.db("databaseWeek4").collection("accounts");

	const session = client.startSession();
	try {
		await session.withTransaction(async () => {



			await accountsCollection.updateOne(
				{
					account_number: fromAccount,
				},
				{
					$inc: { balance: amount * -1 },
					$addToSet: {
						account_changes: {
							change_number: await getChangeNumber(accountsCollection, fromAccount) + 1,
							amount: amount * -1,
							changed_date: new Date(),
							remark: "debit",
						},
					},
				},
				{ session }
			);

			await accountsCollection.updateOne(
				{ account_number: toAccount },
				{
					$inc: { balance: amount },
					$addToSet: {
						account_changes: {
						    change_number: await getChangeNumber(accountsCollection, toAccount) + 1,
							amount: amount,
							changed_date: new Date(),
							remark: "credit",
						},
					},
				},
				{ session }
			);
		});
	} catch (err) {
		await session.abortTransaction();
		console.error("transaction failed", err);
	} finally {
		await session.endSession();
	}
}

async function getChangeNumber(accountsCollection, accountNumber) {
    const account = await accountsCollection.findOne({
        account_number: accountNumber,
      });
      return account.account_changes.length;
}