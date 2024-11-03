import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link
import busImage from "/src/assets/concert/bus_con/bus1.jpg";
import bus1Image from "/src/assets/concert/bus_con/bus2.png";
import image1 from "/src/assets/concert/bus_con/bus3.jpg";
import image2 from "/src/assets/concert/bus_con/bus4.jpg";
import image3 from "/src/assets/concert/bus_con/bus5.jpg";
import image4 from "/src/assets/concert/bus_con/bus6.jpg";
import image5 from "/src/assets/concert/bus_con/bus7.jpg";
import image6 from "/src/assets/concert/bus_con/bus8.jpg";
import image7 from "/src/assets/concert/bus_con/bus9.jpg";
import image8 from "/src/assets/concert/bus_con/bus10.jpg";
import image9 from "/src/assets/concert/bus_con/bus11.jpg";
import image10 from "/src/assets/concert/bus_con/bus12.jpg";
import image11 from "/src/assets/concert/bus_con/bus13.jpg";
import image12 from "/src/assets/concert/bus_con/bus14.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];

function ConcertBus() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        ʙᴜꜱ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ʏᴏᴜ ɪ ꜱʜɪɴᴇ
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ʏᴏᴜ ɪ ꜱʜɪɴᴇ
      </Typography>

      {/* เพิ่มรูปภาพ */}
      <Box
        component="img"
        src={busImage}
        alt="Bus Because of You I Shine"
        sx={{
          width: "100%",
          maxWidth: "1100px",
          height: "auto",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ‘TRANSFORMER’ เพลงใหม่ล่าสุดจาก ‘BUS because of you i shine’
        ที่มาพร้อมกับความเท่ ดุดัน และโตขึ้นกว่าที่ผ่านมา
      </Typography>

      <Box
        component="img"
        src={bus1Image}
        alt="Bus Because of You I Shine"
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: "600px",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ‘ᴛʀᴀɴꜱꜰᴏʀᴍᴇʀ’ เพลงจาก ʙᴜꜱ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ʏᴏᴜ ɪ ꜱʜɪɴᴇ
        กับการรวมตัวครั้งสำคัญของทีม ᴘʀᴏᴅᴜᴄᴇʀ ระดับโลกอย่างทีม ᴍᴏɴᴏᴛʀᴇᴇ (ꜱᴏᴜᴛʜ
        ᴋᴏʀᴇᴀ) และ ทีม ᴛʜᴇ ʜᴇʟʟᴏ ɢʀᴏᴜᴘ (ᴜꜱᴀ) ร่วมกับทีม ꜱᴏɴʀᴀʏ ᴍᴜꜱɪᴄ (ᴛʜᴀɪʟᴀɴᴅ)
        นำโดย ᴍᴏᴏꜰ, ʀᴏᴋᴍᴀɴ, ᴀʟᴀᴡɴ ที่เคยฝากผลงานไว้กับศิลปินชื่อดัง อาทิ ᴛᴠxǫ!,
        ᴄʜᴇɴ, ɴᴄᴛ127, ᴡᴀʏᴠ, (ɢ)ɪ-ᴅʟᴇ, ɪᴠᴇ และอื่นๆ อีกมากมาย มาร่วมสรรสร้างค์กับ
        ᴘʀᴏᴅᴜᴄᴇʀ ฝั่งไทย อย่าง ᴍᴇᴋ ᴍᴀᴄʜɪɴᴀ และ ᴀᴜᴛᴛᴀ โดยได้ ᴋᴇɴ ʟᴇᴡɪꜱ
        ผู้อยู่เบื้องหลังเพลงดังของ ᴛᴀʏʟᴏʀ ꜱᴡɪꜰᴛ และศิลปินอื่นๆ ระดับโลก
        มานั่งแท่นเป็น ᴇɴɢɪɴᴇᴇʀɪɴɢ ᴍɪxᴇʀ (ɢʀᴀᴍᴍʏ ᴡɪɴɴᴇʀ) นำเสนอในแนวเพลง
        ᴇʟᴇᴄᴛʀᴏɴɪᴄ ʜɪᴘ ʜᴏᴘ ᴅᴀɴᴄᴇ รับรองการันตีซาวด์ดนตรี ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ ที่จัดจ้าน
        ดุเดือด อย่างแน่นอน
      </Typography>

      {/* แถวที่มี 12 รูปภาพ โดยแบ่งเป็น 3 แถว */}
      {[0, 1, 2].map((row) => (
        <Box
          key={row}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 4,
          }}
        >
          {images.slice(row * 4, row * 4 + 4).map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Image ${row * 4 + index + 1}`}
              sx={{
                width: "100%",
                maxWidth: "230px", // ปรับขนาดตามต้องการ
                height: "auto",
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
      ))}

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        อีกทั้งทางด้านการออกแบบท่าเต้น ᴄʜᴏʀᴇᴏɢʀᴀᴘʜʏ ในครั้งนี้ ได้ ꜱᴇᴀ ɴɪ
        ผู้ออกแบบท่าเต้น และเป็นครูฝึกสอนให้กับศิลปินดังอย่าง ɴᴄᴛ
        และเคยเป็นผู้ออกแบบท่าเต้นเพลง ʟɪᴍɪᴛ ʙʀᴇᴀᴋ จากรายการ 789 ꜱᴜʀᴠɪᴠᴀʟ
        มาออกแบบท่าสไตล์ ʜɪᴘ ʜᴏᴘ ผสมผสานการเต้น ʀᴏʙᴏᴛɪᴄ ᴅᴀɴᴄᴇ
        ꜱᴛʏʟᴇโดยมีกิมมิคคอนเซปท์การสร้างสรรค์ผลงานให้ ʙᴜꜱ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ʏᴏᴜ ɪ ꜱʜɪɴᴇ
        มีการเคลื่อนไหวเหมือนหุ่นยนต์ประกอบและแยกร่างกันเพื่อใ้ห้เกิดไดนามิคในภาพ
        และสีสันใหม่ในผลงานของ ʙᴜꜱ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ʏᴏᴜ ɪ ꜱʜɪɴᴇ
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={4}
      >
        <iframe
          width="860"
          height="450"
          src="https://www.youtube.com/embed/t1ePxnWG3us?si=VNW0SQ2VRz2ztRtH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            borderRadius: "16px", // เพิ่มความโค้งมนที่นี่
          }}
        ></iframe>
      </Box>
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ฟังเพลง ‘ᴛʀᴀɴꜱꜰᴏʀᴍᴇʀ’ ได้แล้ววันนี้ในทุกสตรีมมิ่งแพลตฟอร์ม
        เเละรับชมเอ็มวีพร้อมกันวันที่ 30 ตุลาคม 2567 เวลา 19:00 น. ทาง ʏᴏᴜᴛᴜʙᴇ :
        ᴛᴀᴅᴀ ʟᴀʙᴇʟꜱ
      </Typography>

            {/* เพิ่มกรอบที่มีข้อความ "กลับไป concert" */}
            <Link to="/concert" style={{ textDecoration: "none" }}> {/* ลิงค์ไปที่ home-user */}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            border: "2px solid #A5D6A7", // สีกรอบเป็นสีเขียวพาสเทล
            backgroundColor: "#a5d6a7", // สีพื้นหลัง
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#C8E6C9", // สีเขียวเข้มเมื่อเมาส์ไปโดน
            },
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "green"}}>
            กลับไปหน้า concert
          </Typography>
        </Box>
      </Link>

    </Box>
  );
}

export default ConcertBus;
