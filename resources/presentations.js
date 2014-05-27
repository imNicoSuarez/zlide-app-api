module.exports =  function(app){

  app.server.get(app.routes.presentations, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { owner: req.params.user_id };
    app.models.presentation.getPresentations(condition, function(err, results){
      if (err) {
        res.send(err);
      } else {
        res.send({ count: results.length, presentations : results });
      }
    });
  });

  app.server.get(app.routes.presentation, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { owner: req.params.user_id, _id : req.params.id};
    app.models.presentation.getPresentations(condition, function(err, results){
      if (err) {
        res.send(err);
      } else {
        res.send({ presentation : results[0] });
      }
    });
  });

  app.server.post(app.routes.presentations, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var body = req.body;
    body.owner = req.params.user_id;
    app.models.presentation.create(body, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ presentation : result });
      }
    });
  });

  app.server.put(app.routes.presentation, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { owner: req.params.user_id };
    var body = req.body;
    body.owner = req.parmas.user_id;
    app.models.presentation.update(req.params.id, body, condition, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ presentation : result });
      }
    });
  });

  app.server.del(app.routes.presentation, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { owner: req.params.user_id};
    app.models.presentation.destroy(req.params.id, condition, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ presentation : result });
      }
    });
  });

}