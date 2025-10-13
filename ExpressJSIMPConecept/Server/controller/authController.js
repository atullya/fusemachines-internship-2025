const welcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome",
  });
};

module.exports = { welcome };
