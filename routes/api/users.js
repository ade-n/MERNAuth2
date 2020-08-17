const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require("../../models/User");

//@router   api/users
//@des      create user
//@access   Public

router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email address is required").isEmail(),
    body(
      "password",
      "Password is required. Password needs to be at least 6 digits long"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //see if the user exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "The user does not exist" }] });
      }

      //add gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      //update user info
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      //encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // get jsonwebtoken

      //pass payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //generate token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      req.status(500).send("Server error");
    }
  }
);

module.exports = router;
