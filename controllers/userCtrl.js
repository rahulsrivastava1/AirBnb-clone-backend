import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModels from "../models/userModel.js";
import accomodationModels from "../models/accomodationModel.js";

const secret = "test";

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password === confirmPassword) {
      const oldUser = await userModels.findOne({ email });
      if (oldUser)
        return res.status(400).json({ message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await userModels.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ result });
    } else {
      res.status(500).json({ message: "password doesn't match" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModels.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret
    );
    res.send({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgot = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;
  try {
    if (newPassword === confirmNewPassword) {
      const existingUser = await userModels.findOne({ email });
      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exists" });
      const newhashedPassword = await bcrypt.hash(newPassword, 12);
      const result = await userModels.findOneAndUpdate(
        { email: email },
        {
          password: newhashedPassword,
        }
      );
      res.status(201).json({ result });
    } else {
      res.status(500).json({ message: "password doesn't match" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const addPost = async (req, res) => {
  const { type, name, dates, description, address, mobile, photo } = req.body;
  try {
    const result = await accomodationModels.create({
      type,
      name,
      dates,
      description,
      address,
      mobile,
      photo,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const posts = async (req, res) => {
  try {
    const posts = await accomodationModels.find();
    if (posts.length === 0) {
      return res.status(400).json({ msg: "No data" });
    }
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

export const specificposts = async (req, res) => {
  const { type } = req.body;
  try {
    const posts = await accomodationModels.find({ type: type });
    if (posts.length === 0) {
      return res.status(400).json({ msg: "No data" });
    }
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};
