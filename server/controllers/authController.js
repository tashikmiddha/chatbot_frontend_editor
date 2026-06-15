const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists)
      return res
        .status(400)
        .json({ message: "User exists" });

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    user,
  });
};

module.exports = {
  register,
  login,
  getMe,
};