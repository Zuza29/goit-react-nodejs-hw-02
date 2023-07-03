const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const issueToken = async (user, res) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, jwtSecret);
  user.token = token;
  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token
    }
  })
};

module.exports = issueToken;
