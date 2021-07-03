// Packages ------------------------
require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
// ---------------------------------

// Requirements ------------------------------
require("./db/connection"); // Database connection
const User = require("./models/usermessage"); // Database collection
// -------------------------------------------

const app = express(); // 'app' is a instance of ExpressJS
const port = process.env.PORT; // Server port

// Paths ---------------------------------------------------------------
const bootstrapCSSPath = path.join(
  __dirname,
  "../node_modules/bootstrap/dist/css"
);
const bootstrapJSPath = path.join(
  __dirname,
  "../node_modules/bootstrap/dist/js"
);
const jqueryPath = path.join(__dirname, "../node_modules/jquery/dist");
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// ---------------------------------------------------------------------

// Middlewares ------------------------------------
app.use("/css", express.static(bootstrapCSSPath)); // Setting Bootstrap CSS
app.use("/js", express.static(bootstrapJSPath)); // Setting Bootstrap JS
app.use("/jquery", express.static(jqueryPath)); // Setting jQuery
app.use(express.static(staticPath)); // Getting CSS and images from 'public'
app.use(express.urlencoded({ extended: false })); // Getting the form values in JSON format
app.set("view engine", "hbs");
app.set("views", templatePath); // Setting the path of 'views' folder
hbs.registerPartials(partialsPath); // Registering the 'partials'
// ------------------------------------------------

// ------------------------------- Home Page ---------------------------------

// Rendering the Home Page at "/"
app.get("/", (req, res) => {
  res.status(201).render("index");
});

// ----------------------------- Contact Us Page -----------------------------

// Getting the values from Contact Us section and storing at Database
app.post("/contact", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// -------------------------------- Server -----------------------------------

app.listen(port, () => {
  console.log(`Server is running at port no. ${port}...`);
});
