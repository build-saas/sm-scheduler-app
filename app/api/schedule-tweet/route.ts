import db  from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentTimestamp = new Date();
    
    // Find tweets scheduled for the current timestamp or earlier
    const tweets = await db.tweet.findMany({
      where: {
        scheduledDate: {
          lte: currentTimestamp,
        },
      },
    });

    for (const tweet of tweets) {
      await postTweet(tweet.message);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error posting tweets to Twitter:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
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
