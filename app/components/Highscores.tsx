import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

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
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-gray-800 p-4">
          High Scores
        </h2>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right w-[80px]">Score</TableHead>
                <TableHead className="text-right w-[100px]">Date</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-72">
            <Table>
              <TableBody>
                {scores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium w-[60px]">
                      {index + 1}
                    </TableCell>
                    <TableCell>{score.username}</TableCell>
                    <TableCell className="text-right w-[80px]">
                      {score.score}
                    </TableCell>
                    <TableCell className="text-right w-[100px] whitespace-nowrap">
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
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
