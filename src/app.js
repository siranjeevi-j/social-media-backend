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
const cookieParser = require("cookie-parser");

const connectDB = require("./utils/connectDB");
const authRoutes = require("./routes/auth");
const ConnectionRequest = require("./models/connectionRequests");
const User = require("./models/users");
const validateAuthentication = require("./utils/validateAuthentication");

const app = express();

app.use(cookieParser());

app.use("/", express.json());
app.use("/", authRoutes);

app.get(
  "/connections/request/:status/:to",
  validateAuthentication,
  async (req, res) => {
    try {
      const { status, to } = req.params;
      const user = req.user;

      if (status === "interested") {
        const toUser = await User.findById(to);

        if (!user || !toUser) {
          throw new Error("User not exist");
        }

        const isConnectionExists = await ConnectionRequest.find({
          $or: [
            { from: user._id, to },
            { from: to, to: user._id },
          ],
        });

        if (isConnectionExists.length > 0) {
          throw new Error("Connection already exists");
        }

        const newRequest = new ConnectionRequest({
          from: user._id.toString(),
          to: to.toString(),
          status,
        });

        await newRequest.save();

        res
          .status(200)
          .send({ message: "Connection request send successfully" });
      }
    } catch (error) {
      console.error(error);

      res.status(400).send({ message: "Failed" });
    }
  }
);

app.use("/", (req, res) => res.send("hi express"));

connectDB()
  .then(app.listen(4000, () => console.log("server is running")))
  .catch((err) => console.log(err + "DB cannot be connected"));
