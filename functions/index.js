const express = require("express");

const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
initializeApp();
const {exportFunctions} = require("better-firebase-functions");

const coursesRoute = require("./api/routes/courses");
const notesRoute = require("./api/routes/notes");
const userRoute = require("./api/routes/users");
const authRoute = require("./api/routes/auth");

const app = express();

app.use("/courses", coursesRoute);
app.use("/notes", notesRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

exports.api = functions.https.onRequest(app);

exportFunctions({__filename, exports, searchGlob: "**/*.func.js"});
