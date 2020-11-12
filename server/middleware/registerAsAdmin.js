const registerAsAdmin = async (req, res, next) => {
  try {
    if (req.body.key === "REGISTER_ACM_ADMIN") {
      delete req.body.key;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (err) {
    res.status(500).send([
      {
        message: "Not authorized to register as an admin.",
      },
    ]);
  }
};

module.exports = registerAsAdmin;
