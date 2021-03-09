const express = require("express");

require("dotenv").config();
const useRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/auth.middleware");
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 3000;
var cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("index", {
    name: "Tran Tri Thien",
  });
});

app.use("/users", authMiddleware.requireAuth, useRoute);
app.use("/auth", authRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
