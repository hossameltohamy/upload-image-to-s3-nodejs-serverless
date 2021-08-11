const express = require('express');
const {
  getUser,
  createUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

router.use(protect);


router
  .route('/')
  .post(createUser);

router
  .route('/:id')
  .get(getUser)

module.exports = router;
