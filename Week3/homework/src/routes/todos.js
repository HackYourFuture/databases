const router = require('express').Router();
const {
  getAll,
  getOne,
  update,
  remove,
  create,
  createMultiple,
  removeMultiple,
  seedFake
} = require('../controllers/TodosController');

router.post('/fake', seedFake);
router.post('/multiple', createMultiple);
router.delete('/multiple/:id', removeMultiple);

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
