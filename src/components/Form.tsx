import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../todos/todosSlice";

function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const handle_OnSubmit = (e: any) => {        
        e.preventDefault();

        if(!title) return;
        dispatch(addTodo({ title }));
        setTitle("");
    }
    return (
        <form onSubmit={handle_OnSubmit}>
            <input className="new-todo"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus />
        </form>
    )
}

export default Form;