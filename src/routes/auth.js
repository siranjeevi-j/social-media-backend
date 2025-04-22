const app = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/users");

const router = app.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const details = req.body;

    const password = await bcrypt.hash(details.password.toString(), 10);

    const user = await User.create({
      ...details,
      password,
    });

    const savedUser = await user.save();

    const jwtToken = await savedUser.getJWT();

    res.cookie("token", jwtToken, {
      expiresIn: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).send({ message: "User signup successfully" });
  } catch (err) {
    console.error(err);

    res.status(400).send({ message: "User was not created" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await User.findOne({ email });

    if (userRecord) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userRecord.password
      );

      if (isPasswordMatch) {
        const jwtToken = await userRecord.getJWT();

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

module.exports = router;
