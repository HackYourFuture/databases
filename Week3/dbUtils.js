const DROP = 'DROP TABLE IF EXISTS `todo_list`;';
const SET = 'SET character_set_client = utf8mb4;';

function handelError(err, msg) {
  if (err) return console.log(err);
  console.log(msg);
}

module.exports = {
  handelError,
  DROP,
  SET,
};
