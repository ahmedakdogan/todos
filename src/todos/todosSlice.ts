import {
    createSlice,
    // nanoid 
} from "@reduxjs/toolkit";
import { addTodosAsync, getTodosAsync } from "../api/service";

// export const getTodosAsync = createAsyncThunk("todos/getTodosAsync",async () =>{
//     // --- with fetch ---
//     // const result = await fetch("http://localhost:7000/todos");
//     // return result.json();

//     const result = await axios("http://localhost:7000/todos");
//     return result.data;
// });


export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [] as any[],
        activeKey: "all",
        isLoading: false,
        isLoadingAdd: false,
        error: null,
    },
    reducers: {
        // addTodo: {
        //     reducer: (state, action) => {
        //         state.items.unshift(action.payload);
        //     },
        //     prepare: ({ title }): any => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false
        //             }
        //         };
        //     }
        // },
        changeToggle: (state, action) => {
            const { id } = action.payload;
            const item: any = state.items.find((f: any) => f.id === id);
            item!.completed = !item!.completed;
        },
        destroy: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((f: any) => f.id !== id);
        },
        changeActiveKey: (state, action) => {
            state.activeKey = action.payload;
        },
        clearCompleted: (state) => {
            state.items = state.items.filter((f: any) => !f.completed);
        }
    },
    extraReducers: {
        // get todos
        [getTodosAsync.pending as any]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled as any]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected as any]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        // add todos
        [addTodosAsync.pending as any]: (state, action) => {
            state.isLoadingAdd = true;
        },
        [addTodosAsync.fulfilled as any]: (state, action) => {
            state.items.push(action.payload);
            state.isLoadingAdd = false;
        },
        [addTodosAsync.rejected as any]: (state, action) => {
            state.isLoadingAdd = false;
            state.error = action.error.message;
        }
    }
});

// birden fazla componentte kullanılma ihtiyacı olursa
// burda tanımlayıp selector ile çağırmak daha doğru
export const selectTodos = (state: any) => state.todos.items;
export const selectFilteredTodos = (state: any) => {
    if (state.todos.activeKey === "all") {
        return state.todos.items;
    }
    return state.todos.items.filter((todo: any) => state.todos.activeKey === "active" ? !todo.completed && todo : todo.completed && todo);
}
export const {
    // addTodo, 
    changeToggle,
    destroy,
    changeActiveKey,
    clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;