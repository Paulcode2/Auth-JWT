const express = require("express");
const router = express.Router();

const login = require("../controllers/main");
// dashboard;
const authMiddleware = require("../middleware/auth");

// router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
