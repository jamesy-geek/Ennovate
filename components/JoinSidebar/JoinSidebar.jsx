import styles from "./JoinSidebar.module.css";

const STEPS = [
  { id: "01", title: "We read every application.", body: "Not a filter algorithm. Actual people from the core team review what you write." },
  { id: "02", title: "You hear back within a week.", body: "A welcome email with onboarding details, or honest feedback if the timing isn't right." },
  { id: "03", title: "First session is a build sprint.", body: "No slides, no orientation. You show up and start working on something real." },
  { id: "04", title: "You pick your track.", body: "Robotics, software, hardware, or cross-disciplinary. Tracks are flexible." },
];

export default function JoinSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.heading}>// what happens after</h3>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.id} className={styles.step}>
              <span className={styles.stepId}>{step.id}</span>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <h3 className={styles.heading}>// what we look for</h3>
        <p className={styles.lookForBody}>
          Not grades. Not a portfolio. We want people who get uncomfortable when they're not building something. If you've ever stayed up past 2am because a project wasn't working — you're exactly the right kind of person.
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>7</span>
          <span className={styles.statLabel}>Days to hear back</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>3</span>
          <span className={styles.statLabel}>Years running</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>40+</span>
          <span className={styles.statLabel}>Active members</span>
        </div>
      </div>
    </div>
  );
}
