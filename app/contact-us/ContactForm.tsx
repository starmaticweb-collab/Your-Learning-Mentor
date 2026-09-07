"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      toast.error("One of your fields is too long.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });
    setSubmitting(false);

    if (error) {
      toast.error("Couldn't send your message. Please try again.");
      return;
    }

    setSubmitted(true);
    form.reset();
    toast.success("Message sent! We'll get back to you with available slots.");

    // Trigger instant email notification to admin in the background
    fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "counselling",
        name,
        email,
        message,
      }),
    }).catch((err) => console.error("Counselling email alert error:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Student or parent's name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Student's class/year, board, and what you'd like to discuss (stream selection, college shortlisting, study abroad, etc.)"
          rows={6}
          required
        />
      </div>
      <Button type="submit" className="rounded-full px-8" disabled={submitting || submitted}>
        {submitted ? "Sent" : submitting ? "Sending..." : "Request a Session"}
      </Button>
    </form>
  );
}
