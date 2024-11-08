const db = require("../models/index");
const { Op } = require("sequelize");
const Comment = db.comment;
const Diary = db.diary;
const User = db.user;
// Desc    Get all my diaries page
// Route   GET /diary/my
// Access  Private
const getMyDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      where: { userId: req.session.user.id },
      raw: true,
      plain: false,
      include: ["user"],
      nest: true,
    });

    res.render("diary/my-diary", {
      title: "My diary",
      diaries: diaries.reverse(),
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving diaries.");
  }
};
// Desc    Get all diaries page
// Route   GET /diary/all
// Access  Private
const getAllDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      where: { userId: { [Op.ne]: req.session.user.id } },
      raw: true,
      plain: false,
      include: ["user"],
      nest: true,
    });

    res.render("diary/all-diary", {
      title: "All diary",
      diaries: diaries.reverse(),
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving diaries.");
  }
};

// Desc    Get all my diaries page
// Route   POST /diary/my
// Access  Private
const addNewDiary = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    await Diary.create({
      text,
      imageUrl,
      userId: req.session.user.id,
    });
    res.redirect("/diary/my");
  } catch (err) {
    console.log(err);
  }
};
// Desc    Get all my diaries page
// Route   GET /diary/my
// Access  Private
const getDiaryById = async (req, res) => {
  try {
    const data = await Diary.findByPk(req.params.id, {
      row: false,
      plain: true,
      include: ["comments", "user"],
      nest: true,
    });
    const diary = data.toJSON();
    console.log(diary);
    const comments = diary.comments ? diary.comments.reverse() : [];
    res.render("diary/one-diary", {
      title: "one diary",
      diary: diary,
      comments: comments,
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};
// Desc     Update diary
// Route   GET /diary/update:id
// Access  Private
const updateDiaryPage = async (req, res) => {
  try {
    const diary = await Diary.findByPk(req.params.id, {
      raw: true,
    });
    res.render("diary/update-diary", {
      title: "Edit diary",
      diary: diary,
      isAuthenticated: req.session.isLogged,
    });
  } catch (err) {
    console.log(err);
  }
};
// Desc     Update diary
// Route   Post /diary/update:id
// Access  Private
const updateDiary = async (req, res) => {
  try {
    await Diary.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/diary/my");
  } catch (err) {
    console.log(err);
  }
};
// Desc    Delete diary
// Route   Post /diary/delete:id
// Access  Private
const deleteDiary = async (req, res) => {
  try {
    await Diary.destroy({ where: { id: req.params.id } });
    res.redirect("/diary/my");
  } catch (err) {
    console.log(err);
  }
};

// Desc    Add comment
// Route   Post /diary/comment/:id
// Access  Private
const addCommentToDiary = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    await Comment.create({
      name: user.name,
      comment: req.body.comment,
      diaryId: req.params.id,
      serId: user.id,
    });
    res.redirect("/diary/" + req.params.id);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getMyDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary,
  getAllDiary,
};
