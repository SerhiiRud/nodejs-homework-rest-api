const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(1);
  res.status(200).json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
