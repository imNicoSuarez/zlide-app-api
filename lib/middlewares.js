module.exports = function(app){

  function crossOrigin(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }

  function autorization(req, res, next){
    var accessToken = req.header('X-AccessToken');

    if (accessToken) {

      app.models.user.getUsers({ access_tokens: accessToken }, function(err, results){
        if (results.length != 0){
          next();
        } else {
          res.send(401, data);
        }
      });

    } else {
      res.send(401, data);
    }
  }

  function logger(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
  }

  var middlewares = {
    crossOrigin: crossOrigin,
    autorization: autorization,
    logger: logger
  }

  return middlewares;

}