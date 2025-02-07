import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import { useNavigate } from 'react-router-dom';
//import { blue } from '@mui/material/colors';




const Information = () => {
  const [InformationBook, setinformationbook] = useState<any[]>([]);
  const [AdditionalInformation, setadditionalinformation] = useState<any[]>([]);
  const [EventPoster, seteventposter] = useState<any[]>([]);


  const navigate = useNavigate();

    const handleViewMore = (book:any) => {
        navigate(`informationdetail/${book.id}`); // เปลี่ยนไปยัง URL ใหม่
    };
  


  const defaultIcons = ['🎉', '🚀', '🌍', '💡'];

  
  useEffect(() => {
    
const fetchInformationBook = async () => {
  try {
    const response = await fetch('http://localhost:5000/getInformationbook');
    const data = await response.json();
    setinformationbook(data); 
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchInformationBook();
}, []);



//AdditionalInformation
  useEffect(() => {
    
const fetchAdditionalInformation = async () => {
  try {
    const response = await fetch('http://localhost:5000/getAdditionalInformation');
    const data = await response.json();
    setadditionalinformation(data); 
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchAdditionalInformation();
}, []);




//EventPoster
  useEffect(() => {
    
const fetchEventposter = async () => {
  try {
    const response = await fetch('http://localhost:5000/getEventPoster');
    const data = await response.json();
    seteventposter(data); 
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchEventposter();
}, []);

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
      
 {InformationBook.map((InformationBook, index) => (
    <Paper
        key={index}
        elevation={4}
        style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: '#f9f9f9', // สีพื้นหลังอ่อน
            borderRadius: 12,
        }}
    >
        <Grid container spacing={4} alignItems="center">
            {/* รูปภาพ */}
            <Grid item xs={12} md={6}>
                <img
                    src={`http://localhost/information/${InformationBook.image}`}
                    alt={InformationBook.title}
                    style={{
                      width: '100%',
                      height: '450px',
                      maxHeight: '800px', // จำกัดความสูง
                      objectFit: 'contain', // แสดงภาพทั้งหมดโดยไม่ตัด
                      marginTop: 40,
                      marginLeft: 10,
                      borderRadius: 12,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                />
            </Grid>
            {/* ข้อความ */}
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    style={{
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: 16,
                        position: 'relative', // ใช้ตำแหน่งแบบ relative
                        top: '20px', // ขยับขึ้น 20px
                    }}
                >
                    {InformationBook.title}
                </Typography>
                <Typography
                    variant="body1"
                    style={{
                        lineHeight: 1.8,
                        color: '#555',
                        fontSize: '1.1rem',
                        marginTop: '35px'
                    }}
                >
                    {InformationBook.detail}
                </Typography>
              <Grid
            container
           justifyContent="center" // จัดแนวนอนให้อยู่กลาง
           alignItems="center"     // จัดแนวตั้งให้อยู่กลาง
    style={{
        textAlign: 'center',  // จัดเนื้อหาให้อยู่ตรงกลาง
        marginTop: 24,        // เพิ่มระยะห่างจากด้านบน
        
    }}
>
    <button
        style={{
            display: 'flex', // จัดให้เนื้อหาในปุ่มเรียงในแนวนอน
            alignItems: 'center', // จัดไอคอนและข้อความให้อยู่กลาง
            justifyContent: 'center',
            padding: '14px 24px',
            background: 'linear-gradient(90deg, #4CAF50, #3a9d40)', // เพิ่ม Gradient
            color: '#fff',
            border: 'none',
            borderRadius: '12px', // เพิ่มความโค้งมน
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: 24,
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // เพิ่มเงาให้ดูชัดขึ้น
            transition: 'all 0.3s ease-in-out',
        }}
        onClick={() => handleViewMore(InformationBook)}
    >
        <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>📖</span> {/* ไอคอน */}
        ดูเพิ่มเติม
    </button>
</Grid>


            </Grid>
        </Grid>
    </Paper>
))}


               
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
                <Grid container spacing={3}>
                {AdditionalInformation.map((AdditionalInformation, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
            <Box
                sx={{
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                {/* รูปภาพ */}
                <Box
                    component="img"
                    src={`http://localhost/information/${AdditionalInformation.image}`} // เพิ่ม property "image" ใน AdditionalInformation
                    sx={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: 2,
                        marginBottom: 2,
                    }}
                />

                {/* หัวข้อ */}
                <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.4rem', // เพิ่มขนาดตัวอักษรให้ใหญ่ขึ้น
                      fontWeight: 'bold', // ใช้ตัวหนา
                      color: '#333', // สีปกติ
                      textTransform: 'uppercase', // ตัวอักษรเป็นตัวพิมพ์ใหญ่
                      marginBottom: 1,
                      letterSpacing: '0.1rem', // เพิ่มช่องว่างระหว่างตัวอักษร
                      transition: 'color 0.3s, transform 0.3s', // เพิ่ม transition
                      '&:hover': {
                          color: '#ff6b6b', // เปลี่ยนสีเมื่อ hover
                          transform: 'scale(1.1)', // ขยายขนาดเมื่อ hover
                      },
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // เพิ่มเงา
                    }}
                >
                    {AdditionalInformation.title}
                </Typography>

                {/* รายละเอียด */}
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '1rem',
                        color: '#666',
                    }}
                >
                    {AdditionalInformation.description}
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
                width: "100%", 
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
  display="grid"
  sx={{
    gridTemplateColumns: "repeat(2, 1fr)", // สร้าง 2 คอลัมน์
    gap: 3, // ระยะห่างระหว่างคอลัมน์และแถว
    width: "100%",
    padding: 2,
  }}
>
  {EventPoster.map((EventPoster, index) => (
    <Box
      key={index}
      className="poster-container"
      sx={{
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
        width: "100%", // ให้ปรับขนาดตาม container
        height: "680px",
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
            textShadow:
              "0px 0px 15px rgba(255, 0, 255, 0.6), 0px 0px 10px rgba(0, 255, 255, 0.4)",
            animation: "floatUp 2s ease-in-out infinite",
            "@keyframes floatUp": {
              "0%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-8px)" },
              "100%": { transform: "translateY(0)" },
            },
          }}
        >
          {EventPoster.title}
        </Typography>

        <img
          src={`http://localhost/information/${EventPoster.image}`}
          className="poster-subtitle-img"
          style={{ maxWidth: "100%", height: "480px" }}
        />
      </Box>

      <Box className="poster-body" sx={{ my: 4 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#512da8",
            lineHeight: 1.4,
            fontFamily: "Open Sans, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
            animation: "bounceText 1.5s ease-in-out infinite",
            "@keyframes bounceText": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        >
          {EventPoster.text}
        </Typography>
      </Box>

      
      
    </Box>
  ))}



       
      
      
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
  {/* <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ width: "100%", marginTop: 3 }}
  >
    <Button
      variant="outlined"
      sx={{ margin: 1, fontSize: "1rem", padding: "10px 20px" }}
      onClick={() => window.location.href = "/Information/page1in"}
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

  </Box> */}
</Box>

    </Box>
    

    );
};

export default Information;
