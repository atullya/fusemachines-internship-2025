import express,{Request,Response} from 'express'
import { logger } from '../config/logger';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model'
import { generateToken } from '../utils/generateToken';
export const registerUser=async (req:Request,res:Response)=>{
logger.info("Registering User.....")
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
}

export const loginUser = async (req:Request,res:Response) => {
    logger.info("Logging User")
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

    const token = generateToken(findValidUser._id.toString(), res);
    res.status(200).json({
      _id: findValidUser._id,
      username: findValidUser.username,
      email: findValidUser.email,
      phoneNumber: findValidUser.phoneNumber,
      success: true,
      message: "Login successful",
      accessToken: token,
    });
}

export const logout = async (req:Request, res:Response) => {

    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });

};

export const dashboard=async(req:Request,res:Response)=>{
     const userId = req.user._id;

    const userDetails = await User.findById({ _id: userId });

    return res.status(200).json({ message: "Welcome", user: userDetails });
}
export const checkAuth = async (req:Request, res:Response) => {

    res.status(200).json(req.user);
 
};