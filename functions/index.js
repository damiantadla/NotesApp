const express = require("express");
const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
initializeApp();
const {exportFunctions} = require("better-firebase-functions");

const coursesRoute = require("./api/routes/courses")
const notesRoute = require("./api/routes/notes")
const userRoute = require("./api/routes/users")

const app = express();


app.use("/courses", coursesRoute)
app.use("/notes", notesRoute)
app.use("/user", userRoute)

exports.api = onRequest(app);


exportFunctions({__filename, exports, searchGlob: "**/*.func.js"});
