const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const genderEnum = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const ageDiff = today.getFullYear() - value.getFullYear();
          const hasBirthdayPassed =
            today.getMonth() > value.getMonth() ||
            (today.getMonth() === value.getMonth() &&
              today.getDate() >= value.getDate());

          const age = hasBirthdayPassed ? ageDiff : ageDiff - 1;
          return age >= 18;
        },
        message: (props) =>
          `User must be at least 18 years old. DOB: ${props.value.toDateString()}`,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: genderEnum,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const jwtToken = await jwt.sign({ _id: user._id }, "secret-key", {
    expiresIn: "7d",
  });

  return jwtToken;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
