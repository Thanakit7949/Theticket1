import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link
import enhypenImage from "/src/assets/concert/enhypen_con/en1.jpg";
import enhy1penImage from "/src/assets/concert/enhypen_con/enn.jpg";
import enhy2penImage from "/src/assets/concert/enhypen_con/en3.jpg";
import image1 from "/src/assets/concert/enhypen_con/enn1.jpg";
import image2 from "/src/assets/concert/enhypen_con/enn2.jpg";
import image3 from "/src/assets/concert/enhypen_con/enn3.jpg";
import image4 from "/src/assets/concert/enhypen_con/enn4.jpg";
import image5 from "/src/assets/concert/enhypen_con/enn5.jpg";
import image6 from "/src/assets/concert/enhypen_con/enn6.jpg";
import image7 from "/src/assets/concert/enhypen_con/enn7.jpg";
import image8 from "/src/assets/concert/enhypen_con/enn8.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

function ConcertHypen() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
      ENHYPEN
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ᴇɴʜʏᴘᴇɴ คัมแบ็คอัลบั้มหมายเลขสอง และ “xᴏ (ᴏɴʟʏ ɪꜰ ʏᴏᴜ ꜱᴀʏ ʏᴇꜱ)”
           7 หนุ่มพร้อมทุ่มเททุกอย่างเพื่อ ‘ความรัก’ ขอแค่คุณอนุญาตเท่านั้นแหละ!
      </Typography>

      {/* เพิ่มรูปภาพ */}
      <Box
        component="img"
        src={enhypenImage}
        alt="enhypen"
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
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        หนึ่งในบอยแบนด์ที่โดดเด่นที่สุดนาทีนี้ “ᴇɴʜʏᴘᴇɴ” 
        เปิดบทใหม่บนเส้นทางสายดนตรีกับสตูดิโออัลบั้มชุดที่ 2 “ʀᴏᴍᴀɴᴄᴇ : ᴜɴᴛᴏʟᴅ” 
        ที่นำเสนอความหวานยิ่งขึ้่น และน่ารักยิ่งขึ้นผ่านเสียงดนตรีโดย 7 หนุ่ม ᴊᴜɴɢᴡᴏɴ, ʜᴇᴇꜱᴇᴜɴɢ, ᴊᴀʏ, ᴊᴀᴋᴇ, ꜱᴜɴɢʜᴏᴏɴ, ꜱᴜɴᴏᴏ และ ɴɪ-ᴋɪ
        “จนถึงตอนนี้พวกเรากลับมาพร้อมกับสไตล์ดนตรีที่แตกต่างกันทุกครั้ง เพลงของเราเป็นไปตามเนื้อเรื่องของแต่ละอัลบั้ม 
        และในครั้งนี้เรามุ่งเน้นไปที่แนวคิดเรื่องความโรแมนติกและความรักครับ 
        มันคือการเปลี่ยนแปลงที่สดใสขึ้นกว่าเพลงแนวมืดดาร์กๆที่พวกเราเป็นที่รู้จักก่อนหน้านี้ 
        เราสามารถเปลี่ยนแปลงได้เสมอตามประสบการณ์หรือทิศทางของเรา ณ ตอนนั้นครับ” ᴊᴜɴɢᴡᴏᴏ กล่าว
      </Typography>

      <Box
        component="img"
        src={enhy1penImage}
        alt="enhypen"
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
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
       “ʀᴏᴍᴀɴᴄᴇ: ᴜɴᴛᴏʟᴅ” มาเป็นอัลบั้มเต็มของ ᴇɴʜʏᴘᴇɴ ในรอบสองปีและเก้าเดือนหากนับจากอัลบั้มเต็มชุดแรก “ᴅɪᴍᴇɴꜱɪᴏɴ: ᴅɪʟᴇᴍᴍᴀ” (2021) ในอัลบั้มเต็มชุดที่สองชุดนี้ของพวกเขามีทั้งหมด 10 เพลง โดยเป็นเพลงที่ถ่ายทอดอารมณ์ที่ยังไม่สุกงอมของชายหนุ่มอีกครั้ง ดังที่วงทำมาโดยตลอดนับตั้งแต่เปิดตัวในปี 2020 โดยเน้นไปที่อารมณ์ที่ยังไม่เติบโตเป็นผู้ใหญ่แต่บริสุทธิ์ซึ่งเกิดขึ้นท่ามกลางความหลงใหลในความโรแมนติก
“นี่เป็นการเริ่มเรื่องราวโรแมนติกบทใหม่สำหรับเรา” ꜱᴜɴᴏᴏ กล่าว “ก่อนหน้านี้คือเป็นซีรีส์ ʙʟᴏᴏᴅ แต่ตอนนี้เริ่มต้นซีรีส์ ʀᴏᴍᴀɴᴄᴇ ครับ เราเตรียมตัวมามากจริงๆ ดังนั้นเราหวังว่าคุณจะตั้งตารอสิ่งที่เรานำเสนอนะครับ”
“เราอยากกลับมาพร้อมกับอัลบั้มที่เกี่ยวข้องกับความรักอย่างลึกซึ้ง” ʜᴇᴇꜱᴇᴜɴɢ กล่าว “คีย์เวิร์ดของอัลบั้มคือ ความรัก และแต่ละเพลงบอกเล่าเรื่องราวของความรักในรูปแบบที่แตกต่างกัน โดยพื้นฐานแล้วมันเป็นคือเรื่องเดียวที่เล่าผ่านเพลงที่แตกต่างกัน”
เพลงไตเติ้ลของอัลบั้ม 
      </Typography>

      <Box
        component="img"
        src={enhy2penImage}
        alt="enhypen"
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
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
      xᴏ (ᴏɴʟʏ ɪꜰ ʏᴏᴜ ꜱᴀʏ ʏᴇꜱ) คือเพลงสรุปธีมที่น่ารักของอัลบั้มได้อย่างสมบูรณ์แบบ โดยเป็นการบอกเล่าเรื่องราวของชายหนุ่มที่ พร้อมจะทุ่มเททุกสิ่งทุกอย่างเพื่อความรัก เพียงแค่ ‘คุณ’ อนุญาต และเพลงยังพิเศษยิ่งขึ้นตรงที่ได้ ᴊᴠᴋᴇ เจ้าขิงเพลงฮิตสุดละมุนของ ʙɪʟʟʙᴏᴀʀᴅ ʜᴏᴛ 100 ɢᴏʟᴅᴇɴ ʜᴏᴜʀ มาร่วมทำเพลงด้วยและได้เพิ่มความไพเราะให้เพลงด้วย
      ꜱᴜɴɢʜᴏᴏɴ เผยว่าเพลงนี้ สะท้อนให้เห็นถึงความสัมพันธ์ที่ขาดไม่ได้ระหว่าง ᴇɴʜʏᴘᴇɴ และแฟนด้อม ᴇɴɢᴇɴᴇ เพราะวง เติบโตและได้รับความแข็งแกร่งจากการยอมรับและความรักของแฟนๆครับ...ตอนเราได้ยินทำนองนี้ครั้งแรก มันติดหูมากจนเราคิดว่าทุกคนน่าจะชอบมันครับ
      </Typography>

      {/* แถวที่มี 8 รูปภาพ */}
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
                maxWidth: "270px", // ปรับขนาดตามต้องการ
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
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
      การออกแบบท่าเต้นของเพลงยังรวบรวมความรู้สึกขี้เล่นของความโรแมนติกที่มีเสน่ห์ ท่าเต้นโดดเด่นเป็นพิเศษด้วยการเคลื่อนไหวที่เป็นธรรมชาติซึ่งแสดงคำว่า xᴏ 
      “เราพยายามลดเสน่ห์อันมืดมนของอัลบั้มก่อนๆของเราลง และแสดงออกถึงความเท่ ความน่ารัก และความเซ็กซี่ผ่านท่าเต้นของเพลงไตเติ้ลใหม่” ᴊᴀᴋᴇ อธิบาย โดยเน้นย้ำถึงความพยายามที่ใส่ลงไปในการเคลื่อนไหว
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
           src="https://www.youtube.com/embed/FPDYeRk2PO8?si=lrqILJEnedjxGikk"
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
          background: "linear-gradient(to right, black, #f44336)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ฟังเพลง ‘xᴏ (ᴏɴʟʏ ɪꜰ ʏᴏᴜ ꜱᴀʏ ʏᴇꜱ)’ ได้แล้ววันนี้ในทุกสตรีมมิ่งแพลตฟอร์ม และทาง ʏᴏᴜᴛᴜʙᴇ : ʜʏʙᴇ ʟᴀʙᴇʟꜱ
      </Typography>

            {/* เพิ่มกรอบที่มีข้อความ "กลับไป concert" */}
            <Link to="/home-user" style={{ textDecoration: "none" }}> {/* ลิงค์ไปที่ home-user */}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            border: "2px solid #ff9800", // สีกรอบเป็นสีเขียวพาสเทล
            backgroundColor: "#ffab40", // สีพื้นหลัง
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#ffe0b2", // สีเขียวเข้มเมื่อเมาส์ไปโดน
            },
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "#e65100"}}>
            กลับไปหน้า concert
          </Typography>
        </Box>
      </Link>

    </Box>
  );
}

export default ConcertHypen;
