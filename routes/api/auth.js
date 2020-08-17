const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");

//@router   api/auth
//@des      test router
//@access   Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@router   api/auth
//@des      authenticate user and get token
//@access   Public

router.post(
  "/",
  [
    body("email", "Email is required").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //pass in the information
    const { email, password } = req.body;

    try {
      //see if the user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "The user does not exist" }] });
      }

      //if the user exists try to match the email and password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //if it password matches get the jsonwebtoken

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
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
