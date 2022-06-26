import React from "react";
import "../App.css";
import Axios from "axios";

const TodoList = ({ todos, setTodos, setEditTodo }) => {

    const getInput = () => {
        Axios.get("http://localhost:3001/todo").then((response) => {
            console.log(response.data);
            setTodos(response.data);
        });
    };

    const handleComplete = ({ id }) => {
        todos.map((todoname) => {
            Axios.put("http://localhost:3001/update", { completed: todoname.completed === "false" ? "true" : "false", id: id }).then(
                (response) => {
                    setTodos(
                        todos.map((todoname) => {
                            return todoname.id == id
                                ? {
                                    id: todoname.id,
                                    name: todoname.name,
                                    completed: todoname.completed === "false" ? "true" : "false",
                                }
                                : todoname;
                        })
                    );
                }
            );


        })
    };

    const handleEdit = ({ id, name }) => {
        Axios.get("http://localhost:3001/todoEdit").then((response) => {
            if ((response.data = id) && (response.data = name)) {
                console.log(response.data = name);
                setEditTodo(id);

            }
        });
    };

    const handleDelete = ({ id }) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setTodos(
                todos.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };

    return (
        <div>
            <br></br><button onClick={getInput} className='button-add-1'>load previous list</button>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input
                        type="text"
                        value={todo.name}
                        className={"list" + (todo.completed === "true" ? " complete" : "")}
                        onChange={(event) => event.preventDefault()}
                    />
                    <div>
                        <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
                            <i className="fa fa-check-circle"></i>
                        </button>
                        <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
        </div>
    );
};

export default TodoList;