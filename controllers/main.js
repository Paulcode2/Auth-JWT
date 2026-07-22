// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard
require("dotenv").config;
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;

  // mongo
  // Join
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 404);
  }
  // just for demo, normally provided by the db
  const id = new Date().getDate();
  // just for demo. Use long and unguessable value in production
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here's Your token and your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authourized to access this route", 401);
  }
  // console.log(req.headers);

  // res.status(200).json({
  //   msg: `Hello, ${req.user.username}`,
  //   secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  // });
};

module.exports = {
  login,
  dashboard,
};
