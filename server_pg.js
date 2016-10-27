var express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	orm = require("orm"),
	passport = require("passport"),
	flash = require('connect-flash'),
	LocalStrategy = require('passport-local').Strategy,
	RememberMeStrategy = require('./strategy'),
	userDao = require("./models/user"),
	taskDao = require("./models/task"),
	cookieSession = require('cookie-session');

if (global.Promise == null) {
	global.Promise = require("bluebird");
}

var opts = {
	host:     '10.2.87.142',
	database: 'task_orm',
	user: 'postgres',
	password: 'postgres',
	protocol: 'pg',
	port:     '5432',
	query:    {pool: true}
};

app.set('port', process.env.PORT || 5000);
global.port = app.get('port');

orm.connect(opts, function (err, db) {
  if (err) throw err;

  	taskDao.sync(db);
 	userDao.syncUser(db);

    // add the table to the database 
    db.sync(function(err) {

        if (err) throw err;
    });
});

app.use(cookieSession({keys: ['secret1', 'secret2']}));
app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

passport.use(new LocalStrategy(
	function(username, password, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {
			userDao.findByUsername(username, function(err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {
						message: 'Unknown user ' + username
					});
				}

				if (user.password != password) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}
				return done(null, user);
			});
		});
	}
));

function consumeRememberMeToken(token, fn) {
  var uid = tokens[token];
  // invalidate the single-use token
  delete tokens[token];
  return fn(null, uid);
}

passport.use(new RememberMeStrategy(
  function(token, done) {
    consumeRememberMeToken(token, function(err, uid) {
      if (err) { return done(err); }
      if (!uid) { return done(null, false); }
      
      findById(uid, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    });
  },
  issueToken
));

app.post("/api/", function(req, res) {

	taskDao.create(req.body.data, function(err, data) {
		res.send("Guardamos tus datos");	

	});
});

app.put("/api/", function(req, res) {

	taskDao.save(req.body.data.id, req.body.data, function(err, data) {
		res.send("Guardamos tus datos");	
	});
});

app.get("/api", function(req, res) {

	taskDao.getAll(function(err, data) {
		res.send(data);
	});
});

app.get("/api/:id", function(req, res) {

	taskDao.get(req.params.id, function(err, data) {
		res.send(data);
	});
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function issueToken(user, done) {

	var buf = [],
		chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		charlen = chars.length;

	for (var i = 0; i < 64; ++i) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}

  	var token = buf.join('');
	return done(null, token);
}

urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post(
	"/user/login",
	urlencodedParser,
	function(req, res, next) {
		
		var user = req.body;

		passport.authenticate('local', function(err, user, info) {

			if (!user) {
				res.send(info);
				return next();
			}

			issueToken(req.user, function(err, token) {
				if (err) {
					res.send({
						success: false,
						err: err
					});
					return next(err);
				}

				res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
				res.send({
					success: true
				});
				return next();
			});
		})(req, res, next);
	
	}
);

app.listen(app.get('port'));