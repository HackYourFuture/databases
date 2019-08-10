const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  remove,
  update,
  getUserTodos,
  createMultiple,
  removeMultiple,
  seedFake,
  getDetailedUsers
} = require('../controllers/UsersController');

router.get('/:id/details', getDetailedUsers);
router.get('/:id/todos', getUserTodos);
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
