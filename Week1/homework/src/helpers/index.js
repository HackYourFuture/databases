const printTitle = title => {
  console.log('-'.repeat(title.length));
  console.log(title.toUpperCase());
  console.log('-'.repeat(title.length));
};

const numberToText = (number, fixed = 0) => {
  return number >= 1.0e9 ? `${(number / 1.0e9).toFixed(fixed)}B` : number >= 1.0e6 ? `${(number / 1.0e6).toFixed(fixed)}M` : number >= 1.0e3 ? `${(number / 1.0e3).toFixed(fixed)}K` : number;
};

module.exports = { printTitle, numberToText };
