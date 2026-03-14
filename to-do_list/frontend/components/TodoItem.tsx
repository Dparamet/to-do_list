type Task = {
  _id: string;
  message: string;
  is_completed: boolean;
};

type TodoItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TodoItem({ task, onDelete, onToggle }: TodoItemProps) {
  const statusClass = task.is_completed ? "todo-status-dot completed" : "todo-status-dot";
  const messageClass = task.is_completed ? "todo-message completed" : "todo-message";

  return (
    <div className="todo-item">
      <div onClick={() => onToggle(task._id)} className="todo-item-content">
        <div className={statusClass}>
          {task.is_completed && <span>✓</span>}
        </div>
        <span className={messageClass}>
          {task.message}
        </span>
      </div>
      <button 
        onClick={() => onDelete(task._id)}
        className="todo-delete-btn"
      >
        Delete
      </button>
    </div>
  );
}