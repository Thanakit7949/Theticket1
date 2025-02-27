import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ActivityData {
  id: number;
  user_name: string;
  activity_type: string;
  activity_time: string;
  details: string;
}

const Interface: React.FC = () => {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 3;

  const fetchRecentActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/activities/getRecentActivities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const paginatedActivities = activities.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Dashboard Interface
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" mb={2} sx={{ color: 'primary.main' }}>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" mb={2} sx={{ color: 'primary.main' }}>
              User Engagement
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" mb={2} sx={{ color: 'primary.main' }}>
              Revenue Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" mb={2} sx={{ color: 'primary.main' }}>
              Recent Activity
            </Typography>
            <Box>
              {paginatedActivities.map((activity) => (
                <Card key={activity.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1">
                      <strong>{activity.user_name}</strong> {activity.activity_type} at {new Date(activity.activity_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {activity.details}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <IconButton onClick={handlePrevPage} disabled={page === 0}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="body2">
                  Page {page + 1} of {totalPages}
                </Typography>
                <IconButton onClick={handleNextPage} disabled={page + 1 >= totalPages}>
                  <ArrowForward />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Interface;
