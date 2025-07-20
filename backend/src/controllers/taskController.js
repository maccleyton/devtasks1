let tasks = [];

function getAllTasks(req, res) {
  res.json(tasks);
}

function createTask(req, res) {
  const { title, description } = req.body;
  const newTask = { id: Date.now(), title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;

  const taskIndex = tasks.findIndex(task => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  tasks[taskIndex] = { id: Number(id), title, description };
  res.json(tasks[taskIndex]);
}

function deleteTask(req, res) {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id != id);
  res.status(204).send();
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};