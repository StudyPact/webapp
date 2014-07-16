var app, instance;

var app_root = __dirname;
var app_port = process.env.PORT || 3000;
var express = require('express');
var async = require('async');
var flash = require('connect-flash');

var debug = require('debug')('studypact:webapp:server');

// Initial bootstrapping
exports.start = function (done) {
    async.waterfall([

        function (callback) {
            //Create our express instance
            app = express();

            // Bootstrap application
            bootApplication(app);
            registerWebappRoutes(app);

            instance = app.listen(app_port);
            debug('Server started on port %d', app_port);
            callback();
        }
    ], done);
};

exports.stop = function (done) {
    instance.close();
    done();
};

function bootApplication(app) {
    // Middleware
    app.use(express.bodyParser());
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    // Serve static files from the /public directory
    app.use('/', express.static(app_root + '/webapp'));

    app.set('views', './views');
    app.set('view engine', 'jade');

    // Set up an expressJs session
    app.use(express.session({
        secret: 'ru5aghei7mir9oxie4ahSah4cezaimoh5eeth9ei',
        maxAge: new Date(Date.now() + 3600000),
        key: 'sessionID'
    }));

    app.use(flash());
    app.use(app.router);
}

function registerWebappRoutes(app) {
    function renderWebapp(req, res) {
        res.render('index', {
                clientConfig: JSON.stringify({
                    host: process.env.HOST,
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET
                })
            }
        );
    }
    app.get("/", renderWebapp);
}

// allow normal node loading if appropriate
if (!module.parent) {
    debug("starting server");
    exports.start(function (err) {
        if (err) {
            console.err("Could not start server", err);
        }
    });
}