import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Paper, Grid, Container, } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';


function InformationDetail() {
    const [Informationdetail, setinformationdetail] = useState<any[]>([]);
    const { id } = useParams(); 
      useEffect(() => {
        
    const fetchInformationdetail = async () => {
      try {
        const response = await fetch('http://localhost:5000/getInformationdetail');
        const data = await response.json();
        setinformationdetail(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
   fetchInformationdetail();
    }, []);

    return (
        
        <Container maxWidth="lg">
            {/* Hero Section */}
             {/* ปุ่มย้อนกลับ */}
             <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => window.history.back()}
                sx={{
                    textTransform: 'none',
                    mb: 3,
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    marginTop: '20px',
                    ':hover': {
                        backgroundColor: 'primary.light',
                        borderColor: 'primary.main',
                        color: 'white',
                        
                    },
                }}
            >
                กลับไป
            </Button>
            
            {Informationdetail.map((Informationdetail, index) => (
            <Box
            key={index}
                sx={{
                    position: 'relative',
                    height: 600,
                    backgroundImage: `url(${Informationdetail.image1})`,
                    backgroundSize: 'cover', // แสดงภาพเต็ม container
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: 2,
                    mb: 4,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        px: 3,
                    }}
                >
                       <img
                src={`http://localhost/information/${Informationdetail.image1}`}
                alt={Informationdetail.title}
                style={{
                  width: "100%", // รักษาขนาดภาพให้เต็มกรอบ
                  height: "auto", // ปรับความสูงให้เป็นอัตโนมัติเพื่อรักษาสัดส่วน
                  maxHeight: "500px", // กำหนดความสูงสูงสุดสำหรับรูปภาพ
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
                    {/* <Typography variant="h3" fontWeight="bold">
                        {Informationdetail.title}
                    </Typography> */}
                </Box>
            </Box>
            ))}
           

            {/* Section Content */}
            {Informationdetail.map((Informationdetail, index) => (
            <Grid key={index} container spacing={8}>
                {/* รายละเอียด */}
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            รายละเอียด
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            {Informationdetail.detail}
                        </Typography>
                    </Paper>
                </Grid>

            
            </Grid>
            ))}
            {/* รูปภาพเพิ่มเติม */}
            
            {Informationdetail.map((Informationdetail, index) => (
            <Box
            key={index}
                component="img"
                src={`http://localhost/information/${Informationdetail.image2}`}
                alt="รายละเอียดเพิ่มเติม"
                sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    mt: 4,
                    boxShadow: 3,
                }}
                
            />
        ))}
          {Informationdetail.map((Informationdetail, index) => (
             <Typography key={index} variant="body1" color="text.secondary" sx={{ lineHeight: 1.8  , marginTop: '20px'}}>
                {Informationdetail.descript}
                        </Typography>
          ))}
           
        </Container>
    );
}

export default InformationDetail;
