const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  loginUser,
  logout,
  getRegisterPage,
  RegisterUser,
} = require("../controllers/auth.controller");
const { guest, protected } = require("../middleware/auth");
router.get("/logout", protected, logout);
router.get("/login", guest, getLoginPage, );
router.post("/login", guest, loginUser);
// register
router.get("/register", guest, getRegisterPage);
router.post("/register", guest, RegisterUser);
module.exports = router;
