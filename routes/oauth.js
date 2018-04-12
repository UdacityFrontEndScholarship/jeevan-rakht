const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    if (req.user) {
          const payload = {
              id: req.user.id
          }
          const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
          res.status(200).json({
            message: 'auth successful',
            token: token
          });
      }
});

module.exports = router;