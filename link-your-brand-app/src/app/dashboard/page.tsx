import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.pageRoot}>
      <section className={styles.canvas}>
        <div className={styles.pinnedCard}>
          <div className={styles.pill}>Name of pinned event</div>

          <div className={styles.field}>
            <span className={styles.label}>Date:</span>
            <span className={styles.value}>DD/MM/YYYY</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Location:</span>
            <span className={styles.value}></span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}># Attendee’s:</span>
            <span className={styles.value}></span>
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
