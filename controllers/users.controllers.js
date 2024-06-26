const Users = require("../models/user.models");
const bcrypt = require("bcrypt");
const { createToken, verifyToken } = require("../tokens/users.tokens");

//all get user api
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = createToken(user);

    // const refreshToken = jwt.sign({
    //    username: user.email,
    // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    // Assigning refresh token in http-only cookie
    res.status(200).json({
      accessToken: token,
      // "refreshToken": refreshToken,
      userData: user,
    });
  } catch (error) {
    next(error);
  }
};

//register/ sign up user api or sign up api
exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email, password, firstName, lastName
    })
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error });
  }
};

exports.forgatePassword = async (req, res) => {
  try {
    const { email } = req.body;

  } catch (error) {
    console.error(' Error', error)
    res.status(500).json({ error })
  }
}

// delete user
exports.deleteUserById = async (req, res) => {
  try {
    const result = await Users.findByIdAndDelete(req.params);
    res.status(200).send("user deleted");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ err });
  }
};

// put/ update user
exports.putUserData = async (req, res) => {
  const { _id } = req.params;
  try {
    const userData = await Users.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({ error: null, message: "User update succesfully", userData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error, message: "Error al actualizar usuario" });
  }
};

//Particular User Data
exports.onGetUserById = async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await Users.findOne({ _id });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: error });
  }
};

exports.Me = async (req, res) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const { userData } = verifyToken(token);
    const user = await Users.findOne({ _id: userData._id });
    return res.status(200).json({ success: true, userData: user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: error });
  }
};
