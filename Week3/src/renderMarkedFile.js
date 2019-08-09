'use strict';

const util = require('util');
const fs = require('fs');
const { handleError } = require('./error');

const readFile = util.promisify(fs.readFile);

const README_PATH = __dirname + '/../todoAppREADME.md';
const DEFAULT_ENCODING = 'utf8';

const renderReadme = async (request, response) => {
  try {
    const readmeData = await readFile(README_PATH, DEFAULT_ENCODING);
    return response.set('Content-Type', 'text/plain-text').send(readmeData);
  } catch (error) {
    handleError(error);
  }
};

module.exports = renderReadme;
