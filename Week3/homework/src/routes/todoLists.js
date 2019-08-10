const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  remove,
  update,
  createMultiple,
  removeMultiple,
  setDone
} = require('../controllers/TodoListsController');

router.post('/multiple', createMultiple);
router.delete('/multiple/:id', removeMultiple);
router.put('/:id/:status', setDone);

router
  .route('/')
  .get(getAll)
  .post(create);

router
  .route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

module.exports = router;
