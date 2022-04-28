import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync",async () =>{
    // --- with fetch ---
    // const result = await fetch("http://localhost:7000/todos");
    // return result.json();

    const result = await axios("http://localhost:7000/todos");
    return result.data;
});