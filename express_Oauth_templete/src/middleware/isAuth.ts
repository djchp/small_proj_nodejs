function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("done")
    res.status(401).json({
      error: "unauthenticated",
    });
  }
}

module.exports = isAuthenticated;