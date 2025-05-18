import React, { useState } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Container, Box, TextField, Select, MenuItem, InputLabel, Button, Typography } from '@mui/material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES.MEMBER);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      alert('Enter your name');
      return;
    }
    login(name, role);
    navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Login to PhaseBoard
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          fullWidth
        />

        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          onChange={e => setRole(e.target.value)}
          fullWidth
          required
        >
          <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
          <MenuItem value={ROLES.PM}>Project Manager</MenuItem>
          <MenuItem value={ROLES.MEMBER}>Team Member</MenuItem>
        </Select>

        <Button variant="contained" type="submit" size="large">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
