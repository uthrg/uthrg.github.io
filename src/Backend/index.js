const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");

const pool = require("./db")

const Port = 5500;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({ msg: "Todo list home page"});
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo_list")
        res.json( todos.rows )
    }catch (error){
        res.json({ error })
    }
})

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo_list WHERE id = $1", [ id ])
        res.json(todo.rows)
    }catch (error){
        res.json({ error })
    }
    // let todo = todos.filter((todo) => todo.id == req.params.id)
    // res.json({ msg: "Todo-1", data: todo })
})

app.post("/todos", async (req, res) => {
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
    // todos.push({ id:uuid.v4(), ...req.body })
})

app.put("/todos/:id", async(req, res) => {
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
    // let todo = todos.find((todo) => todo.id == req.params.id);
    // if (todo) {
        // todo.note = req.body.note;
        // todo.date = req.body.date;
        // todo.time = req.body.time;
    //     res.json({ msg: "Edit Data", data:todos })
    // } else {
    //     res.json({ msg:"Data Not Found" })
    // }
})

app.delete("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params
        const delTodo = await pool.query("DELETE FROM todo_list WHERE id=$1", [ id ])
        res.json({ msg: "Delete Data",success: true })
    }catch (error){
        res.json({ error })
    }
    // let index = todos.findIndex((todo) => todo.id == req.params.id)
    // todos.splice(index, 1)
})

app.listen(Port, () => {
    console.log("Port:", Port);
})