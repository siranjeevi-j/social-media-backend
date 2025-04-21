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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/users");

const app = express();
app.use(cookieParser());
app.use("/", express.json());

app.post("/sign-up", async (req, res) => {
  try {
    const details = req.body;

    const password = await bcrypt.hash(details.password.toString(), 10);

    const user = await User.create({
      ...details,
      password,
    });

    await user.save();

    const jwtToken = await jwt.sign({ _id: userRecord._id }, "secret-key", {
      expiresIn: "7d",
    });

    res.cookie("token", jwtToken, {
      expiresIn: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).send({ message: "User signup successfully" });
  } catch (err) {
    console.error(err);

    res.status(400).send({ message: "User was not created" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await User.findOne({ email });

    if (userRecord) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userRecord.password
      );

      if (isPasswordMatch) {
        const jwtToken = jwt.sign({ _id: userRecord._id }, "secret-key", {
          expiresIn: "7d",
        });

        res.cookie("token", jwtToken, {
          expiresIn: new Date(Date.now() + 8 * 3600000),
        });

        return res.status(200).send({ message: "Logged in successfully" });
      }
    }

    res.status(400).send({ message: "Invalid Credentials" });
  } catch (err) {
    console.error(err);

    res.status(400).send({ message: "Invalid Credentials" });
  }
});

app.use("/", (req, res) => res.send("hi express"));

connectDB()
  .then(app.listen(4000, () => console.log("server is running")))
  .catch((err) => console.log(err + "DB cannot be connected"));
