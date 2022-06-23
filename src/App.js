import "./App.css";
import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [formTask, setForm] = useState({
    task: "",
    status: false,
  });

  const resetInput = () => {
    setForm({
      task: "",
      status: false,
    });
  };

  const eventChange = (e) => {
    console.log(e.target.value);
    setForm({
      ...formTask,
      task: e.target.value,
      status: false,
    });
  };

  const eventSubmit = (e) => {
    e.preventDefault();
    if (formTask.index || formTask.index === 0) {
      //Update Task
      const newTask = taskList.map((e, i) => {
        if (i === formTask.index) {
          return formTask;
        } else {
          return e;
        }
      });
      setTaskList(newTask);
    } else {
      //Input Task
      setTaskList([...taskList, formTask]);
    }
    resetInput();
  };

  // Checking
  const eventCheck = (index) => {
    const newTask = taskList.map((e, i) => {
      if (i === index) {
        return {
          task: e.task,
          status: true,
        };
      } else {
        return e;
      }
    });
    setTaskList(newTask);
  };

  // Delete Task
  const eventDelete = (index) => {
    const newTask = taskList.filter((e, i) => {
      if (i != index) {
        return e;
      }
    });
    setTaskList(newTask);
  };

  // Edit Task
  const eventEdit = (index) => {
    const detailTask = {
      index,
      ...taskList[index],
    };
    setForm(detailTask);
  };

  return (
    <div>
      <div className="card-task">
        {/* Form Input Task */}
        <form method="post" onSubmit={eventSubmit}>
          <h1>TodoList App</h1>
          <div className="input-box">
            <input type="text" className="input" name="task" value={formTask.task} onChange={eventChange} placeholder="Task..." />
            <button className="button" type="submit">
              Add Task
            </button>
          </div>
        </form>

        {/* Result */}
        <div className="content-task">
          <h3>Tasks Today</h3>
          {taskList.map((e, i) => {
            if (e.status === false) {
              return (
                <div key={i} className="card">
                  <div className="check-action">
                    <input type="checkbox" checked={e.status ? true : false} onChange={() => eventCheck(i)} />
                  </div>
                  <div className="task">{e.task}</div>
                  <div className="button-action">
                    <button onClick={() => eventEdit(i)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => eventDelete(i)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Tasks Completed */}
        <div className="content-task completed">
          <h3>Tasks Completed</h3>
          {taskList.map((e, i) => {
            if (e.status === true) {
              return (
                <div key={i} className="card">
                  <div className="check-action">
                    <input type="checkbox" checked={e.status ? true : false} onChange={() => eventCheck(i)} />
                  </div>
                  <div className="task">{e.task}</div>
                  <div className="button-action">
                    <button onClick={() => eventDelete(i)} className="btn-delete del-done">
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
