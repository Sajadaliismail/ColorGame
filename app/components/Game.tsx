"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "./Grid";
import { HighScores } from "./Highscores";
import { generateColors } from "../utils/colorUtils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Eye, Award, Zap, RotateCcw } from "lucide-react";

interface HighScore {
  username: string;
  score: number;
  date: number;
}

export const Game: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [mainColor, setMainColor] = useState<string>("");
  const [oddColor, setOddColor] = useState<string>("");
  const [oddPosition, setOddPosition] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [showHighScores, setShowHighScores] = useState<boolean>(false);
  const [hintCount, setHintCount] = useState<number>(1);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    startNewLevel();
    loadHighScores();
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, gameWon]);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    startNewLevel();
  }, [level]);

  const fetchHighScore = async () => {
    const response = await fetch("/api/highscore");
    const data = await response.json();
    setHighScores(data.data);
  };

  const saveHighScore = async (name: string, score: number) => {
    const scoreData = { username: name, score };
    const response = await fetch("/api/highscore", {
      method: "POST",
      body: JSON.stringify(scoreData),
    });
    const data = await response.json();
    setHighScores(data);
  };
  const loadHighScores = async () => {
    await fetchHighScore();
  };

  const startNewLevel = () => {
    if (gameOver || gameWon) return;
    const { mainColor, oddColor } = generateColors(level);
    setMainColor(mainColor);
    setOddColor(oddColor);
    setOddPosition(Math.floor(Math.random() * 36));
    setTimeLeft(Math.max(10, 30 - Math.floor(level / 5)));
    setShowHint(false);
  };

  const handleSquareClick = (index: number) => {
    if (index === oddPosition) {
      const newScore = score + 1;
      if (
        newScore === 5 ||
        newScore === 10 ||
        newScore === 20 ||
        newScore === 30 ||
        newScore === 40 ||
        newScore === 45
      )
        setHintCount((prev) => prev + 1);
      setScore(newScore);
      if (level === 50) {
        setGameWon(true);
      } else {
        setLevel((prevLevel) => prevLevel + 1);
        startNewLevel();
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setHintCount(1);
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setShowHighScores(false);
    startNewLevel();
  };

  const toggleHint = () => {
    if (hintCount > 0) {
      setShowHint(!showHint);
      setHintCount((prev) => prev - 1);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName) {
      await saveHighScore(playerName, score);
      await loadHighScores();
      setShowHighScores(true);
    }
  };

  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-hite p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Color Challenge
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">
              Level: {level}/50
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">
              Score: {score}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Time Left</span>
            <span className="text-sm font-medium text-gray-700">
              {timeLeft}s
            </span>
          </div>
          <Progress value={(timeLeft / 30) * 100} className="w-full" />
        </div>
        {gameOver || gameWon ? (
          showHighScores ? (
            <>
              <HighScores scores={highScores} />
              {(showHighScores || (!gameOver && !gameWon)) && (
                <Button onClick={restartGame} className="mt-4">
                  Restart
                </Button>
              )}
            </>
          ) : (
            <div className="text-center space-y-4 ">
              <h2 className="text-2xl font-bold text-gray-800">
                {gameWon ? "Congratulations! You Won!" : "Game Over!"}
              </h2>
              <p className="text-xl text-gray-700">Your final score: {score}</p>
              {score > 0 && (
                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" variant={"outline"} className="w-full">
                    Submit Score
                  </Button>
                </form>
              )}
              <Button
                onClick={restartGame}
                variant="outline"
                className="flex-1 ml-2"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          )
        ) : (
          <>
            <Grid
              size={6}
              mainColor={mainColor}
              oddColor={oddColor}
              oddPosition={oddPosition}
              onSquareClick={handleSquareClick}
              showHint={showHint}
            />
            <div className="flex justify-between">
              <Button
                onClick={toggleHint}
                disabled={hintCount === 0}
                variant="outline"
                className="flex-1 mr-2"
              >
                {" "}
                {hintCount}
                <Zap className="w-4 h-4 mr-2" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button
                onClick={restartGame}
                variant="outline"
                className="flex-1 ml-2"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
