const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    const signedIn = jwt.sign({ id: user._id }, "Harj0ts1ngh", {
      expiresIn: "10d",
    });

    res
      .cookie("token", signedIn, { maxAge: 1000 * 60 * 60 * 24 * 10 })
      .json(signedIn);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//login a registered user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "no user found!" });
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res.status(400).json({ message: "Incorrect password." });

    const signedIn = jwt.sign({ id: user._id }, "Harj0ts1ngh", {
      expiresIn: "10d",
    });
    res
      .status(200)
      .cookie("token", signedIn, { maxAge: 1000 * 60 * 60 * 24 * 10 })
      .json(verifyPassword);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//update a user
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body = { ...req.body, password: hashedPassword };
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("+password");
    res.json(user);
  } catch (error) {
    res.json({ message: "cannot update" });
  }
};

//logout user
exports.logout = async (req, res) => {
  try {
    res
      .cookie("token", "", { maxAge: 1 })
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//fetch all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) return res.json({ message: "no users found!" });

  res.json(users);
};

//delete a user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user);
  res
    .cookie("token", "", { maxAge: 1 })
    .json({ message: "ID has been deleted." });
};
