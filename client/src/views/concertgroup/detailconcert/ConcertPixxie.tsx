import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link
import pixxieImage from "/src/assets/concert/pixxie_con/pixxi1.jpg";
import pixxie1Image from "/src/assets/concert/pixxie_con/pixxi2.jpg";
import pixxie2Image from "/src/assets/concert/pixxie_con/pixxi3.jpg";
import image1 from "/src/assets/concert/pixxie_con/pixxi4.jpg";
import image2 from "/src/assets/concert/pixxie_con/pixxi5.jpg";
import image3 from "/src/assets/concert/pixxie_con/pixxi6.jpg";
import image4 from "/src/assets/concert/pixxie_con/pixxi8.jpg";
import image5 from "/src/assets/concert/pixxie_con/pixxi9.jpg";
import image6 from "/src/assets/concert/pixxie_con/pixxi10.jpg";

const images = [image1, image2, image3, image4, image5, image6];

function ConcertPixxie() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        PIXXIE
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        “ꜰᴇᴀᴛ” ซิงเกิลจาก “ᴘɪxxɪᴇ” ศิลปินชื่อดัง
        งานนี้เอ็มวีใส่เต็มทุกองค์ประกอบ แถมแรงบันดาลใจยังได้จากเทพนิยายกรีกอีก
        ทำเอาแฟนๆ ชอบหนักมาก...
      </Typography>

      {/* เพิ่มรูปภาพ */}
      <Box
        component="img"
        src={pixxieImage}
        alt="pixxie"
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
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        หากจะพูดถึงวงเกิร์ลกรุ๊ปที่มาแรงในขณะนี้ จะต้องมีชื่อ 3 สาว ᴘɪxxɪᴇ
        มาเบล, พิมมา และ อิงโกะ จากค่าย ʟɪᴛ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ
        ที่ไม่ว่าจะปล่อยเพลงหรือมี ชาเลนจ์ท่าเต้นไหน แฟนๆ
        หลายคนก็ให้ความสนใจเป็นอย่างมาก เพราะนอกจากสาวๆ
        จะมีเพอร์ฟอร์แมนซ์ที่น่าจับตามองแล้ว
        แต่ละคนยังมีบุคลิกที่แตกต่างที่เต็มไปด้วยความน่ารักและมีเสน่ห์
        ทำให้แฟนเพลงหลายคนต้องโดนตกกันไปเต็มๆ
      </Typography>

      <Box
        component="img"
        src={pixxie1Image}
        alt="pixxie"
        sx={{
          width: "100%",
          maxWidth: "700px",
          height: "auto",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ล่าสุด ᴘɪxxɪᴇ ส่งเพลงใหม่มาให้ได้ติดตามอย่าง ꜰᴇᴀᴛ ที่ย่อมาจากคําว่า
        ꜰᴇᴀᴛᴜʀɪɴɢ ที่แปลว่า ผู้ร่วมแสดงรับเชิญ
        ซึ่งมักจะถูกนํามาใช้เวลาศิลปินรับเชิญมาร้องเพลงร่วมกัน
        ซึ่งในเนื้อหาเพลงนี้หมายถึงความรู้สึกที่เรากําลังสนใจใครสักคน
        จนอยากเชิญเขามาทําความรู้จักกัน
        เพลงนี้จึงถือเป็นสื่อกลางในการชวนมาทำความรู้จักกัน
        เหมือนในท่อนเพลงที่ร้องว่า “ᴄᴏᴍᴇ ᴏɴ ʟᴇᴛ’ꜱ ꜰ-ᴇ-ᴀ-ᴛ”
      </Typography>

      <Box
        component="img"
        src={pixxie2Image}
        alt="pixxie"
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "auto",
          marginTop: 2,
          borderRadius: 2,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ในเอ็มวีเพลงนี้ก็เรียกได้ว่าทำถึง ใส่เต็มทุกองค์ประกอบ นำเสนอในรูปแบบ
        ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ และ ꜰᴀꜱʜɪᴏɴ โดยได้แรงบันดาลใจมาจากเทพนิยายกรีก “เทพีมอยเร”
        สามพี่น้องปั่นด้ายแห่งโชคชะตา 3 สาว ᴘɪxxɪᴇ ก็เตรียมพร้อมที่จะมา ꜰᴇᴀᴛ
        กับทุกคนด้วยเสน่ห์สุดเหลือล้น
        ซึ่งครั้งนี้ได้จัดเต็มความแฟนตาซีและแฟชั่นที่จะทำให้ทุกคนหลงเสน่ห์
        ฟังแล้วเหมือนถูกสะกดจิตไปกับเพลงนี้
        จังหวะเพลงที่มีเอกลักษณ์เฉพาะตัวของพวกเธอ
        ทำให้กลายมาเป็นอีกหนึ่งผลงานเพลงที่ไม่ควรพลาดเลยทีเดียว
      </Typography>

      {/* แถวที่มี 6 รูปภาพ */}
      {[0, 1, 2, 3].map(
        (
          row 
        ) => (
            <Box
            key={row}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginTop: 4,
            }}
          >
            {images.slice(row * 3, row * 3 + 3).map(
              (
                src,
                index // เปลี่ยนเป็น 3
              ) => (
                <Box
                  key={index}
                  component="img"
                  src={src}
                  alt={`Image ${row * 3 + index + 1}`}
                  sx={{
                    width: "100%",
                    maxWidth: "300px", // ปรับขนาดตามต้องการ
                    height: "auto",
                    borderRadius: 2,
                  }}
                />
              )
            )}
          </Box>
        )
      )}

      <Typography
        variant="h5"
        sx={{
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        การออกแบบท่าเต้นของเพลงยังรวบรวมความรู้สึกขี้เล่นของความโรแมนติกที่มีเสน่ห์
        ท่าเต้นโดดเด่นเป็นพิเศษด้วยการเคลื่อนไหวที่เป็นธรรมชาติ
        และแสดงออกถึงความเท่ ความน่ารัก และความเซ็กซี่ผ่านท่าเต้นของเพลง
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
         height="515"
         src="https://www.youtube.com/embed/1FztEbqElt0?si=rcrAjFTzlBQ7OkvI"
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
          background: "linear-gradient(to right, black, #d500f9)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ติดตามฟังเพลงและชมมิวสิควิดีโอ เพลง ꜰᴇᴀᴛ ได้ตั้งแต่วันนี้ที่ ʏᴏᴜᴛᴜʙᴇ/ ʟɪᴛ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ และติดตามความเคลื่อนไหวต่างๆได้ทาง
        ɪɴꜱᴛᴀɢʀᴀᴍ: ʟɪᴛ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ, ᴘɪxxɪᴇ, ꜰᴀᴄᴇʙᴏᴏᴋ: ʟɪᴛ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ, ᴘɪxxɪᴇ, ᴛɪᴋᴛᴏᴋ: ʟɪᴛᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ.ᴛʜ, ᴘɪxxɪᴇ
      </Typography>

      {/* เพิ่มกรอบที่มีข้อความ "กลับไป concert" */}
      <Link to="/concert" style={{ textDecoration: "none" }}>
        {" "}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            border: "2px solid #ba68c8", // สีกรอบเป็นสีเขียวพาสเทล
            backgroundColor: "#ce93d8", // สีพื้นหลัง
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#e1bee7", // สีเขียวเข้มเมื่อเมาส์ไปโดน
            },
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "#6a1b9a" }}>
          
            กลับไปหน้า concert
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default ConcertPixxie;
