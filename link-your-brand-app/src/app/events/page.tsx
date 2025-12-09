"use client";
import { useEffect } from "react";
import generateQRCode from "../../components/QRCode";

const events = [
  {
    id: "q1",
    title: "Q4 Scaling Strategies Webinar",
    date: "Dec 10, 2025 at 10:00 AM EST",
    desc: "Advanced techniques for scaling ad spend and conversion rates before the holidays.",
  },
  {
    id: "q2",
    title: "AI in E-commerce Workshop",
    date: "Jan 15, 2026 at 2:00 PM PST",
    desc: 'Implement "set-it and forget it" AI systems for customer service and inventory.',
  },
  {
    id: "q3",
    title: "Supply Chain Optimization",
    date: "Feb 28, 2026 at 1:00 PM GMT",
    desc: "Master international logistics and lower your fulfillment costs.",
  },
  {
    id: "q4",
    title: "Scaling with TikTok Shop",
    date: "Mar 5, 2026 at 3:00 PM CST",
    desc: "How to use the fastest growing e-commerce channel for explosive growth and viral sales.",
  },
  {
    id: "q5",
    title: "Automation & Outsourcing (The Mentor System)",
    date: "Apr 20, 2026 at 1:00 PM EST",
    desc: "Hiring VAs and setting up automations to reduce your daily work to just 2 hours.",
  },
  {
    id: "q6",
    title: "Q1 Financial Review & Tax Strategy",
    date: "May 1, 2026 at 11:00 AM PST",
    desc: "Understanding P&L statements and legal tax deductions for e-commerce entrepreneurs.",
  },
];

export default function EventsPage() {
  useEffect(() => {
    events.forEach((event) => {
      const url = `/events/${event.id}/register`;
      generateQRCode(event.id, url);
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Scaling E-commerce: Upcoming Events</h1>
      <p className="text-gray-600 mb-8">Scan the QR code to register.</p>

      <div className="space-y-10">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{event.date}</p>
            <p className="mb-4">{event.desc}</p>

            <p className="text-sm text-gray-500 mb-2">Scan or click to Register</p>
            <canvas id={event.id} />
            <button
              onClick={() => (window.location.href = `/events/${event.id}/register`)}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}
