import React, { useState } from 'react';
import Task from './Task';

export default function TaskGroup({
  phaseId,
  taskGroup,
  updateTaskStatus,
  updateTaskGroupName,
  deleteTaskGroup,
  addTask,
  updateTaskName,
  deleteTask,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(taskGroup.name);

  const handleBlur = () => {
    updateTaskGroupName(phaseId, taskGroup.id, name.trim() || 'Untitled Group');
    setEditing(false);
  };

  return (
    <div className="taskgroup-container">
      <div className="taskgroup-header">
        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          />
        ) : (
          <h3 onClick={() => setEditing(true)}>{taskGroup.name}</h3>
        )}
        <button
          onClick={() => deleteTaskGroup(phaseId, taskGroup.id)}
          className="delete-btn"
        >
          Delete Group
        </button>
      </div>

      <button
        className="add-btn"
        onClick={() => addTask(phaseId, taskGroup.id)}
        style={{ marginBottom: '10px' }}
      >
        + Add Task
      </button>

      <div>
        {taskGroup.tasks.map((task) => (
          <Task
            key={task.id}
            phaseId={phaseId}
            taskGroupId={taskGroup.id}
            task={task}
            updateTaskStatus={updateTaskStatus}
            updateTaskName={updateTaskName}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
