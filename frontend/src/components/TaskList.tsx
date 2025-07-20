import { TaskItem } from './TaskItem';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskList = ({ tasks, onDelete, onEdit }: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))
      )}
    </div>
  );
};
