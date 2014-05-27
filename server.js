var restify  = require('restify'),
    config   = require('configure'),
    passport = require('passport');

var routes = require('./config/routes');
var mongoose = require('./lib/db.js')(config);


var server = restify.createServer({
  name: config.app.name,
  version: config.app.version
});

// Models
var models = {
  user : require('./models/user')(mongoose),
  presentation : require('./models/presentation')(mongoose),
  page : require('./models/page')(mongoose),
}

var app = {
  server: server,
  routes: routes,
  config: config,
  mongoose: mongoose,
  models: models,
  passport: passport
}

app.middlewares = require('./lib/middlewares.js')(app);

server.use(restify.acceptParser(server.acceptable));
server.use(app.middlewares.logger)
server.use(passport.initialize());
server.use(passport.session());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(app.middlewares.crossOrigin);

// Resources
require('./resources/users')(app);
require('./resources/presentations')(app);
require('./resources/pages')(app);
require('./resources/auth')(app);

server.listen(config.server.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
