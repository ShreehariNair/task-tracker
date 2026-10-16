import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState(0);

  console.log(tasks);

  function handleFilter(value) {
    if (value >= 0 && value <= 2) {
      setFilter(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let taskItem = { name: task, isCompleted: false };

    if (task != "" && task != " ") {
      setTasks((tasks) => [...tasks, taskItem]);
      setTask("");
    }
  }

  function handleDelete(e, index) {
    e.preventDefault();
    setTasks((tasks) => tasks.filter((task, i) => i != index));
  }

  function handleStatus(e, index) {
    setTasks((tasks) =>
      tasks.map((task, i) =>
        index === i ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  return (
    <>
      <header>
        <i class="ph-fill ph-check-square"></i> Task Tracker
      </header>
      <div className="container">
        <section className="add-task">
          <h3>Add a New Task</h3>
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="task-input"
              placeholder="Enter a task..."
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button className="add-btn">Add</button>
          </form>
        </section>

        <section className="view-tasks">
          <h3>Tasks</h3>
          <div className="stats">
            <span className="total-tasks">
              <p>Total Tasks</p>
              <p className="total">{tasks.length}</p>
            </span>
            <span className="completed-tasks">
              <p>Completed</p>
              <p className="completed">
                {tasks.filter((task) => task.isCompleted).length}
              </p>
            </span>
            <span className="pending-tasks">
              <p>Pending</p>
              <p className="pending">
                {tasks.filter((task) => !task.isCompleted).length}
              </p>
            </span>
          </div>
          <div className="filter">
            <p>Filter by:</p>
            <button
              className={`${filter == 0 ? "selected all-btn" : "all-btn"}`}
              onClick={() => handleFilter(0)}
            >
              All
            </button>
            <button
              className={`${filter == 1 ? "selected pending-btn" : "pending-btn"}`}
              onClick={() => handleFilter(1)}
            >
              Pending
            </button>
            <button
              className={`${filter == 2 ? "selected completed-btn" : "completed-btn"}`}
              onClick={() => handleFilter(2)}
            >
              Completed
            </button>
          </div>
          {/* Renders only when All is selected */}
          {filter == 0
            ? tasks.map((task, index) => (
                <div className="task" key={index}>
                  <div className="task-detail">
                    <input
                      type="checkbox"
                      className="task-check"
                      checked={task.isCompleted}
                      value={task.isCompleted}
                      onChange={(e) => handleStatus(e, index)}
                    />
                    <p>{task.name}</p>
                  </div>
                  <span
                    className={
                      task.isCompleted ? "completed-tag" : "pending-tag"
                    }
                  >
                    {task.isCompleted ? "Completed" : "Pending"}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, index)}
                  >
                    <i class="ph ph-trash"></i>
                  </button>
                </div>
              ))
            : ""}
          {/* Renders only when pending or completed is selected */}
          {filter === 1 || filter === 2
            ? tasks
                .filter((task) => task.isCompleted == filter - 1)
                .map((task, index) => (
                  <div className="task" key={index}>
                    <div className="task-detail">
                      <input
                        type="checkbox"
                        className="task-check"
                        checked={task.isCompleted}
                        value={task.isCompleted}
                        onChange={(e) => handleStatus(e, index)}
                      />
                      <p>{task.name}</p>
                    </div>
                    <span
                      className={
                        task.isCompleted ? "completed-tag" : "pending-tag"
                      }
                    >
                      {task.isCompleted ? "Completed" : "Pending"}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={(e) => handleDelete(e, index)}
                    >
                      <i class="ph ph-trash"></i>
                    </button>
                  </div>
                ))
            : ""}
        </section>
      </div>
    </>
  );
}

export default App;
