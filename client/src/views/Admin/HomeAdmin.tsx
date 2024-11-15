// HomeAdmin.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

const HomeAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Welcome to the Admin Panel</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{ mt: 3 }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default HomeAdmin;
