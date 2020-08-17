const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@router   api/profiles
//@des      get all profiles
//@access   Public

router.get("/", async (req, res) => {
  try {
    const allProfiles = await Profile.find().populate("user", [
      "name",
      "avatar",
    ]);
    res.json(allProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server not working");
  }
});

//@router   api/profiles
//@des      Create profile or update profile
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      body("status", "Status is required").not().isEmpty(),
      body("skills", "Skills are required").not().isEmpty(),
      body("bio", "Bio max 500 characters").isLength({ max: 500 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      status,
      skills,
      company,
      location,
      website,
      bio,
      youtube,
      facebook,
      instagram,
      linkedin,
      twitter,
    } = req.body;

    const fieldInput = {
      user: req.user.id,
      status,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => " " + skill.trim()),
      company,
      location,
      website,
      bio,
      social: { youtube, facebook, instagram, linkedin, twitter },
    };

    try {
      //see if the profile exists already
      let profile = await Profile.findOne({ user: req.user.id });

      //if the profile exist already  update it
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          //DE UNDE $SET??? if you avoid the $set is not updating whyyyyy????
          { $set: fieldInput },
          { new: true }
        );
        return res.json(profile);
      }

      //if the profile doesn't exit create profile
      //create new profile
      profile = new Profile(fieldInput);
      //save the new profile
      await profile.save();

      //get new profile data
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@router   api/profiles
//@des      test router
//@access   Private

router.get("/me", auth, async (req, res) => {
  try {
    //see if there is a profile
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user " });
    }
    //get profile data
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@router   api/profiles/user/:user_id
//@des      Get profile by id
//@access   Public

router.get("/user/:user_id", async (req, res) => {
  try {
    //find the profile
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    //if the user doesn't have a s show error
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    //show the profile data
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile nor found" });
    }
    res.status(500).send("Server error");
  }
});

//@router   api/profiles/education
//@des      Create education or update education
//@access   Private

router.put(
  "/education",
  [
    auth,
    [
      body("school", "School is required").not().isEmpty(),
      body("degree", "Degree is required").not().isEmpty(),
      body("fieldofstudy", "Field of Study is required").not().isEmpty(),
      body("from", "From is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, to, from, current } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      to,
      from,
      current,
    };

    try {
      //see if the profile exists already
      let profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@router    Delete api/profiles/education/:edu_id
//@desc      Delate profile user and posts
//@access    Private
router.delete("/education/:id/:edu_id", auth, async (req, res) => {
  try {
    //find the profile
    const profile = await Profile.findById(req.params.id);

    //get the education
    const education = profile.education.find(
      (edu) => edu.id === req.params.edu_id
    );

    //see if the comment doesnt belong to the user show error
    if (!education) {
      return res.status(404).json({ msg: "Education does not exist" });
    }

    //get the removed index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@router   api/profiles/experience
//@des      Create experience or update experience
//@access   Private

router.put(
  "/experience",
  [
    auth,
    [
      body("title", "Title is required").not().isEmpty(),
      body("company", "Company is required").not().isEmpty(),
      body("from", "From is required").not().isEmpty(),
      body("description", "250max letters").isLength({ max: 250 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { title, company, to, from, current, description } = req.body;

    const newExperience = {
      title,
      company,
      to,
      from,
      current,
      description,
    };

    try {
      //see if the profile exists already
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@router    Delete api/profiles/experience/:id/:edu_id
//@desc      Delate profile user and posts
//@access    Private
router.delete("/experience/:id/:exp_id", auth, async (req, res) => {
  try {
    //find the profile
    const profile = await Profile.findById(req.params.id);

    //get the experience
    const experience = profile.experience.find(
      (exp) => exp.id === req.params.exp_id
    );

    //see if the comment doesnt belong to the user show error
    if (!experience) {
      return res.status(404).json({ msg: "Experience does not exist" });
    }

    //get the removed index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@router    Delete api/profiles
//@desc      Delate profile user and posts
//@access    Private

router.delete("/", auth, async (req, res) => {
  try {
    //delete posts
    await Post.deleteMany({ user: req.user.id });

    //delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //delete user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User was deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

//@router    Delete api/profile/experience/:edu_id
//@desc      Delate profile user and posts
//@access    Private
// router.delete("/experience/:exp_id", auth, async (req, res) => {
//   try {
//     //find the profile
//     const profile = await Profile.findOne({ user: req.user.id });

//     //get the removed index
//     const removeIndex = profile.experience
//       .map((item) => item.id)
//       .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex, 1);

//     await profile.save();
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });
