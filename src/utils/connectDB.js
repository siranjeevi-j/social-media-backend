const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://siranjeevij11:gFyyyg7ghEw7K7VK@social-media.dwikr6j.mongodb.net/&appName=social-media"
  );
};

module.exports = connectDB;
