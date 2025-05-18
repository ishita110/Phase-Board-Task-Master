import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% { transform: scale(1) }
  50% { transform: scale(1.05) }
  100% { transform: scale(1) }
`;

const Milestones = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: 'Launch MVP',
      tasks: [
        { id: 1, title: 'Design UI mockups', completed: false, status: 'Pending' },
        { id: 2, title: 'Setup backend API', completed: true, status: 'Done' },
      ],
    },
    {
      id: 2,
      title: 'User Testing',
      tasks: [
        { id: 3, title: 'Create test cases', completed: false, status: 'In Progress' },
        { id: 4, title: 'Collect feedback', completed: false, status: 'Pending' },
      ],
    },
  ]);

  const [openMilestoneDialog, setOpenMilestoneDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);

  const toggleTaskCompletion = (milestoneId, taskId) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId) return m;
        return {
          ...m,
          tasks: m.tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed, status: !t.completed ? 'Done' : 'Pending' } : t
          ),
        };
      })
    );
  };

  const handleAddMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    setMilestones(prev => [
      ...prev,
      { id: Date.now(), title: newMilestoneTitle.trim(), tasks: [] },
    ]);
    setNewMilestoneTitle('');
    setOpenMilestoneDialog(false);
  };

  const openTaskForm = (milestoneId) => {
    setSelectedMilestoneId(milestoneId);
    setOpenTaskDialog(true);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || selectedMilestoneId === null) return;

    setMilestones(prev =>
      prev.map(m =>
        m.id === selectedMilestoneId
          ? {
              ...m,
              tasks: [
                ...m.tasks,
                { id: Date.now(), title: newTaskTitle.trim(), completed: false, status: 'Pending' },
              ],
            }
          : m
      )
    );
    setNewTaskTitle('');
    setOpenTaskDialog(false);
  };

  const statusColors = {
    Pending: 'warning',
    'In Progress': 'info',
    Done: 'success',
  };

  return (
    <Container sx={{ mt: 6 }}>
       <Typography variant="h4" gutterBottom>
        Project Milestones
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenMilestoneDialog(true)}
        sx={{
          mb: 4,
          px: 3,
          py: 1.5,
          fontWeight: 'bold',
          animation: `${pulse} 3s ease-in-out infinite`,
          '&:hover': {
            backgroundColor: 'primary.dark',
            transform: 'scale(1.1)',
          },
        }}
        aria-label="Add new milestone"
      >
        Add Milestone
      </Button>

      {milestones.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No milestones yet. Start by adding one above.
        </Typography>
      ) : (
        milestones.map(milestone => (
          <Accordion
            key={milestone.id}
            sx={{
              background:
                'linear-gradient(135deg, rgba(63,81,181,0.1) 0%, rgba(63,81,181,0.05) 100%)',
              mb: 3,
              borderRadius: 2,
              boxShadow: 3,
              '& .MuiAccordionSummary-root': {
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                fontWeight: 'bold',
                letterSpacing: 0.5,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.contrastText' }} />}
              aria-controls={`panel-content-${milestone.id}`}
              id={`panel-header-${milestone.id}`}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {milestone.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {milestone.tasks.length === 0 ? (
                <Typography color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                  No tasks yet. Add one below.
                </Typography>
              ) : (
                <List>
                  {milestone.tasks.map(task => (
                    <ListItem
                      key={task.id}
                      secondaryAction={
                        <Chip
                          label={task.status}
                          color={statusColors[task.status]}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      }
                      sx={{
                        my: 1,
                        borderRadius: 1,
                        bgcolor: task.completed ? 'success.light' : 'background.paper',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(milestone.id, task.id)}
                        sx={{ mr: 2 }}
                        inputProps={{ 'aria-label': `Mark task "${task.title}" completed` }}
                      />
                      <ListItemText
                        primary={task.title}
                        sx={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? 'text.disabled' : 'text.primary',
                          userSelect: 'none',
                          fontWeight: task.completed ? 'normal' : 'medium',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Box mt={3} textAlign="center">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => openTaskForm(milestone.id)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.2,
                    borderRadius: 5,
                    boxShadow: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: 4,
                    },
                  }}
                  aria-label={`Add task to milestone ${milestone.title}`}
                >
                  + Add Task
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      {/* Add Milestone Dialog */}
      <Dialog open={openMilestoneDialog} onClose={() => setOpenMilestoneDialog(false)}>
        <DialogTitle>Add New Milestone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Milestone Title"
            fullWidth
            variant="outlined"
            value={newMilestoneTitle}
            onChange={e => setNewMilestoneTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMilestoneDialog(false)}>Cancel</Button>
          <Button onClick={handleAddMilestone} disabled={!newMilestoneTitle.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Milestones;
