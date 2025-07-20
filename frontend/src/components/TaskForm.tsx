import type { FormEvent } from 'react';
import { useState } from 'react';

interface Task {
  id?: number; // id é opcional aqui porque na criação não tem id ainda
  title: string;
  description: string;
}

interface TaskFormProps {
  onAddTask: (task: Task) => Promise<void>;
  tasks: Task[]; // recebe as tasks atuais para checar duplicados
}

export const TaskForm = ({ onAddTask, tasks }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validação duplicados
    const exists = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    if (exists) {
      setMessage('Já existe uma tarefa com esse título!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    try {
      await onAddTask({ title, description });
      setMessage('Tarefa adicionada com sucesso!');
      setTitle('');
      setDescription('');
    } catch {
      setMessage('Erro ao adicionar tarefa.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Tarefa'}
      </button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};
