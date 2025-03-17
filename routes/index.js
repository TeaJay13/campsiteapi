const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.use('/campsites', require('./campsites'));

// req.isAuthenticated is provided from the auth router
router.get('/user', userController.checkUser);

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;