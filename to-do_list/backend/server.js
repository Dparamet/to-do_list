require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- Middleware (สำคัญมาก!) ---
app.use(cors()); // อนุญาตให้ Frontend (5173) คุยกับ Backend (5000) ได้
app.use(express.json()); // ทำให้นายอ่านค่า req.body จากหน้าบ้านได้

// --- Connect to MongoDB Atlas ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Cloud DB is Ready, Bro!"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// --- Data Schema ---
const taskSchema = new mongoose.Schema({
  message: String,
  is_completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

// --- API Routes ---

// 1. Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 2. Add new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save(); // เซฟลง Cloud จริงๆ
    res.json(newTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 3. Delete task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 4. Toggle Task (Update)
app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.is_completed = !task.is_completed;
  await task.save();
  res.json(task);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));