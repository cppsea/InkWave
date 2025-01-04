import { Request, Response } from "express";
import User, { UserInterface } from "../models/UserSchema.ts";

const postSignup = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  //handle incorrect email format

  // ** TO DO ** //
};

const postLogin = async (req: Request, res: Response) => {
  // ** TO DO ** //
};
