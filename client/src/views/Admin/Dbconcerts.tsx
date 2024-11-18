import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ConcertData {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

const Dbconcerts: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertData[]>([]);
  const [formData, setFormData] = useState<ConcertData>({
    id: 0,
    name: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    availableSeats: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state for async operations
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  // Dialog for delete confirmation
  const [concertToDelete, setConcertToDelete] = useState<number | null>(null);  // Track the concert ID to delete

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/getAllConcerts")
      .then((response) => setConcerts(response.data))
      .catch((error) => console.error("Error fetching concerts:", error))
      .finally(() => setLoading(false));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.date || !formData.location) {
      console.error("All required fields must be filled.");
      return;
    }

    setLoading(true);

    if (isEditing) {
      axios
        .put(`http://localhost:5000/updateConcert/${formData.id}`, formData)
        .then(() => {
          fetchConcerts();
          setIsEditing(false);
        })
        .catch((error) => console.error("Error updating concert:", error))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("http://localhost:5000/addConcert", formData)
        .then(() => fetchConcerts())
        .catch((error) => console.error("Error adding concert:", error))
        .finally(() => setLoading(false));
    }

    setFormData({
      id: 0,
      name: "",
      description: "",
      date: "",
      location: "",
      price: 0,
      availableSeats: 0,
    });
  };

  const handleEdit = (concert: ConcertData) => {
    setFormData(concert);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setConcertToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (concertToDelete !== null) {
      axios
        .delete(`http://localhost:5000/deleteConcert/${concertToDelete}`)
        .then(() => {
          fetchConcerts();
          setOpenDeleteDialog(false);
        })
        .catch((error) => console.error("Error deleting concert:", error));
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Container>
      <Box mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Manage Concerts
        </Typography>
      </Box>

      {/* Form */}
      <Box component="form" mb={4}>
        <TextField
          label="Concert Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
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
          type="number"
          variant="outlined"
          fullWidth
          name="price"
          value={formData.price}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          label="Available Seats"
          type="number"
          variant="outlined"
          fullWidth
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleFormChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdate}
          fullWidth
          disabled={loading}
        >
          {isEditing ? "Update Concert" : "Add Concert"}
        </Button>
      </Box>

      {/* List of concerts */}
      {loading ? (
        <Typography>Loading concerts...</Typography>
      ) : (
        <Grid container spacing={2}>
          {concerts.map((concert) => (
            <Grid item xs={12} key={concert.id}>
              <Box
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {concert.name} - {concert.date} - {concert.location}
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(concert)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(concert.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={cancelDelete}
        aria-labelledby="delete-concert-dialog"
      >
        <DialogTitle id="delete-concert-dialog">Delete Concert</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this concert?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dbconcerts;
