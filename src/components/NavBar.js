import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    PhaseBoard
                </Typography>

                {user && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={Link} to="/">
                            Dashboard
                        </Button>

                        {(user.role === ROLES.ADMIN || user.role === ROLES.PM) && (
                            <Button color="inherit" component={Link} to="/milestones">
                                Milestones
                            </Button>
                        )}

                        {user && (
                            <Button color="inherit" component={Link} to="/kanban">
                                Kanban Board
                            </Button>
                        )}

                        {user.role === ROLES.ADMIN && (
                            <Button color="inherit" component={Link} to="/team">
                                Team
                            </Button>
                        )}

                        <Button color="inherit" component={Link} to="/profile">
                            Profile
                        </Button>

                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                )}

                {!user && (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
