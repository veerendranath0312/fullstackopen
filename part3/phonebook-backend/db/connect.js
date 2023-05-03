const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB: ", error.message);
  }
};

module.exports = connectDB;
