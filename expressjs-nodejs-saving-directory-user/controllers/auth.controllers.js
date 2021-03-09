const db = require("../db");
const md5 = require("md5");
module.exports.login = (req, res) => {
  res.render("auth/login");
};
module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = md5(password);
  const user = db.get("users").find({ email: email }).value();
  if (!user) {
    res.render("auth/login", {
      error: ["Users does exist"],
      value: req.body,
    });
    return;
  }
  if (user.password !== hashPassword) {
    res.render("auth/login", {
      error: ["Wrong password"],
      value: req.body,
    });
    return;
  }
  res.cookie("userId", user.id, {
    signed: true,
  });
  res.redirect("/users");
};
