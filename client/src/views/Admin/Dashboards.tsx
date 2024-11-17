import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

interface TicketData {
  id: number;
  name: string;
  date: string;
  location: string;
  price: number;
}

const Dashboards: React.FC = () => {
  const [concerts, setConcerts] = useState<TicketData[]>([]);
  const [sports, setSports] = useState<TicketData[]>([]);
  const [formData, setFormData] = useState<TicketData>({
    id: 0,
    name: '',
    date: '',
    location: '',
    price: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch concert tickets
    axios
      .get("http://localhost:5000/getAllConcerts")
      .then((response) => setConcerts(response.data))
      .catch((error) => console.error("Error fetching concerts:", error));

    // Fetch sports tickets
    axios
      .get("http://localhost:5000/getAllSports")
      .then((response) => setSports(response.data))
      .catch((error) => console.error("Error fetching sports:", error));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:5000/updateTicket/${formData.id}`, formData)
        .then(() => {
          // Refresh the data after updating
          fetchTickets();
          setIsEditing(false);
        })
        .catch((error) => console.error("Error updating ticket:", error));
    } else {
      axios
        .post("http://localhost:5000/addTicket", formData)
        .then(() => {
          fetchTickets();
        })
        .catch((error) => console.error("Error adding ticket:", error));
    }
    setFormData({
      id: 0,
      name: '',
      date: '',
      location: '',
      price: 0,
    });
  };

  const handleEdit = (ticket: TicketData) => {
    setFormData(ticket);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5000/deleteTicket/${id}`)
      .then(() => fetchTickets())
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  const fetchTickets = () => {
    axios
      .get("http://localhost:5000/getAllConcerts")
      .then((response) => setConcerts(response.data))
      .catch((error) => console.error("Error fetching concerts:", error));

    axios
      .get("http://localhost:5000/getAllSports")
      .then((response) => setSports(response.data))
      .catch((error) => console.error("Error fetching sports:", error));
  };

  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Ticket Sales Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View and manage concert and sports ticket sales data.
        </Typography>
      </Box>

      {/* Form for adding and editing tickets */}
      <Box>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          name="date"
          value={formData.date}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          name="location"
          value={formData.location}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          value={formData.price}
          onChange={handleFormChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          {isEditing ? "Update" : "Add"} Ticket
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Concert Tickets */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Concert Tickets
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {concerts.map((concert) => (
                  <TableRow key={concert.id}>
                    <TableCell>{concert.id}</TableCell>
                    <TableCell>{concert.name}</TableCell>
                    <TableCell>{concert.date}</TableCell>
                    <TableCell>{concert.location}</TableCell>
                    <TableCell>${concert.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(concert)}>Edit</Button>
                      <Button onClick={() => handleDelete(concert.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Sports Tickets */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sports Tickets
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sports.map((sport) => (
                  <TableRow key={sport.id}>
                    <TableCell>{sport.id}</TableCell>
                    <TableCell>{sport.name}</TableCell>
                    <TableCell>{sport.date}</TableCell>
                    <TableCell>{sport.location}</TableCell>
                    <TableCell>${sport.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(sport)}>Edit</Button>
                      <Button onClick={() => handleDelete(sport.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboards;
