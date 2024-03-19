import AddTweet from "@/components/twitter-post-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      <h1 className="text-2xl">Schedule Twitter Posts</h1>
      <AddTweet />
    </div>
  );
}
