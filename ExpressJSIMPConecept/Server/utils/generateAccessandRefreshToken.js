const jwt = require("jsonwebtoken");
const RefereshToken = require("../models/refereshTokenSchema");

const accessAndRefreshToken = async (userId, res) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  const newRefreshToken = new RefereshToken({
    token: refreshToken,
    user: userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await newRefreshToken.save();

  res.cookie("accessToken", accessToken, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return { accessToken, refreshToken }; // ✅ must return both
};

module.exports = accessAndRefreshToken;
