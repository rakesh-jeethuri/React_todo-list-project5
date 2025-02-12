import React, { useState, useEffect } from 'react';
import "./Todo.css";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

export default function Todo() {
    const [inputvalue, setinputvalue] = useState("");
    const [task, settask] = useState([]);
    const [datetime, setdatetime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formatteddate = now.toLocaleDateString();
            const formattedtime = now.toLocaleTimeString();
            setdatetime(`${formatteddate} - ${formattedtime}`);
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    const handleInputChange = (value) => {
        setinputvalue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputvalue === "") {
            return;
        }
        if (task.some(t => t.text === inputvalue)) {
            setinputvalue("");
            return;
        }
        settask((prev) => [...prev, { text: inputvalue, completed: false }]);
        setinputvalue("");
    };

    const handleToggleComplete = (index) => {
        settask((prev) =>
            prev.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const handleDeleteTodo = (index) => {
        settask((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='main'>
            <section className='todo-container'>
                <header>
                    <h1>Todo List</h1>
                    <h3 className='date-name'>{datetime}</h3>
                </header>
                <section className='form'>
                    <form onSubmit={handleFormSubmit} className='formm'>
                        <div>
                            <input
                                type="text"
                                className='todo-input'
                                placeholder="Add a Task Here - 😊"
                                autoComplete='off'
                                value={inputvalue}
                                onChange={(event) => handleInputChange(event.target.value)}
                            />
                        </div>
                        <div>
                            <button type='submit' className='todo-btn'>Add Task</button>
                        </div>
                    </form>
                </section>
                <section className='myUnordList'>
                    <ol className='ull'>
                        {task.map((curtask, index) => (
                            <li key={index} className={`todo-item ${curtask.completed ? "completed" : ""}`}>
                                <span>{curtask.text}</span>
                                <div className='button_side'>
                                    <button className='check-btn' onClick={() => handleToggleComplete(index)}>
                                        <FaCheck />
                                    </button>
                                    <button className='delete-btn' onClick={() => handleDeleteTodo(index)}>
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            </section>
        </div>
    );
}
