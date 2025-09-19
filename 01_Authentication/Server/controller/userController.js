import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/accessToken.js";

export const registerUser = async (req, res) => {
  try {
    // console.log("hello testin..");
    const { username, email, password, phoneNumber } = req.body;
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with that email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const insertNewUser = await registerUser.save();
    if (insertNewUser) {
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        user: insertNewUser,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Registration Failed!!",
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      });
    }

    const findValidUser = await User.findOne({ email });
    // console.log(findValidUser);

    if (!findValidUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const checkValidPassword = await bcrypt.compare(
      password,
      findValidUser.password
    );

    if (!checkValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //now generating jwt token..

    const token = generateToken(findValidUser._id, res);
    res.status(200).json({
      _id: findValidUser._id,
      username: findValidUser.username,
      email: findValidUser.email,
      phoneNumber: findValidUser.phoneNumber,
      success: true,
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
