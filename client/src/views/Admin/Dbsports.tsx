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

// Interface for sport data
interface SportData {
  id: number;
  name: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

const Dbsports: React.FC = () => {
  const [sports, setSports] = useState<SportData[]>([]); // Store all sports
  const [formData, setFormData] = useState<SportData>({
    id: 0,
    name: "",
    date: "",
    location: "",
    price: 0,
    availableSeats: 0,
  }); // Form data
  const [editId, setEditId] = useState<number | null>(null); // ID of the sport being edited
  const [loading, setLoading] = useState(false);  // Loading state for async operations
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  // Dialog for delete confirmation
  const [sportToDelete, setSportToDelete] = useState<number | null>(null);  // Track the sport ID to delete

  // Fetch sports data when component mounts
  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/getAllSports")
      .then((response) => setSports(response.data))
      .catch((error) => console.error("Error fetching sports:", error))
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

    if (editId !== null) {
      // Update the sport if editId is set
      axios
        .put(`http://localhost:5000/updateSport/${formData.id}`, formData)
        .then(() => {
          fetchSports();
          setEditId(null);
        })
        .catch((error) => console.error("Error updating sport:", error))
        .finally(() => setLoading(false));
    } else {
      // Add new sport
      axios
        .post("http://localhost:5000/addSport", formData)
        .then(() => fetchSports())
        .catch((error) => console.error("Error adding sport:", error))
        .finally(() => setLoading(false));
    }

    // Clear form after submission
    setFormData({
      id: 0,
      name: "",
      date: "",
      location: "",
      price: 0,
      availableSeats: 0,
    });
  };

  const handleEdit = (sport: SportData) => {
    setFormData(sport);
    setEditId(sport.id);
  };

  const handleDelete = (id: number) => {
    setSportToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (sportToDelete !== null) {
      axios
        .delete(`http://localhost:5000/deleteSport/${sportToDelete}`)
        .then(() => {
          fetchSports();
          setOpenDeleteDialog(false);
        })
        .catch((error) => console.error("Error deleting sport:", error));
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Container>
      <Box mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Manage Sports
        </Typography>
      </Box>

      {/* Form Section */}
      <Box component="form" mb={4}>
        <TextField
          label="Sport Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
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
          {editId !== null ? "Update Sport" : "Add Sport"}
        </Button>
      </Box>

      {/* Sports List */}
      {loading ? (
        <Typography>Loading sports...</Typography>
      ) : (
        <Grid container spacing={2}>
          {sports.map((sport) => (
            <Grid item xs={12} key={sport.id}>
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
                  {sport.name} - {sport.date} - {sport.location}
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(sport)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(sport.id)}
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
        aria-labelledby="delete-sport-dialog"
      >
        <DialogTitle id="delete-sport-dialog">Delete Sport</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this sport?</Typography>
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

export default Dbsports;
