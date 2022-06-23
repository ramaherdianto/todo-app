import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [form, setForm] = useState({
    todo: "",
    status: false,
  });

  const resetInput = () => {
    setForm({
      todo: "",
      status: false,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      todo: e.target.value,
      status: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.index || form.index === 0) {
      //Update
      const newTodo = todoList.map((e, i) => {
        if (i === form.index) {
          return form;
        } else {
          return e;
        }
      });
      setTodoList(newTodo);
    } else {
      //insert
      setTodoList([...todoList, form]);
    }
    resetInput();
  };

  const handleCheck = (index) => {
    const newTodo = todoList.map((e, i) => {
      if (i === index) {
        return {
          todo: e.todo,
          status: true,
        };
      } else {
        return e;
      }
    });
    setTodoList(newTodo);
  };

  const handleDelete = (index) => {
    const newTodo = todoList.filter((e, i) => {
      if (i != index) {
        return e;
      }
    });
    setTodoList(newTodo);
  };

  const handleEdit = (index) => {
    const detailTodo = {
      index,
      ...todoList[index],
    };
    setForm(detailTodo);
  };

  const nullDataMessage = () => {
    if (!todoList.length) {
      return <p>Data Tidak Ada</p>;
    }
  };

  return (
    <div>
      <div className="jumbotron">
        <h1>Todo List App</h1>
        <form method="post" onSubmit={handleSubmit} className="form">
          <input type="text" name="todo" value={form.todo} onChange={handleChange} placeholder="Todo" />
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
      <div className="content">
        <h3>Todo</h3>
        {nullDataMessage()}
        {todoList.map((e, i) => {
          if (e.status === false) {
            return (
              <div key={i} className="card">
                <div className="action">
                  <input type="checkbox" checked={e.status ? true : false} onChange={() => handleCheck(i)} />
                </div>
                <div className="text">{e.todo}</div>
                <div className="button-action">
                  <button onClick={() => handleEdit(i)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(i)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="content">
        <h3>Completed</h3>
        {nullDataMessage()}
        {todoList.map((e, i) => {
          if (e.status === true) {
            return (
              <div key={i} className="card">
                <div className="action">
                  <input type="checkbox" checked={e.status ? true : false} onChange={() => handleCheck(i)} />
                </div>
                <div className="text">{e.todo}</div>
                <div className="button-action">
                  <button onClick={() => handleDelete(i)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
