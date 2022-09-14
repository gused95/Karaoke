// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const moment = require("moment");

//Helper created for formatting the date
hbs.registerHelper("formatoFecha", (fecha) => {
    return moment(fecha).format("DD/MM/YYYY HH:mm A")
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Kanta";

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const karaokeRoutes = require("./routes/karaoke.routes");
app.use("/karaoke", karaokeRoutes);
// 👇 Start handling USER routes here (Gus): ////////////////////

//localhost:3000/user
const userRoutes = require("./routes/user.routes"); //
app.use("/user", userRoutes);

const invitadosRoutes = require("./routes/invitados.routes");
app.use("/invitados",invitadosRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
