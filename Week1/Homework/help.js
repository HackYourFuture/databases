const help = () => {
  return console.log(`
  Welcome to Ayham\'s application.
  Type ' node index.js help' to see this help menu again.
  Type 'node index.js 1' for countries with population greater than 8 million.
  Type 'node index.js 2' for countries that have “land” in their names.
  Type 'node index.js 3' for cities with population in between 500, 000 and 1 million.
  Type 'node index.js 4' for countries on the continent ‘Europe’.
  Type 'node index.js 5' for countries in the descending order of their surface areas.
  `);
};

module.exports = help;
