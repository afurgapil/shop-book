// routes/userRouter.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userRouter = express.Router();

// Kullanıcı kaydı
userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kullanıcı girişi
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Kullanıcı bulunamadı." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Hatalı şifre." });
    }

    const token = jwt.sign({ userId: user._id }, "gizliAnahtar");
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update bought
userRouter.get("/get/ingredients/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.ingredients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user's ingredients" });
  }
});

module.exports = userRouter;
