function About() {
  const steps = [
    "Open “Add Task”, fill in the title, priority, category and due date, then save.",
    "The form is validated on the client side; errors are shown beside each field.",
    "On “My Tasks”, search by text and filter by status, priority or category.",
    "Tick the checkbox to complete a task, use Edit to change it, or Delete to remove it.",
    "The Dashboard summarises totals, overdue tasks, progress and what is due today.",
    "All data is saved automatically in the browser (localStorage).",
  ];

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>About</h1>
          <p className="muted">Daily Task Manager · FSWD Task 2 (Group 2, Statement 12)</p>
        </div>
      </div>

      <div className="card">
        <h2>How it works</h2>
        <ol className="steps">
          {steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </div>

      <div className="card">
        <h2>Student details</h2>
        <dl className="details">
          <dt>Name</dt><dd>Shaktivel T K</dd>
          <dt>Roll number</dt><dd>RA2411003050153</dd>
          <dt>Class</dt><dd>III Year (5th Sem) B.Tech CSE · Section C</dd>
          <dt>Institution</dt><dd>SRM IST, Tiruchirappalli</dd>
        </dl>
      </div>
    </section>
  );
}

export default About;
