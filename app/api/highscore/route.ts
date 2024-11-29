import dbConnect from "@/lib/dbConnect";
import Score from "@/models/score";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, score } = await req.json();
    if (score > 50)
      return new Response(JSON.stringify({ success: false, error: "Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    if (!username || typeof score !== "number") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    await Score.create({ username, score });

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ success: false, error: "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  await dbConnect();

  try {
    // Fetch top 20 scores, sorted by score (descending) and date (most recent first)
    const topScores = await Score.aggregate([
      // Optionally filter documents (currently matching all)
      { $match: {} },

      // Sort by score in descending order, then by date in descending order
      { $sort: { score: -1, date: -1 } },

      // Limit to the top 20 documents
      { $limit: 20 },

      // Select specific fields to return
      {
        $project: {
          username: 1, // Include username
          score: 1, // Include score
          date: 1, // Include date
          _id: 0, // Exclude the _id field (optional)
        },
      },
    ]);

    // .sort({ score: -1, date: -1 }) // Sort by score descending, then by date descending
    // .limit(20); // Limit to top 20

    return new Response(JSON.stringify({ success: true, data: topScores }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ success: false, error: "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
