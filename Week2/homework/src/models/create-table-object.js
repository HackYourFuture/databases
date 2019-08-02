module.exports.createTableObject = (titlesOfColumns, valuesOfTable) => {
  return valuesOfTable.reduce((rowObject, valueOfRow) => {
    let rowObject = {};

    titlesOfColumns.forEach((title, index) => (rowObject[title] = valueOfRow[index]));

    rowObject.push(rowObject);
    return rowObject;
  }, []);
};
