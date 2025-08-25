"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} className="bg-blue-600 hover:bg-blue-700 text-white">
      {pending ? "Submitting..." : "Submit Feedback"}
    </Button>
  );
}

export default function FeedbackForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitFeedback, null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
      });
    }
    if (state?.errors) {
       const errorMsg = Object.values(state.errors).flat().join(', ');
        toast({
            title: "Error",
            description: errorMsg || "Failed to submit feedback.",
            variant: "destructive",
        });
    }
  }, [state, toast]);

  if (state?.message) {
      return null; // Hide form on successful submission
  }

  return (
    <Card className="my-4 bg-gray-800 border-gray-700">
        <CardHeader>
            <CardTitle className="text-white">Submit Feedback</CardTitle>
            <CardDescription className="text-gray-300">Your feedback is valuable. Please let me know what you think.</CardDescription>
        </CardHeader>
        <form action={formAction}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Name</Label>
                    <Input id="name" name="name" required className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">Email (Optional)</Label>
                    <Input id="email" name="email" type="email" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-gray-200">Feedback</Label>
                    <Textarea id="feedback" name="feedback" required className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                </div>
            </CardContent>
            <CardFooter>
                 <SubmitButton />
            </CardFooter>
        </form>
    </Card>
  );
}
