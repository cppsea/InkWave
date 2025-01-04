import { Request, Response } from "express";
import User from "../models/UserSchema.ts";
import Note, { NoteInterface } from "../models/NoteSchema.ts";

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
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send("email does not exist");
    }

    bcrypt.compare(password, user.password).then((areEqual: Boolean) => {
      if (areEqual) {
        const userString = user.email + ", " + user.password;
        return res.send("login successful\n" + userString);
      }
    });
    //catch block for errors with bcrypt
  });

  // ** TO DO ** //
};

const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  //handle incorrect email format

  bcrypt.hash(password, 12).then((hashedPassword: String) => {
    const user = new User({
      email: email,
      password: hashedPassword,
    });

    return user.save();
  });
  //catch block for errors with hashing

  res.send("user created");

  // ** TO DO ** //
};

const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send("email does not exist");
    }

    //send a reset password email to user, using nodemailer library
  });

  res.send("email reset form has been sent");
  // ** TO DO ** //
};

export { login, register, forgotPassword };
