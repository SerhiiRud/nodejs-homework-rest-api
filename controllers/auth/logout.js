const { User } = require("../../models/user");

const logout = async (res, req) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

module.exports = {
  logout,
};
