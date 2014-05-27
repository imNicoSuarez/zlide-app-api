module.exports =  function(app){

  var FacebookStrategy = require('passport-facebook').Strategy;

  var scope = ['email', 'public_profile'];
  var callbackURL = app.config.server.host + app.routes.auth.facebook_callback;

  var fbLoginHandler    = app.passport.authenticate('facebook', { scope: scope, session: false, assignedProperty:'user'});
  var fbCallbackHandler = app.passport.authenticate('facebook', { scope: scope, session: false, assignedProperty:'user'});

  app.server.get(app.routes.auth.facebook_login, fbLoginHandler);
  app.server.get(app.routes.auth.facebook_callback, fbCallbackHandler, fbCallbackHandler2);

  app.passport.use(new FacebookStrategy({
      clientID:     app.config.auth.facebook.appId,
      clientSecret: app.config.auth.facebook.appSecret,
      callbackURL: callbackURL },
      function(accessToken, refreshToken, profile, done) {

      var data = {
        name: profile.displayName,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        gender: profile.gender,
        email: profile.emails[0].value,
        fb_id: profile.id,
        access_tokens: accessToken
      }

      app.models.user.getUsers({fb_id: profile.id}, function(err, results){

        if (results.length === 0) {
          app.models.user.create(data, function(err, result){
            return done(null, result)
          });
        } else {
          app.models.user.update(results[0]._id, { access_tokens: accessToken }, function(err, result){
            return done(null, result);
          });
        }
      });

  }));

  app.passport.serializeUser(function(user, done) {
    done(null, user);
  });

  function fbCallbackHandler2(req, res) {
    var callbackURL =  req.header('referer')+"auth/callback?code="+req.user.access_tokens+"&identifier="+req.user._id

    res.header('Location', callbackURL);
    res.send(302);
  }

}