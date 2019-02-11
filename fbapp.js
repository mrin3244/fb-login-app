var connect = require('connect'),
fbsdk = require('facebook-sdk');

connect()
.use(connect.cookieParser())
.use(connect.bodyParser())
.use(fbsdk.facebook({
appId  : '289431368406303',
secret : 'f4780387454cf59f10277ae71e2eab61'
}))
.use(function(req, res, next) {

if (req.facebook.getSession()) {
  res.end('<a href="' + req.facebook.getLogoutUrl() + '">Logout</a>');

  // get my graph api information
  req.facebook.api('/profile', function(me) {
      console.log(me);
  });

} else {
    res.end('<a href="' + req.facebook.getLoginUrl() + '">Login</a>');
}

 })
   .listen(9000);