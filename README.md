# Chauffeur

Tool for setting up a development express server that can serve static files, setup test routes, proxy requests, and integrates [testable-middleware](https://github.com/joeytrapp/node-testable-middleware).

## Usage

Here is an example usage of `chauffeur`.

    var chauffeur = require('chauffeur'), config;

    config = {
        port: 8000,
        staticFiles: ['public'],
        testable: { route: '/test.html' },
        routes: 'config/routes.js',
        proxy: [
            { path: '/api', host: 'localhost', port: 3000 }
        ]
    };

    chauffeur(config, function() {
        console.log('Server is started');
    });

## Config

### config.port

The port that the express webserver will run on. Defaults to port 8000.

### config.staticFiles

String or array of strings of paths relative to `./`. These directories are where static files are served from. In the case of an array, each location is checked in order.

### config.routes

String or array of strings of paths relative to `./`. These should be javascript should export a function that takes the express app as an argument. The primary use case for this feature is to allow you to stub out requests that would otherwise get proxied to a backend server.

    // config/routes.js
    module.exports = function(app) {
        app.get('/:resource/:id', function(res, req) {
            var obj = {}; // Load some fixture data or something.
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.parse(obj));
        });
    };

### config.proxy

Array of objects. Each object in an array will be evaluated for whether or not it should handle the proxy. Any item that doesn't implement a `path` key will handle all requests.

    proxy: [
        { path: '/api', host: 'localhost', port: 3000 },
        { host: 'localhost', port: 80 }
    ]

In this example, requests to `localhost:8000/api` will get proxied to localhost:3000, and all other requests will go to localhost:80.

### config.testable

`chauffeur` integrates [testable-middleware](https://github.com/joeytrapp/node-testable-middleware), and the object set to `config.testable` is passed on to testable-middleware. See [testable](https://github.com/joeytrapp/node-testable) for options that can be passed to testable.
