import { Box, Card, Typography, Button, CardMedia } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // สำหรับการใช้งาน Link

export interface IHomeTestProps {}
export interface IConcert {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    price: string;
    available_seats: number;
    image: string;
    created_at: string;
    concert_id: number;
}
export interface ISportEvent {
    id: number;
    name: string;
    date: string;
    location: string;
    image: string;
}

// Sample Data for Sports Events
const sportsMock = [
    { id: 1, name: 'Football Match', date: '2024-11-10T17:00:00.000Z', location: 'Stadium A', image: 'https://via.placeholder.com/350x150' },
    { id: 2, name: 'Basketball Game', date: '2024-11-20T17:00:00.000Z', location: 'Arena B', image: 'https://via.placeholder.com/350x150' },
    { id: 3, name: 'Tennis Tournament', date: '2024-12-05T17:00:00.000Z', location: 'Court C', image: 'https://via.placeholder.com/350x150' }
];

const HomeTest: React.FunctionComponent<IHomeTestProps> = props => {
    const [dataconcerts, setDataconcerts] = useState<IConcert[]>([]);
    const [datasportEvents, setDatasportEvents] = useState<ISportEvent[]>(sportsMock); // Mock data for sports events

    const fetchConcerts = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllConcerts');
            const dataCon = await response.json();
            setDataconcerts(dataCon);
            console.log(dataCon);
        } catch (error) {
            console.error('Error fetching concerts:', error);
        }
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    const openModal = (event: any) => {
        console.log(event);
    };

    return (
        <>
            {/* Concerts Section */}
            <Box p={3} bgcolor="gray.800" color="black" borderRadius={2} boxShadow={3} border={1} borderColor="gray.700" width="101%" maxWidth="1200px" mx="auto" mt={2}>
                <Typography variant="h2" fontWeight="bold" textAlign="center" gutterBottom sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: 0, top: -40, fontSize: '4rem', color: 'pink' }}>🎤</Box>
                    Upcoming Concerts
                    <Box sx={{ position: 'absolute', right: 0, top: -40, fontSize: '4rem', color: 'pink' }}>🎶</Box>
                </Typography>

                <Box display="flex" overflow="auto" gap={2} p={2}>
                    {dataconcerts.map((concert) => (
                        <Card
                            key={concert.id}
                            sx={{
                                bgcolor: "white",
                                color: "black",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: "transform 0.3s ease-in-out",
                                '&:hover': { transform: "scale(1.05)", boxShadow: 6 },
                                cursor: "pointer",
                                minWidth: 350,
                                height: 400,
                            }}
                            onClick={() => openModal(concert)}
                        >
                            <CardMedia
                                component="img"
                                height="150"
                                image={concert.image}
                                alt={concert.name}
                                sx={{ borderRadius: 2, mb: 2 }}
                            />
                            <Typography variant="h3" fontWeight="bold" color="pink.500" gutterBottom>
                                {concert.name}
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color="pink.500" gutterBottom>
                                {dayjs(concert.date).format('DD/MM/YY')}
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2" color="gray">
                                    {concert.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'red' }}>
                                    {concert.location}
                                </Typography>
                            </Box>

                            <Button
                                component={Link}
                                to={`/booking/${concert.id}`}
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 'auto', bgcolor: 'pink.500', '&:hover': { bgcolor: 'pink.400' } }}
                            >
                                Book Now
                            </Button>
                        </Card>
                    ))}
                </Box>

                {/* View All Concerts Button */}
                <Box textAlign="center" mt={3}>
                    <Button
                        component={Link}
                        to="" // เปลี่ยนเป็น URL ของหน้าที่จะแสดงคอนเสิร์ตทั้งหมด
                        variant="outlined"
                        color="secondary"
                        sx={{ bgcolor: 'pink.500', color: 'black', '&:hover': { bgcolor: 'pink.400' } }}
                    >
                        View All Concerts
                    </Button>
                </Box>
            </Box>
<Box p={3} bgcolor="gray.800" color="black" borderRadius={2} boxShadow={3} border={1} borderColor="gray.700" width="101%" maxWidth="1200px" mx="auto" mt={2}>
    <Typography variant="h2" fontWeight="bold" textAlign="center" gutterBottom>
        Upcoming Sports Events
    </Typography>

    <Box display="flex" overflow="auto" gap={2} p={2}>
        {datasportEvents.map((event) => (
            <Card
                key={event.id}
                sx={{
                    bgcolor: "white",
                    color: "black",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out",
                    '&:hover': { transform: "scale(1.05)", boxShadow: 6 },
                    cursor: "pointer",
                    minWidth: 350,
                    height: 400,
                }}
                onClick={() => openModal(event)}
            >
                <CardMedia
                    component="img"
                    height="100%" // Make it responsive within the card
                    image={event.image}
                    alt={event.name}
                    sx={{ borderRadius: 2 }}
                />
            </Card>
        ))}
    </Box>

    {/* View All Sports Events Button */}
    <Box textAlign="center" mt={3}>
        <Button
            component={Link}
            to="" // Change to the URL of the page showing all sports events
            variant="outlined"
            color="secondary"
            sx={{ bgcolor: 'pink.500', color: 'black', '&:hover': { bgcolor: 'pink.400' } }}
        >
            View All Sports Events
        </Button>
    </Box>
</Box>
        </>
    );
};

export default HomeTest;
