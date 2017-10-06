const express = require("express"),
  app = express(),
  override = require("method-override"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  passport = require("passport"),
  passportLocal = require("passport-local").Strategy,
  passportLocalMongoose = require("passport-local-mongoose"),
  Todo = require("./db/models/todos"),
  User = require("./db/models/users"),
  authRoutes = require('./routes/auth'),
  todoRoutes = require('./routes/todos'),
  warez = require('./middleware/warez'),
  bodyParser = require("body-parser"),
  path = require("path"),
  env = require('dotenv').config(),
  cookieParser = require("cookie-parser"),
  helmet = require('helmet');

// db connection
let options = {
  useMongoClient: true,
  promiseLibrary: global.Promise
};
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECT, options);

// basic security
app.use(helmet({
    referrerPolicy: true
  }));

// cookies, session and passport boilerplate
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// views
app.set("view engine", "ejs");
app.set("views", "./views");

// css and js (frontend)
app.use(express.static(path.join(__dirname, "public")));

// populate req.body and get access to PUT and DELETE methods
app.use(bodyParser.urlencoded({ extended: true }));
app.use(override("_method"));

// disable cache on all routes
app.use(warez.disableCache);
// auth routes
app.use(authRoutes);
// todo routes
app.use(todoRoutes);

// spin up the server
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`todo app running on port ${port}`);
});
