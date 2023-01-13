// Imports

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const servicemanRouter = require("./routes/serviceprovider");

const app = express();
const port = 3010;

const { addAdmin } = require("./controllers/admin/admin.controller");
const CategoryRoutes = require("./routes/category");
const CityRoutes = require("./routes/city");
const RegisterRoutes = require("./routes/register");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

app.use("/", indexRouter);
app.post("/addadmin", addAdmin);

// app.post("/addCategory",addCategory);
app.use("/admin/category", CategoryRoutes);
app.use("/admin/city", CityRoutes);

app.use("/register", RegisterRoutes);

app.use("/users", usersRouter);
app.use("/serviceprovider", servicemanRouter);

app.use(express.static(path.join(__dirname, "public")));

// Listen on Port 4010
app.listen(port, () => console.info(`App listening on port ${port}`));
