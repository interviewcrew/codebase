import { inngest } from "@/inngest/client";

export const examplePostPublished = inngest.createFunction(
  { id: "posts/published" },
  { event: "posts/published" },
  async ({ event, step }) => {
    await step.run("log-published", async () => {
      console.log(`Post published: ${event.data.postId}`);
    });

    return { success: true, postId: event.data.postId };
  }
);
