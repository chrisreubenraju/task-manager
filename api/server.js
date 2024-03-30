const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/mern-todo",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Database"))
  .catch(console.error);

  const Todo = require('./models/todo');

  app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
  })


  app.post('/todo/new', (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });
    todo.save();

    res.json(todo);
  })

  app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
  })

  app.get('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
  })

  app.put("/todo/update-priority/:id", async (req, res) => {
    try {
      const { priority } = req.body;
      const validPriorities = ["Low", "Medium", "High"];

      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority" });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { priority },
        { new: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

    app.put("/todo/update-category/:id", async (req, res) => {
      try {
        const { category } = req.body;
        const validCategory = ["Household", "Office", "Others"];

        if (!validCategory.includes(category)) {
          return res.status(400).json({ message: "Invalid priority" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
          req.params.id,
          { category },
          { new: true }
        );

        if (!updatedTodo) {
          return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });



  app.listen(3001, () => console.log("Server started on 3001"));