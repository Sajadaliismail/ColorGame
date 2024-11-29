import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HighScore {
  username: string;
  score: number;
  date: number;
}

interface HighScoresProps {
  scores: HighScore[];
}

export const HighScores: React.FC<HighScoresProps> = ({ scores }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        High Scores
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((score, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{score.username}</TableCell>
              <TableCell className="text-right">{score.score}</TableCell>
              <TableCell className="text-right text-nowrap">
                {new Date(score.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
