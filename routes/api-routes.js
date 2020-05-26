// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
var moment = require("moment");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json(req.user)
    }
  });

  // Api is for adding fish to database, if not there
  app.get("/api/checkFish", function(req, res) {
    db.Fish.findAll({}).then(function(data) {
      if (data.length) res.send(data);
      else {
          var allFish;
          var queryURL = "https://www.fishwatch.gov/api/species/";
          axios.get(queryURL).then(function(response) {
              console.log(response.data);
              allFish = response.data.map(fish => fish = {
                species: fish["Species Name"],
                photo: fish["Species Illustration Photo"].src,
                quote: fish["Quote"],
              });
              console.log(allFish)
              db.Fish.bulkCreate(allFish)
              .then(function() {
                console.log("All fish added");
                res.send();
              })
              .catch(function(err) {
                res.status(401).json(err);
              });
        
            });

      }
    });
  });

  /****************************************************************************************** */
  /****************************************************************************************** */
  /****************************************************************************************** */

  //Trying to UPDATE post SET profile_pic = req.body WHERE id = req.params.id;

  app.put("/api/user_data", function(req, res) {
    console.log(req.body.url);

    db.User.update(
      {
        profile_pic: req.body.url,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).catch(function(err) {
      res.status(401).json(err);
    });
  });

  /****************************************************************************************** */
  /****************************************************************************************** */
  /****************************************************************************************** */

  app.get("/api/users/", function(req, res) {
    db.User.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // working on post api
  //////////////////////////////////////////////////////////////////////////////

  app.get("/api/post", function(req, res) {
    db.Post.findAll({
      include: [db.User],
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/post/:id", function(req, res) {
    db.Post.findAll({
      include: [db.User],
      where: {
        user_id: req.params.id,
      },
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  
  // deletes post from the database
  app.delete("/api/post", function (req, res) {
    db.Post.destroy({where:{id:req.body.id}}).then(function(response){
      res.end()
    })
  })

  // working on post api
  //////////////////////////////////////////////////////////////////////////////
  app.post("/api/post", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/user-info", function(req, res) {
    console.log(req.body);
    db.User.update(
      {
        user_name: req.body.user_name,
        city: req.body.city,
        bio: req.body.bio,
      },
      {
        where: {id: req.body.id}
      }
    ).then(function(rowsUpdated) {
      res.redirect("/")
    })
  });

app.post("/api/location", function(req, res) {
  db.Location.create({
    name: req.body.name,
    info: req.body.info,
    lat: req.body.lat,
    lng: req.body.lng
  }).then(function(dbLocation) {
    console.log(dbLocation);
  });
});

app.get("/api/location", function(req, res) {
  db.Location.findAll({
    
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});


}

