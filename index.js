const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/index");
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const pool = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgStore({
      pool: pool,
      tableName: "user_session",
    }),
    secret: "my secret value",
    resave: false,
    saveUninitialized: false,
  })
);
// Initial env variables
dotenv.config();
const PORT = process.env.PORT || 3000;

// template engine (ejs)
app.set("view engine", "ejs");
app.set("views", "./views");
// routes
app.use("/diary", require("./router/diary.router"));
app.use("/auth", require("./router/auth.router"));
app.use("/user", require("./router/user.router"));
// static files
app.use("/", async (req, res) => {
  if (req.session.isLogged) {
    return res.redirect("/diary/my");
  }
  res.redirect("/auth/login");
});
const start = async () => {
  try {
    const connect = await db.sequelize.sync();
    console.log(connect);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
