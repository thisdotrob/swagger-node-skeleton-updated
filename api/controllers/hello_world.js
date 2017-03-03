'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello,
  helloPipe: helloPipe
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}


// Example of using a pipe as a controller, per release docs for 0.7.1 of swagger-node-runner
// Please note this seems to bypass response validation.
function helloPipe(ctx, next) {
  var name = ctx.request.swagger.params.name.value || 'stranger';

  var hello = util.format('Hello, %s!', name);

  // This only works if the output is set to something other than 'output' for the _router fitting definition (bagpipes._router.output in default.yaml).
  // Otherwise the Bagpipes module overrides the output property set on ctx below during postFlight:
  // https://github.com/apigee-127/bagpipes/blob/master/lib/bagpipes.js#L208-L221
  ctx.output = hello;

  ctx.statusCode = 200;

  ctx.headers = { 'content-type': 'application/json' };

  next();
}
