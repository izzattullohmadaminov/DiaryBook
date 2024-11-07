const protected = (req, res, next) => {
  if (req.session.isLogged) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

const guest = (req, res, next) => {
  if (!req.session.isLogged) {
    next();
  } else {
    res.redirect("/diary/my");
  }
};

module.exports = { protected, guest };
