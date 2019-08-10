function handleErrorAndData(data, error) {
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }

  console.log(data);
}

module.exports = handleErrorAndData;
