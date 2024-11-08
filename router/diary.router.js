const { Router } = require("express");
const router = Router();
const {
  getMyDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary,
  getAllDiary,
} = require("../controllers/diary.controller");
const { protected } = require("../middleware/auth");
router.get("/my", protected, getMyDiary);
router.get("/all", protected, getAllDiary);
router.post("/add", protected, addNewDiary);
router.get("/:id", protected, getDiaryById);
router.get("/update/:id", protected, updateDiaryPage);
router.post("/update/:id", protected, updateDiary);
router.post("/delete/:id", protected, deleteDiary);
router.post("/comment/:id", protected, addCommentToDiary);
module.exports = router;
