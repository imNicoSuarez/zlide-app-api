module.exports =  function(app){

  app.server.get(app.routes.pages, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { presentation_id: req.params.presentation_id };
    app.models.page.getPages(condition, function(err, results){
      if (err) {
        res.send(err);
      } else {
        res.send({ count: results.length, pages : results });
      }
    });
  });

  app.server.get(app.routes.page, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { presentation_id: req.params.presentation_id, _id : req.params.id};
    app.models.page.getPages(condition, function(err, results){
      if (err) {
        res.send(err);
      } else {
        res.send({ page : results[0] });
      }
    });
  });

  app.server.post(app.routes.pages, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var body = req.body;
    body.presentation_id = req.params.presentation_id;
    app.models.page.create(body, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ page : result });
      }
    });
  });

  app.server.put(app.routes.page, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { presentation_id: req.params.presentation_id };
    var body = req.body;
    body.presentation_id = req.params.presentation_id;
    app.models.page.update(req.params.id, body, condition, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ page : result });
      }
    });
  });

  app.server.del(app.routes.page, app.middlewares.autorization, function (req, res) {
    res.contentType = 'json';
    var condition = { presentation_id: req.params.presentation_id};
    app.models.page.destroy(req.params.id, condition, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send({ page : result });
      }
    });
  });

}