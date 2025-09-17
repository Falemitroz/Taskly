const { sign } = require("jsonwebtoken");

const createAccessToken = (userId) =>
  sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

const sendTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
};

module.exports = { createAccessToken, sendTokenCookie };
