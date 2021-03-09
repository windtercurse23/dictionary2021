const db = require("../db");
const shortid = require("shortid");
module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};
module.exports.search = (req, res) => {
  const q = req.query.q;
  const matchUsers = db
    .get("users")
    .value()
    .filter((user) => {
      return user.name.indexOf(q.toLowerCase()) !== -1;
    });
};
module.exports.getCreate = (req, res) => {
  res.render("users/create");
};
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  // req.body.avatar = req.file.path.split("/").slice(1).split("/");
  req.body.avatar = "uploads/" + req.file.filename;

  db.get("users").push(req.body).write();
  res.redirect("/users");
};
module.exports.findUser = (req, res) => {
  var id = req.params.id;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
};
