'use strict';

var Runner = require('swagger-node-runner');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  enforceUniqueOperationId: true, // enforces operationId uniqueness constraint in the schema
  startWithWarnings: false // Start the server if Swagger has warnings
};

Runner.create(config, function(err, runner) {
  if (err) { throw err; }

  const swaggerExpress = runner.expressMiddleware();

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
