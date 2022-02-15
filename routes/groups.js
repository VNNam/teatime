const { members, addMember } = require('../controllers/group-controller');

const router = require('express').Router();

router.route('/:groupId').get(members).post(addMember);
module.exports = router;
