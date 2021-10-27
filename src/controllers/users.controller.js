const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

const { validationResult, body } = require("express-validator");

router.post(
  "/",

  body("first_name")
    .isLength({ min: 2 })
    .withMessage("First Name Should be more that two characters"),

  body("last_name")
    .isLength({ min: 2 })
    .withMessage("Last Name Should be more that two characters"),

  body("email").isEmail().withMessage("Email Seems Incorrect"),

  body("age").custom((val) => {
    if (val < 100 && val > 1) return true;
    else throw new Error("Age should be between 1 to 100");
  }),

  body("gender").custom((val) => {
    val = val.toLowerCase();

    if (val === "male" || val === "female" || val === "others") return true;
    else throw new Error("Gender is not correct");
  }),

  body("pincode").isLength({ min: 6, max: 6 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      return res.status(201).json({ data: user });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);

// Getting the all users data
router.get("/", async (req, res) => {
  try {
    const user = await User.find({}).lean().exec();
    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// Deleting the users
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean();
    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
