const app = require("express")();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}

// connect to the Database
const connectDatabase = require("./utils/connectDB");
connectDatabase();

// Cloudinary connection
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middlewares
app.use(require("express").json());
app.use(require("cookie-parser")());
app.use(require("express-fileupload")());
// app.use(require('../backend/middlewares/userAuth').authChecker)

// Routes
const user = require("./routes/userRoutes");
const pics = require("./routes/picRoutes");

app.use("/api/user", user);
app.use("/api/pic", pics);

//server
app.get("/", (req, res) => {
  res.send("hit at " + port);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running on localhost:${port}`));
