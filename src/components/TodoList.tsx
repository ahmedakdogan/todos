import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroy, changeToggle, selectFilteredTodos, } from "../todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";
import {getTodosAsync} from "../api/service";

function TodoList() {
    const dispatch = useDispatch();
    const filteredItems = useSelector(selectFilteredTodos);
    const isLoading = useSelector((state: any) => state.todos.isLoading);
    const error = useSelector((state: any) => state.todos.error);

    useEffect(() => {
        dispatch(getTodosAsync() as any);
    }, [dispatch]);

    const handleDestroy = (id: any) => {
        if (window.confirm("Are you sure?")) {
            dispatch(destroy(id));
        }
    }

    if (isLoading) {
        return <Loading/>;
    }
    if (error) {
        return <Error message={error}/>;
    }

    return (
        <ul className="todo-list">
            {
                filteredItems.map((item: any) => (
                    <li key={item.id} className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => dispatch(changeToggle({ id: item.id }))} />
                            <label>{item.title}</label>
                            <button
                                className="destroy"
                                onClick={() => handleDestroy(item.id)}></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default TodoList;