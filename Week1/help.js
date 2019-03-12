'use strict;';

const help = () => {
  console.log(`
  node-jS App 
  Choose one of these commands to query about every answer:
  use: node select [options]
  Options:
1 .... the names of countries with population greater than 8 million.
2 .... the names of countries that have “land” in their names.
3 .... the names of the cities with population in between 500,000 and 1 million.
4 .... the name of all the countries on the continent ‘Europe’.
5 .... List all the countries in the descending order of their surface areas.

ex: node select 2
-------------------------------
To show help: node select help
-------------------------------

    `);
};

module.exports = help;
