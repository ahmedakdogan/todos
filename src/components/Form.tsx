import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../api/service";
import {
    // addTodo ,

} from "../todos/todosSlice";
import Loading from "./Loading";

function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const isLoadingAdd = useSelector((state: any) => state.todos.isLoadingAdd);

    const handle_OnSubmit = async (e: any) => {
        e.preventDefault();

        if (!title) {
            return;
        }
        await dispatch(addTodosAsync({ title }) as any);
        setTitle("");
    }
    return (
        <form onSubmit={handle_OnSubmit} style={{display:"flex", alignItems:"center"}}>
            <input className="new-todo"
                placeholder="What needs to be done?"
                value={title}
                disabled={isLoadingAdd}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus />

            {isLoadingAdd && <Loading />}
        </form>
    )
}

export default Form;