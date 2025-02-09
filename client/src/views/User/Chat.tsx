import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper, Avatar } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { sender: 'admin', message: 'สวัสดีค่ะ! มีอะไรให้ช่วยไหมคะ?', timestamp: '10:00 AM' },
    { sender: 'user', message: 'สวัสดีครับ ผมมีปัญหาเกี่ยวกับการจองตั๋วครับ', timestamp: '10:01 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    const newMsg = {
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>แชทกับผู้ดูแล</Typography>
      <Paper sx={{ flexGrow: 1, p: 2, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.sender === 'admin' && (
                <Avatar alt="Admin" src="/path/to/admin-profile.jpg" sx={{ mr: 2 }} />
              )}
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 1,
                  borderRadius: 2,
                  bgcolor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                  boxShadow: 1,
                }}
              >
                <ListItemText primary={msg.message} secondary={msg.timestamp} />
              </Box>
              {msg.sender === 'user' && (
                <Avatar alt="User" src="/path/to/user-profile.jpg" sx={{ ml: 2 }} />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="ข้อความ"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
          ส่ง
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
