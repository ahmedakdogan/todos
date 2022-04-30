import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    // --- with fetch ---
    // const result = await fetch("http://localhost:7000/todos");
    // return result.json();

    const result = await axios("http://localhost:7000/todos");
    return result.data;
});

export const addTodosAsync = createAsyncThunk("todos/addTodos", async (data: any) => {
    const result = await axios.post("http://localhost:7000/todos", data);
    return result.data;
});

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id,data}:any) => {
    const result = await axios.patch("http://localhost:7000/todos/"+id, data);
    return result.data;
});

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (id:any) => {
    await axios.delete("http://localhost:7000/todos/"+id);
    return id;
});