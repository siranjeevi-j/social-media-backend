// Create server using HTTP
/*
const http = require("http");

const app = http.createServer((req, res) => {
  res.end("hi");
});

// app.get('/', (req, res) => res.send('hi'));
app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
*/

const express = require("express");
const connectDB = require("./utils/connectDB");

const User = require("./models/users");

const app = express();
app.use("/", express.json());

app.post("/sign-up", async (req, res) => {
  try {
    const details = req.body;

    console.log(details);

    const user = await User.create(details);

    user.save();

    res.send("User signup successfully");
  } catch (err) {
    console.error(err);

    res.send("User was not created");
  }
});
app.use("/users", async (req, res) => {});

app.use("/", (req, res) => res.send("hi express"));

connectDB()
  .then(app.listen(4000, () => console.log("server is running")))
  .catch((err) => console.log(err + "DB cannot be connected"));
