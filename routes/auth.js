const passport = require('passport'),
express = require('express'),
router = express.Router(),
warez = require('../middleware/warez'),
User = require('../db/models/users');

// GET /login
router.get("/login", warez.loginOnce, (req, res) => {
  res.render("login", { index: false, css: "/css/login.css" });
});

// GET /logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// GET /register
router.get("/register", (req, res) => {
  res.render("register", { index: false, css: "/css/register.css" });
});

// POST /login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);
// POST /register
router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    err => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    }
  );
});

module.exports = router;