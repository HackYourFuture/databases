const accounts = [
  {
    account_number: 101,
    balance: 5500,
  },
  {
    account_number: 102,
    balance: 0,
  },
  {
    account_number: 103,
    balance: 1200,
  },
  {
    account_number: 104,
    balance: 200,
  },
  {
    account_number: 105,
    balance: 12000,
  },
];

const changes = [
  {
    account_number: 101,
    amount: 900,
    date: "2021-05-01",
    remark: "Holiday allowance"
  },
  {
    account_number: 102,
    amount: -150,
    date: "2021-10-10",
    remark: "Ns Invoice!"
  }
];

module.exports = { accounts, changes};