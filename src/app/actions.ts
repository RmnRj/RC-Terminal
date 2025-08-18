
"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  feedback: z.string().min(10, "Feedback must be at least 10 characters.").max(4000),
});

export async function submitFeedback(prevState: any, formData: FormData) {
  const validatedFields = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    feedback: formData.get("feedback"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, feedback } = validatedFields.data;

  const newFeedback = {
    name,
    email: email || "Not provided",
    feedback,
    timestamp: new Date().toISOString(),
  };

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'feedback.json');
    let feedbackData = [];
    try {
        const fileContents = await fs.readFile(filePath, 'utf-8');
        feedbackData = JSON.parse(fileContents);
    } catch (error) {
        // File might not exist yet, which is fine.
    }

    feedbackData.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(feedbackData, null, 2));

    return { message: "Feedback submitted successfully! Thank you." };

  } catch (error) {
    console.error("Error saving feedback:", error);
    return {
        errors: { _form: ["An unexpected error occurred while saving your feedback."] }
    }
  }
}
