import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existing = await userModel.findOne({ email: email });
    if (existing)
      return res
        .status(409)
        .json({ error: "Email already in use", success: "false" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();
    // const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      user: userObj,
      message: "Registerd successfully",
      success: true,
    });
  } catch (err) {
    console.error("Register error:", err);
    // handle duplicate key in case race condition
    if (err.code === 11000)
      return res.status(409).json({ error: "Email already in use" });
    res.status(500).json({ error: "Server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });

    // const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ user: userObj });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default { registerController, loginController };
