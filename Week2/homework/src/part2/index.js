const { execQuery } = require('../database/connection');
const { insertLanguage } = require('./insertLanguage');
const { TRIGGER } = require('./trigger');

const countryCode = process.argv[2];
const language = process.argv[3];

module.exports.partTwo = (async () => {
  try {
    await execQuery('DROP TRIGGER IF EXISTS language_trigger');
    await execQuery(TRIGGER);

    console.log(await insertLanguage(countryCode, language));

    process.exit();
  } catch (error) {
    throw new Error(error.message);
  }
})();
