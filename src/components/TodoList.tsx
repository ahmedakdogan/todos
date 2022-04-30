import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    // destroy, 
    // changeToggle, 
    selectFilteredTodos, 
} from "../todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";
import {getTodosAsync, removeTodoAsync, toggleTodoAsync} from "../api/service";

function TodoList() {
    const dispatch = useDispatch();
    const filteredItems = useSelector(selectFilteredTodos);
    const isLoading = useSelector((state: any) => state.todos.isLoading);
    const error = useSelector((state: any) => state.todos.error);

    useEffect(() => {
         dispatch(getTodosAsync() as any);
    }, [dispatch]);

    const handleRemove = async (id: any) => {
        if (window.confirm("Are you sure?")) {
            await dispatch(removeTodoAsync(id) as any);
        }
    }

    const handleChangeToggle = async (id: any,completed:any) => {
        await dispatch(toggleTodoAsync({id,data:{completed}}) as any)
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
                                onChange={() => handleChangeToggle(item.id,!item.completed)} />
                            <label>{item.title}</label>
                            <button
                                className="destroy"
                                onClick={() => handleRemove(item.id)}></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default TodoList;