const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

const pool = require("./db")

const Port = 5500;

app.use(express.json());
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ msg: "Todo list home page~~~"});
})

app.get("/api/todos", async (req, res) => {
    try {
        console.log(`The current process ID is ${process.pid}`);

        const todos = await pool.query("SELECT * FROM todo_list")
        res.json( todos.rows )
    }catch (error){
        res.json({ error })
    }
})

app.get("/api/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo_list WHERE id = $1", [ id ])
        res.json(todo.rows)
    }catch (error){
        res.json({ error })
    }
})

app.post("/api/todos", async (req, res) => {
    try {
        // const { id } = req.params
        const { id, note } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo_list VALUES($1, $2) RETURNING *", [ id, note ]
            )
        res.json({ msg: "Add Data", success: true })
    }catch (error){
        res.json({ error })
    }
})

app.put("/api/todos/:id", async(req, res) => {
    try{
        const { id } = req.params
        const { note } = req.body
        const todo = await pool.query(
            "UPDATE todo_list SET note=$1 WHERE id=$2", [note, id]
        )
        res.json({ msg:"Todo update", success: true })
    }catch (error){
        res.json({ error })
    }
})

app.delete("/api/todos/:id", async(req, res) => {
    try{
        const { id } = req.params
        const delTodo = await pool.query("DELETE FROM todo_list WHERE id=$1", [ id ])
        res.json({ msg: "Delete Data",success: true })
    }catch (error){
        res.json({ error })
    }
})

app.listen(Port, () => {
    console.log("Port:", Port);
})