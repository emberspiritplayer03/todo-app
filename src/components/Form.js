import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

    const updateTodo = () => {
        Axios.get("http://localhost:3001/todo").then((response) => {
            if (response.data.id = editTodo) {
                setTodos(response.data); //Input box in Todo list
            }

        })
        setEditTodo(""); //Variable for Update/Edit
    }

    useEffect(() => {
        if (editTodo) {
            todos.map((todoname) => {
                if (todoname.id == editTodo) {
                    setInput(todoname.name);
                    console.log(editTodo);
                }
            })
        } else {
            setInput(""); //Input box that locates in 'Add todo...' area
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            Axios.post('http://localhost:3001/create', { name: input, completed: editTodo === "false" ? "true" : "false" }).then(() => { //Directly inserts to database
                console.log(editTodo);
                Axios.get("http://localhost:3001/todo").then((response) => {
                    console.log("success");
                    setTodos(response.data); //todos and setTodos are variables for storing data from database
                });
            });

            setInput(""); //Input box in 'Add todo...'
        } else {
            todos.map((todoname) => {
                Axios.put("http://localhost:3001/updateEdit", { name: input, id: editTodo, completed: todoname.completed }).then(
                    (response) => {
                        if (todoname.id == editTodo) {
                            setTodos(
                                todos.map((todoname) => {
                                    return todoname.id == editTodo //Data inserts to database
                                        ? {
                                            id: todoname.id,
                                            name: todoname.name,
                                            completed: todoname.completed,
                                        }
                                        : todoname;
                                })
                            );
                            updateTodo(todoname.name);
                        }
                    }
                );

            })
        }

    }

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Add a todo..."
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <button className='button-add' type='submit'>
                {editTodo ? "OK" : "Add"}
            </button>
        </form>
    )
}

export default Form;