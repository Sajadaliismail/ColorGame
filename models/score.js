import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Score || mongoose.model("Score", ScoreSchema);
