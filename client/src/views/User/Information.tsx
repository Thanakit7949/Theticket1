import React from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import pop3 from '/src/assets/product/pop3.jpg'

const Information = () => {
    return (
        <Box
        sx={{
            padding: 4,
            background: "linear-gradient(to right,#E6E6FA,#F0FFFF)", // Light pastel orange background color
            borderRadius: 4,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            margin: 'auto',
            width: "100%",
            maxWidth: "1200px",
            border: '2px solid #ffcc80', // Pastel yellow border color
            textAlign: 'center',
        }}
    >
        <Typography 
           variant="h4" 
           component="h2" 
           align="center" 
           sx={{ 
            fontWeight: 'bold', 
            color: '#483D8B', // Dark pastel orange for the title
            marginBottom: '16px',
            textShadow: '1px 1px 3px rgba(255, 255, 255, 0.8)', // Light text shadow
        }}
        >
             Latest Information & Updates
        </Typography>
        <Typography 
            variant="body1" 
            align="center" 
            style={{ 
                color: '#6d4c41', // Dark brown text color for contrast
                marginBottom: '16px',
                lineHeight: 1.6,
                fontSize: '1.1rem',
            }}
            
        >
             Stay informed with the latest news and updates. Discover innovations, trends, and insights that shape our world today.
             This section will cover a variety of topics, providing you with essential information and highlights.
        </Typography>
    
            <HTMLFlipBook 
                width={1000} 
                height={500} 
                size="fixed"
                minWidth={500}
                maxWidth={1200}
                minHeight={400}
                maxHeight={700}
                showCover={true}
                mobileScrollSupport={true}
                className="flipbook"
                
                
            >
                {/* ปกหนังสือ */}
                <Paper elevation={3} 
                       style={{ 
                           padding: 16, 
                           textAlign: 'center', 
                           display: 'flex', 
                           flexDirection: 'column', 
                           justifyContent: 'center', 
                           alignItems: 'center',
                           backgroundImage: 'url("https://via.placeholder.com/1000x500")', // เพิ่มภาพพื้นหลัง
                           backgroundSize: 'cover', // ให้ภาพขยายเต็มพื้นหลัง
                           borderRadius: 8,
                           color: '#ffffff',
                           position: 'relative' // ใช้ relative เพื่อให้กรอบที่อยู่ด้านหลังอยู่ในตำแหน่งที่ถูกต้อง
                        }}
                >
                    {/* กรอบ Container */}
                    <Box 
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            border: '2px solid #ffffff', // สีกรอบ
                            borderRadius: 8,
                            zIndex: -1 ,// ให้กรอบอยู่ด้านหลังเนื้อหา
    
                        }}
                    />
                    <Typography variant="h3" component="h1" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                        News Book
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: 16, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                        Explore the latest updates and innovations
                    </Typography>
                </Paper>

                {/* หน้า 2-3 (เลย์เอาต์แบบหน้าซ้าย-ขวา) */}
                <Paper elevation={3} style={{ padding: 16, width: '100%', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src="https://via.placeholder.com/400" alt="News 1" style={{ width: '100%', marginLeft:'6px',marginTop:'6px',borderRadius: 8 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" mt="40px" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                                Exciting New Launches!
                            </Typography>
                            <Typography variant="body1"  mt="40px" style={{ lineHeight: 1.6 }}>
                                Stay ahead with all the exciting product launches happening this year!
                                This section provides an overview of new products and innovations that will shape the market in the upcoming months. 
                                Get a closer look at the technology, designs, and features that are expected to drive consumer interest.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* หน้า 4-5 */}
                <Paper elevation={3} style={{ padding: 16, width: '100%', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4" mt="40px" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                                Innovation in Tech
                            </Typography>
                            <Typography variant="body1"  mt="40px" style={{ lineHeight: 1.6 }}>
                                Explore how innovation in tech is shaping the future. From AI advancements to breakthrough technologies in various industries, 
                                this section covers the latest developments that are driving change and redefining possibilities. 
                                Read on to discover how these trends might impact the world in the coming years.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <img src="https://via.placeholder.com/400" alt="Innovation in Tech" style={{ width: '100%',marginTop:'6px', transform: 'translateX(-10px)', borderRadius: 8 }} />
                        </Grid>
                    </Grid>
                </Paper>

                {/* หน้า 6-7 */}
                <Paper elevation={3} style={{ padding: 16, width: '100%', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src="https://via.placeholder.com/400" alt="Global Trends" style={{ width: '100%',marginLeft:'6px',marginTop:'6px', borderRadius: 8 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" mt="40px" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                                World Trends 2024
                            </Typography>
                            <Typography variant="body1" mt="40px" style={{ lineHeight: 1.6 }}>
                                Catch up on the latest global trends for 2024, from economic shifts to social movements. 
                                This section highlights key areas to watch and offers insights into how these trends could affect individuals and businesses worldwide.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* หน้า 8-9 */}
                <Paper elevation={3} style={{ padding: 16, width: '100%', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4" mt="40px" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                                World Trends 2024
                            </Typography>
                            <Typography variant="body1" mt="40px" style={{ lineHeight: 1.6 }}>
                                Catch up on the latest global trends for 2024, from economic shifts to social movements. 
                                This section highlights key areas to watch and offers insights into how these trends could affect individuals and businesses worldwide.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <img src="https://via.placeholder.com/400" alt="Global Trends" style={{ width: '100%',marginTop:'6px', transform: 'translateX(-10px)', borderRadius: 8 }} />
                        </Grid>
                    </Grid>
                </Paper>
                
               
            </HTMLFlipBook>
       
            <Box
                sx={{
                    padding: 4,
                    backgroundColor: '#e3f2fd',
                    borderRadius: 4,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    margin: 'auto',
                    maxWidth: '1200px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '5px solid #87CEFA',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    sx={{
                        marginBottom: 4,
                        color: '#1976d2',
                        fontSize: '2.5rem',
                        textTransform: 'uppercase',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Additional Information
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            icon: '🎉',
                            title: 'Exciting News',
                            text: 'Stay tuned for the latest updates and exciting news!',
                        },
                        {
                            icon: '🚀',
                            title: 'New Launches',
                            text: "We’re launching new products! Don’t miss out on the latest releases.",
                        },
                        {
                            icon: '🌍',
                            title: 'Global Trends',
                            text: "Explore the latest global trends and what’s shaping the world in 2024.",
                        },
                        {
                            icon: '💡',
                            title: 'Innovative Ideas',
                            text: 'Discover innovative ideas that will revolutionize the industry.',
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Box
                                className="card"
                                sx={{
                                    padding: 4,
                                    height: '250px',
                                    border: '2px solid #81d4fa',
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    backgroundColor: '#ffffff',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
                                    },
                                }}
                            >
                                <Box
                                    className="card-icon"
                                    sx={{
                                        fontSize: '80px',
                                        marginBottom: 2,
                                        color: '#ff6b6b',
                                        animation: 'bounce 2s infinite',
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.8rem',
                                        color: '#333',
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        marginBottom: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '1.2rem',
                                        color: '#555',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                
            </Box>
            <style>
                {`
            @keyframes bounce {
                 0%, 20%, 50%, 80%, 100% {
                   transform: translateY(0);
                 }
                40% {
                transform: translateY(-15px);
                }
                60% {
                transform: translateY(-7px);
                }
                
                `}
            </style>
            {/* Scrolling Text with MUI components */}
            <Box 
            component="div" 
            sx={{ 
                position: "relative",
                width: "93%", 
                height: "90px",
                overflow: "hidden", 
                backgroundColor: "#B3E5FC", // ฟ้าพาสเทลอ่อน
                py: 2, 
                px: 4, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                borderRadius: "10px", // มุมโค้งใหญ่ขึ้น
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)", // เพิ่มเงาให้ดูลึก
                marginBottom: "20px", // เพิ่มระยะห่างด้านล่าง
                fontSize: "24px", // ขนาดตัวอักษรใหญ่ขึ้น
                fontWeight: "bold", // ทำให้ข้อความหนาขึ้น
                letterSpacing: "2px", // เพิ่มระยะห่างระหว่างตัวอักษร
                border: "4px solid #90A4AE", // ขอบสีเทาอ่อน
                marginTop: "20px"
            }}
        >
            <Typography 
                component="p" 
                sx={{ 
                    position: "absolute", 
                    whiteSpace: "nowrap", 
                    fontSize: "45px", 
                    fontFamily: "'Quicksand', sans-serif", 
                    fontWeight: "bold", 
                    color: "#E0FFFF", // ข้อความสีขาวเพื่อให้เห็นชัดเจน
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)", // เงาข้อความสีดำอ่อน
                    paddingLeft: "100%",
                    animation: "marquee1 15s linear infinite", 
                    "&:hover": {
                        animationPlayState: "paused", // หยุดแอนิเมชันเมื่อเมาส์ไปอยู่บนข้อความ
                    },
                }}
            >
                ⚠️ Attention: Don't Miss Our Latest Updates! ⚠️
            </Typography>
        </Box>
        <style>
                {`
                @keyframes marquee1 {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                `}
            </style>
 
    <Box
      className="posters-container"
      display="flex"
      justifyContent="space-between"
      gap={3}
      alignItems="center"
      sx={{ width: "100%", padding: 2}}
    >
      {/* Poster 1 */}
      <Box
        className="poster-container"
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "6px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          border: "2px solid #060202",
          gap: "4px",
          position: "relative",
          width: "1100px",
          height: "750px"
        }}
      >
        <Box className="poster-header">
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#738ffe",
              mb: 2,
              fontFamily: "Bangers, sans-serif",
              textTransform: "uppercase",
              textShadow: "0px 0px 15px rgba(255, 0, 255, 0.6), 0px 0px 10px rgba(0, 255, 255, 0.4)",
              animation: "floatUp 2s ease-in-out infinite",
              "@keyframes floatUp": {
                "0%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-8px)" },
                "100%": { transform: "translateY(0)" },
              },
            }}
          >
            Event Announcement
          </Typography>
          <img src={pop3} alt="Don't Miss Out" className="poster-subtitle-img" style={{ maxWidth: "100%" }} />
        </Box>

        <Box className="poster-body" sx={{ my: 4 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#512da8",
              lineHeight: 1.6,
              fontFamily: "Open Sans, sans-serif",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
              animation: "bounceText 1.5s ease-in-out infinite",
              "@keyframes bounceText": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            Join us for an unforgettable event filled with amazing experiences,
            new opportunities, and thrilling moments. Save the date!
          </Typography>
        </Box>

        <Box className="poster-footer" sx={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
          <Button
            className="poster-btn"
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              p: "8px 16px",
              fontSize: "1.2rem",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#0056b3",
                transform: "scale(1.1)",
                boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Poster 2 */}
      <Box
        className="poster-container"
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "6px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          border: "2px solid #060202",
          gap: "4px",
          position: "relative",
          width: "1100px",
          height: "750px"
        }}
      >
        <Box className="poster-header">
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#738ffe",
              mb: 2,
              fontFamily: "Bangers, sans-serif",
              textTransform: "uppercase",
              textShadow: "0px 0px 15px rgba(255, 0, 255, 0.6), 0px 0px 10px rgba(0, 255, 255, 0.4)",
              animation: "floatUp 2s ease-in-out infinite",
              "@keyframes floatUp": {
                "0%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-8px)" },
                "100%": { transform: "translateY(0)" },
              },
            }}
          >
            Event Announcement
          </Typography>
          <img src={pop3} alt="Don't Miss Out" className="poster-subtitle-img" style={{ maxWidth: "100%" }} />
        </Box>

        <Box className="poster-body" sx={{ my: 4 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#512da8",
              lineHeight: 1.6,
              fontFamily: "Open Sans, sans-serif",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
              animation: "bounceText 1.5s ease-in-out infinite",
              "@keyframes bounceText": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            Join us for an unforgettable event filled with amazing experiences,
            new opportunities, and thrilling moments. Save the date!
          </Typography>
        </Box>

        <Box className="poster-footer" sx={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
          <Button
            className="poster-btn"
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              p: "8px 16px",
              fontSize: "1.2rem",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#0056b3",
                transform: "scale(1.1)",
                boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            Learn More
          </Button>
          
        </Box>
        
      </Box>
      
    </Box>
    <Box
  className="posters-container"
  display="flex"
  justifyContent="space-between"
  gap={3}
  alignItems="center"
  sx={{ width: "100%", padding: 2 }}
>
  {/* Poster 1 */}
  {/* Poster Box Code Here */}

  {/* Poster 2 */}
  {/* Poster Box Code Here */}

  {/* Navigation Buttons */}
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ width: "100%", marginTop: 3 }}
  >
    <Button
      variant="outlined"
      sx={{ margin: 1, fontSize: "1rem", padding: "10px 20px" }}
      onClick={() => window.location.href = "/page1in"}
    >
      Page 1
    </Button>
    <Button
      variant="outlined"
      sx={{ margin: 1, fontSize: "1rem", padding: "10px 20px" }}
      onClick={() => window.location.href = "/page2in"}
    >
      Page 2
    </Button>
    <Button
      variant="outlined"
      sx={{ margin: 1, fontSize: "1rem", padding: "10px 20px" }}
      onClick={() => window.location.href = "/page3in"}
    >
      Page 3
    </Button>

  </Box>
</Box>

    </Box>
    

    );
};

export default Information;
