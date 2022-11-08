
export async function setup(client){

    const accountsCollection = client
        .db("databaseWeek4").collection("accounts")

    // Remove all the documents
    await accountsCollection.deleteMany({});

    // Add our documents
    await accountsCollection.insertMany(createSampleData());

}

function createSampleData(){
    const accounts = [

        {
            account_number:101,
            balance: 2000,
            account_changes: [
                {
                    change_number: 1,
                    amount: 10,
                    changed_date: new Date('2022-11-03'),
                    remark: "credit"
                }
            ]
        },
        {
            account_number:102,
            balance: 1800,
            account_changes: [
                {
                    change_number: 1,
                    amount: -10,
                    changed_date: new Date('2022-11-01'),
                    remark: "debit"
                }
            ]
        }
    
    ]

    return accounts;
}
