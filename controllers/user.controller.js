const { where } = require("sequelize");
const db = require("../models/index");
const User = db.user;
const Diary = db.diary;
// Desc    Get my profile page
// Route   GET /user/profile
// Access  Public
const getUserProfile = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const diaries = await Diary.findAll({
    where: { userId: user.id },
    raw: true,
  });
  try {
    res.render("user/profile", {
      title: user.name,
      user: user,
      diariesLength: diaries.length,
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc    Get my profile page
// Route   GET /user/profile/my
// Access  Public
const getMyProfile = async (req, res) => {
  const user = req.session.user;
  const diaries = await Diary.findAll({
    where: { userId: user.id },
    raw: true,
  });
  try {
    res.render("user/myprofile", {
      title: user.name,
      user: user,
      diariesLength: diaries.length,
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getUserProfile, getMyProfile };
