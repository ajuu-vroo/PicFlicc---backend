const res = require("express/lib/response");
const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
  } catch (error) {
    res.json({ message: "error" });
  }
};

module.exports = connectDatabase ;
