// Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface DashboardsData {
  id: number;
  name: string;
  value: string; // Adjust fields according to your MySQL table structure
}

const Dashboards: React.FC = () => {
  const [data, setData] = useState<DashboardsData[]>([]);

  useEffect(() => {
    axios.get("/api/dashboard/data") // Fetch data from Express API
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Dashboards</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboards;
