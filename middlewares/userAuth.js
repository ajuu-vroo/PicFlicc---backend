const jwt = require("jsonwebtoken");

exports.authChecker = (req, res, next) => {
  try {
    const { id } = jwt.verify(req.cookies.token, "Harj0ts1ngh");

    req.user = id;
    next();
  } catch (error) {
    res.json({ message: "You are not logged in." });
  }
};
