const passport = require('passport'),
express = require('express'),
router = express.Router(),
warez = require('../middleware/warez'),
User = require('../db/models/users'),
xss = require('xss');

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
  let sanitizedUsername = xss(req.body.username.trim());
  let sanitizedPassword = xss(req.body.password.trim());
  let sanitizedEmail = xss(req.body.email.trim());

  if (!sanitizedUsername || !sanitizedPassword || !sanitizedEmail)
    {
      return res.redirect('/register');
    }
  if (sanitizedPassword < 6)
    {
      return res.redirect('/register');
    }
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(sanitizedEmail)) {
    return res.redirect('/register');
  }
  User.register(
    new User({ username: sanitizedUsername, email: sanitizedEmail }),
    sanitizedPassword,
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