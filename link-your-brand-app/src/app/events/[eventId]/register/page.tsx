"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RegisterPage() {
  const { eventId } = useParams();
  const [message, setMessage] = useState("Registering...");

  useEffect(() => {
    if (!eventId) {
      setMessage("Invalid event ID.");
      return;
    }

    async function register() {
      try {
        const token = localStorage.getItem("idToken"); // Cognito ID token
        const res = await fetch(`/api/events/${eventId}/register`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setMessage(data.message || "Registration complete");
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong. Please try again.");
      }
    }

    register();
  }, [eventId]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Event Registration</h1>
      <p className="text-gray-700">{message}</p>
    </div>
  );
}
