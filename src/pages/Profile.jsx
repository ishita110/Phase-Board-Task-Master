import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  IconButton,
  Badge,
  Tooltip,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import MessageIcon from '@mui/icons-material/Message';
import { formatDistanceToNow } from 'date-fns';

const initialNotifications = [
  { id: 1, text: 'Your password was updated', date: new Date(Date.now() - 3600000), read: false },
  { id: 2, text: 'New task assigned to you', date: new Date(Date.now() - 86400000 * 2), read: true },
];

const initialMessages = [
  { id: 1, from: 'Alice', message: 'Can you check the design spec?', date: new Date(Date.now() - 900000), read: false },
  { id: 2, from: 'TeamBot', message: 'Daily summary generated.', date: new Date(Date.now() - 86400000 * 3), read: true },
];

const NotificationsSection = ({ notifications, onMarkRead, onDelete }) => (
  <Paper elevation={3} sx={{ p: 3, maxHeight: 300, overflowY: 'auto' }}>
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <NotificationsActiveIcon color="primary" />
      <Typography variant="h6">Notifications</Typography>
    </Box>
    {notifications.length === 0 && <Typography color="text.secondary">No notifications</Typography>}
    <Stack spacing={2}>
      {notifications.map((note) => (
        <Paper
          key={note.id}
          elevation={note.read ? 0 : 3}
          sx={{
            p: 1.5,
            bgcolor: note.read ? 'background.paper' : 'primary.light',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 1,
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: note.read ? 'action.hover' : 'primary.main',
              color: note.read ? 'text.primary' : 'primary.contrastText',
            },
          }}
          onClick={() => onMarkRead(note.id)}
        >
          <Box>
            <Typography variant="body1" fontWeight={note.read ? 'normal' : 'bold'}>
              {note.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(note.date, { addSuffix: true })}
            </Typography>
          </Box>
          <Box>
            {!note.read && (
              <Tooltip title="Mark as read">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(note.id);
                  }}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      ))}
    </Stack>
  </Paper>
);

const MessagesSection = ({ messages, onMarkRead, onDelete }) => (
  <Paper elevation={3} sx={{ p: 3, maxHeight: 300, overflowY: 'auto' }}>
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <MessageIcon color="primary" />
      <Typography variant="h6">Messages</Typography>
    </Box>
    {messages.length === 0 && <Typography color="text.secondary">No messages</Typography>}
    <Stack spacing={2}>
      {messages.map((msg) => (
        <Paper
          key={msg.id}
          elevation={msg.read ? 0 : 3}
          sx={{
            p: 1.5,
            bgcolor: msg.read ? 'background.paper' : 'secondary.light',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 1,
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: msg.read ? 'action.hover' : 'secondary.main',
              color: msg.read ? 'text.primary' : 'secondary.contrastText',
            },
          }}
          onClick={() => onMarkRead(msg.id)}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Badge
              color="error"
              variant="dot"
              invisible={msg.read}
            >
              <Avatar>{msg.from[0]}</Avatar>
            </Badge>
            <Box>
              <Typography variant="body1" fontWeight={msg.read ? 'normal' : 'bold'}>
                {msg.from}: {msg.message.length > 50 ? msg.message.slice(0, 50) + '...' : msg.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDistanceToNow(msg.date, { addSuffix: true })}
              </Typography>
            </Box>
          </Stack>
          <Box>
            {!msg.read && (
              <Tooltip title="Mark as read">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(msg.id);
                  }}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(msg.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      ))}
    </Stack>
  </Paper>
);

const Profile = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [messages, setMessages] = useState(initialMessages);

  const handleMarkNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((note) => (note.id === id ? { ...note, read: true } : note))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  const handleMarkMessageRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const handleDeleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        {user ? (
          <>
            {/* Profile Overview */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ width: 72, height: 72 }}>{user.name?.[0]}</Avatar>
                <Box>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography color="text.secondary">{user.role}</Typography>
                  <Typography color="text.secondary">{user.email}</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Notifications and Messages side by side */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flex: 1, minWidth: 320 }}>
                <NotificationsSection
                  notifications={notifications}
                  onMarkRead={handleMarkNotificationRead}
                  onDelete={handleDeleteNotification}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: 320 }}>
                <MessagesSection
                  messages={messages}
                  onMarkRead={handleMarkMessageRead}
                  onDelete={handleDeleteMessage}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Typography>No user data available</Typography>
        )}
      </Box>
  );
};

export default Profile;
