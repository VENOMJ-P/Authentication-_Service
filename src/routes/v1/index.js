const express = require('express');

const UserController = require('../../controllers/user-controller')
const {AuthRequestsValidators} = require('../../middlewares/index')

const router = express.Router();

router.post(
    '/signup',
    AuthRequestsValidators.validateUserAuth,
    UserController.create
    );
router.post(
    '/signin',
    AuthRequestsValidators.validateUserAuth,
    UserController.signIn
    );

module.exports=router;