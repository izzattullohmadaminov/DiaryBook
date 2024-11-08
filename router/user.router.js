const { Router } = require("express");
const router = Router();
const {
  getUserProfile,
  getMyProfile,
} = require("../controllers/user.controller");
const { protected } = require("../middleware/auth");
router.get("/profile/my", protected, getMyProfile);
router.get("/profile/:id", protected, getUserProfile);
module.exports = router;
