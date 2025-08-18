"use server";

import { z } from "zod";

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

  // In a real application, you would save this to a database or a file.
  // For this example, we'll just log it to the server console.
  console.log("--- New Feedback Received ---");
  console.log("Timestamp:", new Date().toISOString());
  console.log("Name:", name);
  console.log("Email:", email || "Not provided");
  console.log("Feedback:", feedback);
  console.log("----------------------------");

  return { message: "Feedback submitted successfully! Thank you." };
}
