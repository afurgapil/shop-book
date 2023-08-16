const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth");

//add ingredient
router.post("/add/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const ingredientData = req.body;

    const user = await User.findById(userId);
    user.ingredients.push(ingredientData);
    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add ingredient." });
  }
});
//set ingredient
router.put("/set/:id", authMiddleware, async (req, res) => {
  try {
    const { id, updatedIngredients } = req.body;
    const userId = id;
    const user = await User.findByIdAndUpdate(userId, {
      ingredients: updatedIngredients,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Can not updated" });
  }
});
// delete ingredient
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const ingredientIdToDelete = req.body.ingredientId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedIngredients = user.ingredients.filter(
      (ingredient) => ingredient._id.toString() !== ingredientIdToDelete
    );
    const updatedIngredientss = user.ingredients.filter(
      (ingredient) => ingredient._id.toString() === ingredientIdToDelete
    );
    user.ingredients = updatedIngredients;
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete ingredient." });
  }
});
module.exports = router;
