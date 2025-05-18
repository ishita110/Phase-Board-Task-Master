import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Colors for chart and progress bars
const COLORS = ['#1976d2', '#f9a825', '#388e3c', '#d32f2f'];

// Pie chart data example
const pieData = [
  { name: 'To Do', value: 5 },
  { name: 'In Progress', value: 3 },
  { name: 'Completed', value: 10 },
  { name: 'High Priority', value: 2 },
];

// Small stat card component
const StatCard = ({ title, value, color }) => (
  <Paper
    elevation={4}
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: color,
      color: '#fff',
      textAlign: 'center',
      minHeight: 90,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
      {title}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
      {value}
    </Typography>
  </Paper>
);

// Animated Task progress bar with label
const TaskProgress = ({ label, progress, color }) => {
  const [animatedProgress, setAnimatedProgress] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = progress;
    const duration = 800; // ms
    const increment = end / (duration / 16); // approx 60fps

    const animate = () => {
      start += increment;
      if (start >= end) {
        setAnimatedProgress(end);
      } else {
        setAnimatedProgress(start);
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [progress]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        {label} - {Math.round(animatedProgress)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={animatedProgress}
        sx={{
          height: 10,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': { bgcolor: color },
        }}
      />
    </Box>
  );
};

const recentActivities = [
  { id: 1, text: 'User John added a new task "Design homepage"', time: '2 hours ago' },
  { id: 2, text: 'Task "Setup backend API" marked completed', time: '1 day ago' },
  { id: 3, text: 'Milestone "Launch MVP" deadline changed', time: '3 days ago' },
  { id: 4, text: 'New user Jane joined the team', time: '4 days ago' },
];

const teamMembers = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
  { id: 4, name: 'Dana Lee' },
  { id: 5, name: 'Evan Brown' },
];

// Create a basic light theme — or you can just call createTheme() without options for MUI defaults
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Dashboard = () => {
  const handleDeleteActivity = (id) => {
    alert(`Delete activity ${id}`);
  };

  const handleInfoActivity = (text) => {
    alert(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', p: 4, bgcolor: 'background.default', color: 'text.primary' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Summary Stats */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <StatCard title="Tasks To Do" value={5} color="#1976d2" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard title="In Progress" value={3} color="#f9a825" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard title="Completed" value={10} color="#388e3c" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <StatCard title="High Priority" value={2} color="#d32f2f" />
              </Grid>
            </Grid>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Team Members
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {teamMembers.map(({ id, name }) => {
                  const initials = name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase();
                  return (
                    <Tooltip key={id} title={name}>
                      <Box
                        sx={{
                          bgcolor: '#1976d2',
                          color: '#fff',
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: 18,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          userSelect: 'none',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: '#1565c0',
                          },
                        }}
                      >
                        {initials}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          {/* Left: Task Progress */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Task Progress
              </Typography>
              <TaskProgress label="Design UI Mockups" progress={80} color="#1976d2" />
              <TaskProgress label="Setup Backend API" progress={60} color="#f9a825" />
              <TaskProgress label="User Testing" progress={30} color="#388e3c" />
              <TaskProgress label="Collect Feedback" progress={50} color="#d32f2f" />
            </Paper>
          </Grid>

          {/* Middle: Pie Chart */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper', height: 400 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Task Status Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Right: Recent Activities */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper', height: 400, display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Recent Activities
              </Typography>
              <List dense sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {recentActivities.map(({ id, text, time }) => (
                  <ListItem
                    key={id}
                    divider
                    secondaryAction={
                      <>
                        <Tooltip title="More info">
                          <IconButton edge="end" onClick={() => handleInfoActivity(text)}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete activity">
                          <IconButton edge="end" onClick={() => handleDeleteActivity(id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  >
                    <ListItemText primary={text} secondary={<Typography variant="caption">{time}</Typography>} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Chip label="View all activities" color="primary" variant="outlined" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
