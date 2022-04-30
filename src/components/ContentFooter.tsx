import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveKey, clearCompleted,selectTodos } from "../todos/todosSlice";

function ContentFooter() {
    const dispatch = useDispatch();

    const items = useSelector(selectTodos);
    const itemsLeftCount = items.filter((f: any) => !f.completed).length;

    const activeKey = useSelector((state: any) => state.todos.activeKey);

    useEffect(()=>{
        localStorage.setItem("activeKey",activeKey); 
    },[activeKey]);

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{itemsLeftCount} item{itemsLeftCount > 1 && 's'} left</strong>
            </span>
            <ul className="filters">
                <li>
                    <a className={activeKey === "all" ? "selected" : ""} onClick={()=>dispatch(changeActiveKey("all"))}>All</a>
                </li>
                <li>
                    <a className={activeKey === "active" ? "selected" : ""} onClick={()=>dispatch(changeActiveKey("active"))}>Active</a>
                </li>
                <li>
                    <a className={activeKey === "completed" ? "selected" : ""} onClick={()=>dispatch(changeActiveKey("completed"))}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed" onClick={()=>dispatch(clearCompleted())}>
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter;