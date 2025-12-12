const { setupAccounts } = require("./setup");
const { transfer } = require("./transfer");

async function main() {
  try {
    console.log("Running setup...");
    await setupAccounts();

    console.log("Setup complete!");

    console.log("Running transfer...");
    await transfer(101, 102, 1000, "Test transfer from 101 to 102");

    console.log("Transfer complete!");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
