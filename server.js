const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

//initialize app
const app = express();

//connect database
connectDB();

//test endpoint
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

//router middleware - parsing the data passes in the body
app.use(express.json({ extended: false }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/posts", require("./routes/api/posts"));

//Static process in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//localhost PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starts on port ${PORT}`));
