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

router
  .route('/')
  .get(getAll)
  .post(create);

router
  .route('/:id')
  .get(getOne)
  .put(update)
  .delete(remove);

router.route('/:id/details').get(getDetailedUsers);

router.route('/fake').post(seedFake);

router.route('/multiple').post(createMultiple);

router.route('/multiple/:id').delete(removeMultiple);

router.route('/:id/todos').get(getUserTodos);

module.exports = router;
