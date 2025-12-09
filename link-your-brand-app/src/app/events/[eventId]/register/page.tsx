"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function RegisterPage() {
  const { eventId } = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventId) {
      setMessage("Invalid event ID");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "You’re registered for this event!");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Event Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="border rounded px-3 py-2 w-full max-w-sm mx-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
