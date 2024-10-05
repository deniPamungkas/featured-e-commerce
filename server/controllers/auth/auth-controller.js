import userSchema from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "You must enter an email address." });
    }

    if (!username) {
      return res.status(400).json({ error: "You must enter your username." });
    }

    if (!password) {
      return res.status(400).json({ error: "You must enter a password." });
    }

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: `That email address is already in use.`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const registeredUser = await newUser.save();

    const { jwtkey } = keys;

    const payload = {
      id: registeredUser.id,
    };
    const token = jwt.sign(payload, jwtkey.secret);

    return res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "success to register account",
        user: {
          _id: registeredUser.id,
          username: registeredUser.username,
          email: registeredUser.email,
          role: registeredUser.role,
        },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ error: `some error ocured, please try again!` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ error: "you must enter an email" });
    }

    if (!password) {
      return res.status(404).json({ error: "you must enter a password" });
    }

    const user =
      (await userSchema.findOne({ username: email })) ||
      (await userSchema.findOne({ email: email }));

    if (!user) {
      return res.status(404).json({ error: "username not found" });
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return res.status(404).json({ error: "wrong password" });
    }

    const { jwtkey } = keys;

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, jwtkey.secret);

    if (!token) {
      throw new Error();
    }

    return res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "success to login",
        user: {
          _id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
};
