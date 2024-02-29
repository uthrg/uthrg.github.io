const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");


const Port = 5500;

app.use(express.json());
app.use(cors())

const todos = [
    {
        id: 1,
        note: "Catch kjsvdnds",
        date: "",
        time: ""
    },
    {
        id: 2,
        note: "Catch Celebi",
        date: "",
        time: ""
    }
]

app.get("/", (req, res) => {
    res.json({ msg: "Todo list home page"});
})

app.get("/todos", (req, res) => {
    res.json( todos )
})

app.get("/todos/:id", (req, res) => {
    let todo = todos.filter((todo) => todo.id == req.params.id)
    res.json({ msg: "Todo-1", data: todo })
})

app.post("/todos", (req, res) => {
    todos.push({ id:uuid.v4(), ...req.body })
    res.json({ msg: "Add Data", data: todos })
})

app.put("/todos/:id", (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        todo.note = req.body.note;
        // todo.date = req.body.date;
        // todo.time = req.body.time;
        res.json({ msg: "Edit Data", data:todos })
    } else {
        res.json({ msg:"Data Not Found" })
    }
})

app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex((todo) => todo.id == req.params.id)
    todos.splice(index, 1)
    res.json({ msg: "Delete Data",data: todos })
})

app.listen(Port, () => {
    console.log("Port:", Port);
})