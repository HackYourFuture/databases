module.exports.createTableObject = (titlesOfColumns, valuesOfTable) => {
  return valuesOfTable.reduce((rowsArray, valueOfRow) => {
    let rowObject = {};

    titlesOfColumns.forEach((title, index) => (rowObject[title] = valueOfRow[index]));

    rowsArray.push(rowObject);
    return rowsArray;
  }, []);
};
