import React from 'react';
import Phase from './Phase';

export default function PhaseList({
  phases,
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
  return (
    <div>
      {phases.map((phase) => (
        <Phase
          key={phase.id}
          phase={phase}
          updatePhaseName={updatePhaseName}
          deletePhase={deletePhase}
          updateTaskStatus={updateTaskStatus}
          addTaskGroup={addTaskGroup}
          updateTaskGroupName={updateTaskGroupName}
          deleteTaskGroup={deleteTaskGroup}
          addTask={addTask}
          updateTaskName={updateTaskName}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
