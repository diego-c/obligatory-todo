// middleware to check if the user is authenticated
function checkUser(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login");
}

// middleware to prevent the user from logging in twice
function loginOnce(req, res, next) {
  return req.isAuthenticated() ? res.redirect("/") : next();
}

// middleware to disable cache on all routes
function disableCache(req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
}

module.exports = {
  checkUser,
  loginOnce,
  disableCache
}