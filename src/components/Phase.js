import React, { useState } from 'react';
import TaskGroup from './TaskGroup';

export default function Phase({
  phase,
  updatePhaseName,
  deletePhase,
  updateTaskStatus,
  addTaskGroup,
  updateTaskGroupName,
  deleteTaskGroup,
  addTask,
  updateTaskName,
  deleteTask,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(phase.name);

  const handleBlur = () => {
    updatePhaseName(phase.id, name.trim() || 'Untitled Phase');
    setEditing(false);
  };

  return (
    <div className="phase-container">
      <div className="phase-header">
        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          />
        ) : (
          <h2 onClick={() => setEditing(true)}>{phase.name}</h2>
        )}
        <button onClick={() => deletePhase(phase.id)} className="delete-btn">
          Delete Phase
        </button>
      </div>

      <button
        className="add-btn"
        onClick={() => addTaskGroup(phase.id)}
        style={{ marginBottom: '10px' }}
      >
        + Add Task Group
      </button>

      <div>
        {phase.taskGroups.map((group) => (
          <TaskGroup
            key={group.id}
            phaseId={phase.id}
            taskGroup={group}
            updateTaskStatus={updateTaskStatus}
            updateTaskGroupName={updateTaskGroupName}
            deleteTaskGroup={deleteTaskGroup}
            addTask={addTask}
            updateTaskName={updateTaskName}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
