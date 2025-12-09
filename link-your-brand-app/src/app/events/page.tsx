'use client';

import { useRouter } from 'next/navigation';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

const placeholderEvents: Event[] = [
  {
    id: 1,
    title: 'Demo Night',
    date: '12/09/2025',
    time: '7:00 PM',
    location: 'Empire State Building LinkedIn Office',
    description: 'CTP students presenting their projects.',
  },
  {
    id: 2,
    title: 'Pumpkin Party',
    date: '10/31/2025',
    time: '6:00 PM',
    location: 'Downtown Community Center',
    description: 'Costumes, snacks, and networking.',
  },
];

const STORAGE_KEY = 'eventRegistrations';

export default function EventsPage() {
  const router = useRouter();

  const handleRegister = (event: Event) => {
    // Increment registration count in localStorage
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const counts: Record<number, number> = stored ? JSON.parse(stored) : {};
      counts[event.id] = (counts[event.id] || 0) + 1;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (e) {
      console.error('Failed to update registrations', e);
    }

    // Go to dashboard for this event
    router.push(`/dashboard?eventId=${event.id}&registered=1`);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Events</h1>

      <div className="space-y-4">
        {placeholderEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">
                {event.date} • {event.time}
              </p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="mt-2 text-sm">{event.description}</p>
            </div>

            <button
              onClick={() => handleRegister(event)}
              className="self-start md:self-auto px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}