const User = require("../models/userModel");

async function handleLogin(req, res) {
  // Implement Login JWT
}

async function handleLike(req, res) {
  const { uid, songId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { $addToSet: { likedSongs: songId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { handleLogin, handleLike };
