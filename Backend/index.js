const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require('./jwt.js')
const passport = require('./passport.js')
const cookieParser = require('cookie-parser')

require("dotenv").config();

const pool = require("./db");

const Port = 5500;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

// app.use((req, res, next) => {
//     console.log('!!!', req.originalUrl)
//     console.log('i am guide!, i got your token', req.headers?.authorization?.replace('Bearer ', ''))
//     next()
// })

const authenticateJWT = passport.authenticate('jwt', { session: false });

app.post("/api/login", 
  async (req, res) => {
  try {
      console.log('req', req.body)
      const { username, password } = req.body;

    const payload = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + 60 * 15, // Expiration Time：有效期限
      };

      if(username === 'user001' && password === 'password'){
        const token = jwt.sign(payload, jwtConfig.secret);
        // Set the token as a cookie
        res.cookie('token', token, { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production', // Use secure in production
          maxAge: 900000 // 15 minutes in milliseconds
        });

        return res.json({ token });
      }
      return res.status(401).json({ msg: 'Invalid credentials'})
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/protected", 
  authenticateJWT, 
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

app.get("/api", (req, res) => {
  res.json({ msg: "Todo list home page~~~" });
});

app.get("/api/todos", authenticateJWT, async (req, res) => {
  try {
    console.log(`The current process ID is ${process.pid}`);

    const todos = await pool.query("SELECT * FROM todo_list");
    res.json(todos.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo_list WHERE id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.post("/api/todos", authenticateJWT, async (req, res) => {
  try {
    // const { id } = req.params
    const { id, note } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo_list VALUES($1, $2) RETURNING *",
      [id, note]
    );
    res.json({ msg: "Add Data", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const todo = await pool.query("UPDATE todo_list SET note=$1 WHERE id=$2", [
      note,
      id,
    ]);
    res.json({ msg: "Todo update", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodo = await pool.query("DELETE FROM todo_list WHERE id=$1", [id]);
    res.json({ msg: "Delete Data", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(Port, () => {
  console.log("Port:", Port);
});
