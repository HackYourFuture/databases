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

router
  .route('/')
  .get(getAll)
  .post(create);

router
  .route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

router.route('/fake').post(seedFake);

router.route('/multiple').post(createMultiple);

router.route('/multiple/:id').delete(removeMultiple);

module.exports = router;
