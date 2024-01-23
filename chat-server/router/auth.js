/**
 *  path: /api/login
 */

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');
const { jwtValidate } = require('../middlewares/jwt-verify');

const router = Router();


// Create new Users
router.post( '/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateInputs
], createUser )


// Login
router.post( '/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateInputs
], login )


// Revalidar Token
router.get( '/renew', jwtValidate, renewToken )


module.exports = router;