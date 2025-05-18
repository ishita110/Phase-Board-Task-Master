import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Stack,
} from '@mui/material';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Design login page', assignee: 'Alice', priority: 'High', tags: ['UI', 'Frontend'] },
        { id: 'task-2', title: 'Set up database', assignee: 'Bob', priority: 'Medium', tags: ['Backend', 'DB'] },
      ],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'API integration', assignee: 'Charlie', priority: 'High', tags: ['API', 'Integration'] },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-4', title: 'Project setup', assignee: 'Dana', priority: 'Low', tags: ['Setup'] },
      ],
    },
  },
};

const users = ['Alice', 'Bob', 'Charlie', 'Dana'];
const priorities = ['Low', 'Medium', 'High'];
const priorityColors = {
  Low: 'success',
  Medium: 'warning',
  High: 'error',
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(users[0]);
  const [newTaskPriority, setNewTaskPriority] = useState(priorities[0]);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [newTaskTags, setNewTaskTags] = useState('');

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newColumn = {
        ...sourceColumn,
        tasks: sourceTasks,
      };

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const destTasks = [...destColumn.tasks];
      destTasks.splice(destination.index, 0, movedTask);
      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
          [destColumn.id]: {
            ...destColumn,
            tasks: destTasks,
          },
        },
      }));
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      tags: newTaskTags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [selectedColumn]: {
          ...prev.columns[selectedColumn],
          tasks: [...prev.columns[selectedColumn].tasks, newTask],
        },
      },
    }));

    setNewTaskTitle('');
    setNewTaskTags('');
  };

  return (
    <Container sx={{ mt: 4, maxWidth: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          bgcolor: '#f5f5f5',
          borderRadius: 1,
        }}
      >
        <TextField
          label="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />

        <TextField
          label="Tags (comma separated)"
          value={newTaskTags}
          onChange={(e) => setNewTaskTags(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Assignee</InputLabel>
          <Select
            value={newTaskAssignee}
            label="Assignee"
            onChange={(e) => setNewTaskAssignee(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTaskPriority}
            label="Priority"
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            {priorities.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Column</InputLabel>
          <Select
            value={selectedColumn}
            label="Column"
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            {Object.values(data.columns).map((col) => (
              <MenuItem key={col.id} value={col.id}>
                {col.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleAddTask} color="primary">
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.values(data.columns).map((column) => (
            <Grid item xs={12} sm={4} key={column.id}>
              <Paper
                elevation={3}
                sx={{ p: 2, minHeight: 500, bgcolor: '#e3f2fd', borderRadius: 2 }}
              >
                <Typography variant="h6" gutterBottom>
                  {column.title} ({column.tasks.length})
                </Typography>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: 400,
                        bgcolor: snapshot.isDraggingOver ? '#bbdefb' : 'inherit',
                        transition: 'background-color 0.2s ease',
                        borderRadius: 1,
                        overflowY: 'auto',
                        maxHeight: 600,
                        padding: 1,
                      }}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                p: 1.5,
                                mb: 1,
                                bgcolor: snapshot.isDragging ? '#90caf9' : '#fff',
                                cursor: 'move',
                                borderLeft: `5px solid`,
                                borderColor: `${priorityColors[task.priority]}.main`,
                                borderRadius: 1,
                                boxShadow: snapshot.isDragging ? 6 : 1,
                              }}
                            >
                              <Typography variant="subtitle1" fontWeight="bold">
                                {task.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Assignee: {task.assignee}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                  Priority:
                                </Typography>
                                <Chip label={task.priority} color={priorityColors[task.priority]} size="small" />
                              </Box>
                              {task.tags && task.tags.length > 0 && (
                                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                                  {task.tags.map((tag, idx) => (
                                    <Chip
                                      key={idx}
                                      label={tag}
                                      variant="outlined"
                                      size="small"
                                      color="primary"
                                    />
                                  ))}
                                </Stack>
                              )}
                            </Paper>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;
