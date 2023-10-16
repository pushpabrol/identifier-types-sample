var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

router.post('/login', (req, res) => {
console.log(req.body);
  res.oidc.login({
    returnTo: '/profile',
    authorizationParams: {
      connection: req.body.loginOption || "email",
    },
  })
});

module.exports = router;
