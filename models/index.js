const Sequelize = require("sequelize");

const sequelize = new Sequelize("diarybook", "postgres", "0507", {
  host: "localhost",
  dialect: "postgres",
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.diary = require("./diary.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);

// User model has many diaries
db.user.hasMany(db.diary, {
  as: "diaries", // Alias to refer to the diaries of the user
  onDelete: "CASCADE",
  constraint: true,
});

db.user.hasMany(db.comment, {
  as: "comments", // Alias to refer to the comments of the user
  onDelete: "CASCADE",
  constraint: true,
});

// Diary model has many comments
db.diary.hasMany(db.comment, {
  as: "comments", // Alias to refer to comments of a diary
  onDelete: "CASCADE",
  constraint: true,
});
db.diary.belongsTo(db.user, {
  // Diary belongs to one User
  foreignKey: "userId",
  as: "user",
});

// Comment model has one user and one diary
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
db.comment.belongsTo(db.diary, {
  foreignKey: "diaryId",
  as: "diary",
});

module.exports = db;
