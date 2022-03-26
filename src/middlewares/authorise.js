const authorise = (permittedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    console.log(user);
    isPermitted = false;
    permittedRoles.map((elem) => {
      if (user.role.includes(elem)) {
        isPermitted = true;
      }
    });
    if (isPermitted) {
      return next();
    } else {
      return res
        .status(400)
        .send({ message: "You are not authorised to make this change" });
    }
  };
};

module.exports = authorise;
