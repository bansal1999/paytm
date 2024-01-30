const express = require("express");

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupbody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

router.post("signup", async (req, res) => {
  const { success } = signupbody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect input",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  //   Create a new Account
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinbody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
  }

  res.status(411).json({
    message: "Eoor while loggin in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
