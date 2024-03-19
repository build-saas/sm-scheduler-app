import db from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, scheduledDate } = await req.json();

    const tweet = await db.tweet.create({
      data: {
        message: message,
        scheduledDate: scheduledDate,
      }
    })

    return NextResponse.json(tweet);
  } catch (error) {
    console.log("[Tweet]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function postTweet(message: string) {
  try {
    await axios.post(
      "https://api.twitter.com/2/tweets",
      {
        text: message, // The message field should be named 'text' instead of 'message' in Twitter API v2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    console.log("Tweet posted successfully:", message);
  } catch (error) {
    console.error("Error posting tweet to Twitter:", error);
    throw new Error("Failed to post tweet to Twitter");
  }
}
