const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  remove,
  update,
  createMultiple,
  removeMultiple,
  seedFake
} = require('../controllers/CategoriesController');

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
