import './App.css';
import { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from './services/api';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Message } from './components/Message';
import { Loading } from './components/Loading';

export interface Task {
  id: number;
  title: string;
  description: string;
}

type MessageType = 'success' | 'error' | '';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((data) => {
        setTasks(data);
        setMessage('Tarefas carregadas com sucesso!');
        setMessageType('success');
      })
      .catch(() => {
        setMessage('Erro ao buscar tarefas');
        setMessageType('error');
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAddTask(task: { title: string; description: string }) {
    setLoading(true);
    try {
      const newTask = await createTask(task.title, task.description);
      setTasks((prev) => [...prev, newTask]);
      setMessage('Tarefa adicionada com sucesso!');
      setMessageType('success');
    } catch {
      setMessage('Erro ao adicionar tarefa');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTask(id: number) {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setMessage('Tarefa excluída com sucesso!');
      setMessageType('success');
    } catch {
      setMessage('Erro ao excluir tarefa');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  function handleEditTask(task: Task) {
    alert(`Editar tarefa:\nTítulo: ${task.title}\nDescrição: ${task.description}`);
  }

  return (
    <div className="container">
      <Header />
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <TaskForm onAddTask={handleAddTask} tasks={tasks} />

      {loading && <Loading />}

      {!loading && <Message text={message} type={messageType} />}

      {!loading && (
        <>
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
          ) : (
            <p className="empty-message">Nenhuma tarefa encontrada.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
