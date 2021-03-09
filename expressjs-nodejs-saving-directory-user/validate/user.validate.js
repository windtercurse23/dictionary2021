module.exports.postCreate = function (req, res, next) {
  const error = [];
  if (!req.body.name) {
    error.push("Name is required");
  }
  if (!req.body.phone) {
    error.push("Phone is required");
  }
  if (error.length) {
    res.render("users/create", {
      error: error,
      value: req.body,
    });
    return;
  }
  next();
};
