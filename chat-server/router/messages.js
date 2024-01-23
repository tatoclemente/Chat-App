

const { Router } = require('express');
const { jwtValidate } = require('../middlewares/jwt-verify');
const { getChat } = require('../controllers/messages');

const router = Router();

router.get('/:from', jwtValidate, getChat)


module.exports = router;