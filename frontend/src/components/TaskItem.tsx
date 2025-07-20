interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onDelete, onEdit }: TaskItemProps) => {
  console.log('Renderizando task:', task);
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="buttons">
        <button onClick={() => onEdit(task)}>✏️ Editar</button>
        <button onClick={() => onDelete(task.id)}>🗑️ Excluir</button>
      </div>
    </div>
  );
};
