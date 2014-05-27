module.exports =  function(app){

  app.server.get(app.routes.users, app.middlewares.autorization ,function (req, res) {
    res.contentType = 'json';
    app.models.user.getUsers(function(err, results){
      if (err) {
        res.send(err);
      } else {
        res.send({ users : results });
      }
    });
  });

  app.server.get(app.routes.user, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    app.models.user.getUser(req.params.id, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ user : result });
      }
    });
  });

  app.server.post(app.routes.users, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    app.models.user.create(req.body, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ user : result });
      }
    });
  });

  app.server.put(app.routes.user, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    app.models.user.update(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ user : result });
      }
    });
  });

  app.server.del(app.routes.user, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    app.models.user.destroy(req.params.id, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ user : result });
      }
    });
  });

}