'use client';
import styles from "./dashboard.module.css";
import { useState, useEffect } from 'react';
import NavBar from "./Navbar";

type Event = {
  id: number;
  title: string;
  description: string | null;
  organizer_cognito_id: string | null;
  rsvp_count: number | null;
  location_type: "in_person" | "remote" | "hybrid";
  address: string | null;
  start_time: string | null;
  end_time: string | null;
  organizer_contact: string | null;
  tags: any;
  created_at: string;
};

async function getIdToken() {
  const res = await fetch("/api/auth/id-token", {
    method: "GET",
    credentials: "include", // important: sends cookies
  });

  const data = await res.json();
  console.log(data);
  return data;
}

export default function DashboardPage() {
  const [data, setData] = useState<Event[] | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [uuid, setID] = useState(null);
  const [date, setDate] = useState("DD/MM/YYYY");
  const [eventName, setEventName] = useState("Name of pinned event");
  const [eventAddy, setEventAddy] = useState();
  const [eventRsvps, setEventRsvps] = useState();

  useEffect(() => {
          const loadEvent = async () => {
          try {
              setID(await getIdToken());
  
              if(!uuid) return;
              const res = await fetch('/api/database/event/top/?uuid=${uuid.claims.sub}', {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  },
              });
              const json = await res.json();
              setDate(json.date)
              setData(json);
              setEvents(json);
              setEventAddy(json.address);
              setEventRsvps(json.rsvps_count);
              setEventName(json.title)
          } catch (err) {
              console.error("Failed to load pinned event:", err);
          }
          };
  
          loadEvent();
      }, [uuid]);


  return (
    <main className={styles.pageRoot}>
      <NavBar />
      <section className={styles.canvas}>
        <div className={styles.pinnedCard}>
          <div className={styles.pill}>{eventName}</div>

          <div className={styles.field}>
            <span className={styles.label}>Date:</span>
            <span className={styles.value}>{date}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Location:</span>
            <span className={styles.value}>{eventAddy}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}># Attendee’s:</span>
            <span className={styles.value}>{eventRsvps}</span>
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.linkBtn}>Postpone</button>
            <button className={styles.linkBtn}>Email Attendees</button>
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <div className={styles.filters}>
            <button className={styles.chip}>RSVP’s ↑</button>
            <button className={styles.chip}>↓ Views</button>
          </div>

          <div className={styles.chartArea}>
            <svg viewBox="0 0 280 120" preserveAspectRatio="none">
              <polyline points="10,100 60,80 110,95 160,65 210,90 270,80" className={styles.lineOne} fill="none" strokeWidth="2" />
              <polyline points="10,110 60,95 110,100 160,98 210,105 270,102" className={styles.lineTwo} fill="none" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className={styles.calendarCard}>
          <div className={styles.monthHeader}>
            <span className={styles.month}>Sept</span>
            <span className={styles.year}>2025</span>
          </div>
          <hr className={styles.rule} />
          <ul className={styles.noteList}>
            <li><span className={styles.dot}></span> 9/20 - Pumpkin Party</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
