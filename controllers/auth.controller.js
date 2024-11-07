const db = require("../models/index");
const bcrypt = require("bcryptjs");
const User = db.user;
// Desc    Get Login page
// Route   GET /auth/login
// Access  Public
const getLoginPage = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    res.render("auth/login", {
      title: "My diary",
      isAuthenticated,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc    Get Login page
// Route   Post /auth/login
// Access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        req.session.isLogged = true;
        req.session.user = userExist;
        res.redirect("/diary/my");
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
};

// Desc    Logout user
// Route   Post /auth/logout
// Access  Private
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Sessiyani yo'q qilishda xatolik yuz berdi");
    }
    res.redirect("/auth/login");
  });
};

// Desc    Get Register page
// Route   GET /auth/register
// Access  Public
const getRegisterPage = async (req, res) => {
  try {
    res.render("auth/register", {
      title: "Register",
      isAuthenticated: req.session.isAuthenticated || false,
    });
  } catch (err) {
    console.log(err);
  }
};
// Desc    Register new User page
// Route   Post /auth/register
// Access  Public
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (password !== password2) {
      res.redirect("/auth/register");
    }
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      res.redirect("/auth/register");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    await User.create({
      email,
      name,
      password: passwordHash,
    });
    return res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getLoginPage,
  loginUser,
  logout,
  getRegisterPage,
  RegisterUser,
};
