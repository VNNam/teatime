const {
  members,
  addMember,
  getGroup,
} = require('../controllers/group-controller');
const { userAuthenticated } = require('../controllers/user-controller');

const router = require('express').Router();

router.route('/:groupId').get(members).post(addMember);

/* GET group chat. */
router.get('/:id/detail', userAuthenticated, getGroup);

module.exports = router;
