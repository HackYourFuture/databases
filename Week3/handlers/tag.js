const { find, handleError } = require('../helpers');
const knex = require('../db');

const getTodobyTag = async (req, res) => {
  const { tagname } = req.params;
  try {
    const row = await find({ table: 'tag', columns: 'id', filter: { tagname } });
    if (!row.length) return res.status(404).send('Tag not found');
    res.send(
      await knex('tag')
        .join('todotag', { 'tag.id': 'todotag.tagid' })
        .join('todoitem', { 'todoitem.id': 'todotag.todoitemid' })
        .select(['todoitem.note', 'todoitem.done'])
        .where({ tagname }),
    );
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getTodobyTag };
