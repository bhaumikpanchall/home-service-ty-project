// Imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const servicemanRouter = require("./routes/serviceprovider");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3010;

const { addAdmin } = require("./controllers/admin/admin.controller");
const RegisterRoutes = require("./routes/register");
const AdminRoutes = require("./routes/admin");
const { checkUserLogin } = require("./middlewares/checkLogin");
const { authenticateUserToken } = require("./middlewares/authToken");
const { isServiceProvider } = require("./middlewares/checkRoles");
require('dotenv').config();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "homeservice",
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// * for check user is logged in or not 
//  - used fortoggle login/logout button
app.use((req, res, next) => {
  if (req.cookies.token) {
    res.locals.cookies = req.cookies;
  }
  next();
});

app.use("/", indexRouter);
app.post("/addadmin", addAdmin);

// app.post("/addCategory",addCategory);

// --------------------------------------------------------
// ---------------- ADMIN ROUTES START --------------------
// --------------------------------------------------------
// app.get("/admin", function (req, res) {
//   res.render("admin/admin");
// });
// app.use("/admin/category", CategoryRoutes);
// app.use("/admin/city", CityRoutes);
// app.use("/admin/contact_us", ContactRoutes);
// app.get("/admin/login", (req, res) => {
//   res.render("admin/login")
// })
// app.post("/admin/login", adminLogin);
// --------------------------------------------------------
app.use("/admin", AdminRoutes);

app.use("/register", checkUserLogin, RegisterRoutes);

app.use("/users", usersRouter);
app.use("/serviceprovider", authenticateUserToken, isServiceProvider, servicemanRouter);
app.get("*", (req, res) => {
  res.render("404");
})

// Listen on Port 4010
app.listen(port, () => console.info(`App listening on port ${port}`));
