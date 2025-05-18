import React, { useState } from 'react';

export default function Task({
  phaseId,
  taskGroupId,
  task,
  updateTaskStatus,
  updateTaskName,
  deleteTask,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);

  const handleBlur = () => {
    updateTaskName(phaseId, taskGroupId, task.id, name.trim() || 'Untitled Task');
    setEditing(false);
  };

  return (
    <div className="task-container">
      {editing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          className="task-name-input"
        />
      ) : (
        <span onClick={() => setEditing(true)} className="task-name">
          {task.name}
        </span>
      )}

      <select
        value={task.status}
        onChange={(e) =>
          updateTaskStatus(phaseId, taskGroupId, task.id, e.target.value)
        }
        className={`status-select ${task.status}`}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button
        onClick={() => deleteTask(phaseId, taskGroupId, task.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
}
