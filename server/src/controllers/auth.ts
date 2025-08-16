import { Request, Response } from "express";
import User from "../models/UserSchema.ts";
import Note, { NoteInterface } from "../models/NoteSchema.ts";

const validator = require("validator");
const bcrypt = require("bcryptjs");

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check for valid email first
    if (!validator.isEmail(email)) {
      res.status(400).send({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ message: "Email does not exist" });
    } else {
      const areEqual = await bcrypt.compare(password, user.password);
      if (areEqual) {
        //const userData = { email: user.email, message: "Login successful" };
        res.send(user);
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check for valid email
    if (!validator.isEmail(email)) {
      res.status(400).send({ message: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.send({ message: "User created", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.send("email does not exist");
    }

    //send a reset password email to user, using nodemailer library
  });

  res.send("email reset form has been sent");
  // ** TO DO ** //
};

export { login, register, forgotPassword };
