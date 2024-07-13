const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false })); // Disable session

router.get('/facebook/callback', passport.authenticate('facebook', {session: false, failureRedirect: '/' }), authController.facebookCallback);

router.get('/logout', authController.logout);

module.exports = router;
