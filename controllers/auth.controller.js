const { User } = require("../models");
const config = require("../config/auth.config.json");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = (req, res) => {
  const { id, name, password } = req.body;
  User.create({
    id,
    name,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

const signin = (req, res) => {
  const { id, password } = req.body;
  User.findOne({
    where: {
      id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      user.password;
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      res.status(200).json({
        id: user.id,
        name: user.name,
        access_token: token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports = {
  signup,
  signin,
}
