import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";
import { v2 as cloudinaryV2 } from "cloudinary";

// import fs from "fs";
// import streamifier from "streamifier";

dotenv.config();

//register controller function

export const register = async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    return res
      .status(400)
      .json({ message: "Details not found!", success: false });
  }

  try {
    const user = await User.findOne({ email });
    const file = req.file;
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with this email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(501).json({ success: false, message: error.message });
  }
};

//login controller function

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Details are missing!", success: false });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password!", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Password!", success: false });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Account does't exist with this role",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({ message: "Login successfull!", success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//logout controller function

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logout Successfully!" });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};

//update profile controller function

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        {
            resource_type: "raw", // important for PDF
            folder: "resumes",
            public_id: `${user._id}_${Date.now()}`
        },
        (error, result) => {
            if (error) return reject(error);
            resolve(result);
        }
    );
    stream.end(req.file.buffer); // send file buffer directly
});

user.profile.resume = result.secure_url;
    await user.save();

    return res.json({ success: true, user, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};