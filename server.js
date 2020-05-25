// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// const request = require('request');
// Requiring passport as we've configured it
var passport = require("./config/passport");

var app = express();

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://www.fishwatch.gov/api/species/"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.get('/api/species', (req, res, next) => {
//   request(
//     { url: 'https://www.fishwatch.gov/api/species/' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
//   next();
// });
// app.post('/', function(req, res, next) {
//   // Handle the post for this route
//  });

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");


// Creating express app and configuring middleware needed for authentication

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
