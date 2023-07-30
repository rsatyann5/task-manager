// tasks.js
const express = require('express');
const router = express.Router();


let tasks = [];


// Retrieve all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Retrieve a single task by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// Create a new task
router.post('/', (req, res) => {
  const { title, description, completion } = req.body;
  
  if (!title || !description || completion === undefined) {
    res.status(400).json({ error: 'Title, description, and completion are required' });
  } else if (typeof completion !== 'boolean') {
    res.status(400).json({ error: 'Completion status must be a boolean value' });
  } else {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completion,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// Update an existing task by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    const { title, description, completion } = req.body;
    
    if (!title || !description || completion === undefined) {
      res.status(400).json({ error: 'Title, description, and completion are required' });
    } else if (typeof completion !== 'boolean') {
      res.status(400).json({ error: 'Completion status must be a boolean value' });
    } else {
      task.title = title;
      task.description = description;
      task.completion = completion;
      res.json(task);
    }
  }
});

// Delete a task by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(index, 1);
    res.sendStatus(204);
  }
});

module.exports = router;
