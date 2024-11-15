// Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [concerts, setConcerts] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await axios.get("/api/concerts");
      setConcerts(Array.isArray(response.data) ? response.data : []); // Check if response.data is an array
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    if (selectedEvent) {
      if (selectedEvent.id) {
        await axios.put(`/api/concerts/${selectedEvent.id}`, selectedEvent);
      } else {
        await axios.post("/api/concerts", selectedEvent);
      }
      fetchConcerts();
      handleClose();
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/concerts/${id}`);
    fetchConcerts();
  };

  const handleOpen = (event: EventData | null = null) => {
    setSelectedEvent(event ? event : { id: 0, name: "", date: "", location: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Box mt={4} textAlign="center">
        <Typography variant="h4">Concerts Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Concert
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(concerts) && concerts.length > 0 ? (
              concerts.map((concert) => (
                <TableRow key={concert.id}>
                  <TableCell>{concert.id}</TableCell>
                  <TableCell>{concert.name}</TableCell>
                  <TableCell>{concert.date}</TableCell>
                  <TableCell>{concert.location}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(concert)}>Edit</Button>
                    <Button color="error" onClick={() => handleDelete(concert.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No concerts available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.id ? "Edit Concert" : "Add Concert"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={selectedEvent?.name || ""}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent!, name: e.target.value })
            }
          />
          <TextField
            label="Date"
            fullWidth
            margin="dense"
            value={selectedEvent?.date || ""}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent!, date: e.target.value })
            }
          />
          <TextField
            label="Location"
            fullWidth
            margin="dense"
            value={selectedEvent?.location || ""}
            onChange={(e) =>
              setSelectedEvent({ ...selectedEvent!, location: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="primary">
            {selectedEvent?.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
