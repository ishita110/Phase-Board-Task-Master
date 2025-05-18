import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardActions,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Roles and statuses for dropdowns
const roles = ['Admin', 'Developer', 'Designer', 'Product Manager'];
const statuses = ['Active', 'Offline', 'Away'];

// Colors for status chips
const statusColors = {
  Active: 'success',
  Offline: 'default',
  Away: 'warning',
};

// Helper: generate initials from name string
const getInitials = (name) => {
  const namesArray = name.trim().split(' ');
  if (namesArray.length === 1) return namesArray[0][0].toUpperCase();
  return (namesArray[0][0] + namesArray[namesArray.length - 1][0]).toUpperCase();
};

// Helper: generate consistent avatar bg color from name string
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const initialTeam = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Developer',
    status: 'Offline',
  },
  {
    id: 3,
    name: 'Clara Lee',
    role: 'Designer',
    status: 'Away',
  },
];

const Team = () => {
  const [team, setTeam] = useState(initialTeam);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    status: 'Active',
  });

  // Filter team by search
  const filteredTeam = team.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setTeam(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewMember({ name: '', role: '', status: 'Active' });
  };

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.role.trim()) return;
    const newId = Date.now();
    setTeam(prev => [...prev, { ...newMember, id: newId }]);
    handleDialogClose();
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        Team Management
      </Typography>
      <Typography sx={{ mb: 3, color: 'text.secondary' }}>
        Admins can view and manage team members here.
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search Members"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
          inputProps={{ 'aria-label': 'Search team members by name' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
          sx={{
            px: 3,
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            ':hover': { backgroundColor: 'primary.dark' },
          }}
          aria-label="Add new team member"
        >
          Add Member
        </Button>
      </Box>

      {filteredTeam.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
          No members found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTeam.map(member => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 4,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                }}
                aria-label={`Team member ${member.name}`}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(member.name),
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                      aria-label={`Avatar initials for ${member.name}`}
                    >
                      {getInitials(member.name)}
                    </Avatar>
                  }
                  title={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', userSelect: 'none' }}
                    >
                      {member.name}
                    </Typography>
                  }
                  subheader={member.role}
                />
                <Box sx={{ px: 2, pb: 2 }}>
                  <Chip
                    label={member.status}
                    color={statusColors[member.status]}
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                    aria-label={`Status: ${member.status}`}
                  />
                </Box>
                <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
                  <IconButton aria-label={`Edit ${member.name}`} size="small" disabled>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={`Delete ${member.name}`}
                    size="small"
                    color="error"
                    onClick={() => handleDelete(member.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Member Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Team Member</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={newMember.name}
            onChange={e => setNewMember({ ...newMember, name: e.target.value })}
            required
            inputProps={{ 'aria-label': 'Full name of the new team member' }}
          />
          <TextField
            select
            margin="dense"
            label="Role"
            fullWidth
            variant="outlined"
            value={newMember.role}
            onChange={e => setNewMember({ ...newMember, role: e.target.value })}
            required
            sx={{ mt: 2 }}
            inputProps={{ 'aria-label': 'Role of the new team member' }}
          >
            {roles.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={newMember.status}
            onChange={e => setNewMember({ ...newMember, status: e.target.value })}
            sx={{ mt: 2 }}
            inputProps={{ 'aria-label': 'Status of the new team member' }}
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleAddMember}
            disabled={!newMember.name.trim() || !newMember.role.trim()}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Team;
