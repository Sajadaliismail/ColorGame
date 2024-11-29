// /app/api/highscore/route.ts
import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// Define the path to the highscore file
const highscorePath = path.join(process.cwd(), "highscore.json");

// Define the maximum number of high scores to keep
const MAX_HIGH_SCORES = 20;

interface scores {
  name: string;
  score: number;
}

// Function to read high scores from the file
const readHighScores = async () => {
  try {
    const data = await fs.readFile(highscorePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);

    return []; // If the file doesn't exist or is empty, return an empty array
  }
};

// GET method to fetch the top high scores
export async function GET(req: NextRequest) {
  try {
    await req.json();
    const highScores = await readHighScores(); // Get existing high scores
    return NextResponse.json(highScores, { status: 200 });
  } catch (error) {
    console.error("Error reading high score data:", error);
    return NextResponse.json(
      { error: "Error reading high score data" },
      { status: 500 }
    );
  }
}

// POST method to save the new high score
export async function POST(req: NextRequest) {
  try {
    const newHighScore = await req.json(); // Get the new high score from the request body

    // Validate the highscore input
    if (!newHighScore || typeof newHighScore.score !== "number") {
      return NextResponse.json(
        { error: "Invalid highscore format" },
        { status: 400 }
      );
    }

    // Read the existing high scores
    const highScores = await readHighScores();

    // Add the new score to the list
    highScores.push(newHighScore);

    // Sort the scores in descending order and keep only the top 10
    highScores.sort((a: scores, b: scores) => b.score - a.score);
    const topHighScores = highScores.slice(0, MAX_HIGH_SCORES);

    // Write the updated high scores to the file
    await fs.writeFile(
      highscorePath,
      JSON.stringify(topHighScores, null, 2),
      "utf8"
    );

    return NextResponse.json(
      { message: "High score saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving high score data:", error);
    return NextResponse.json(
      { error: "Error saving high score data" },
      { status: 500 }
    );
  }
}
