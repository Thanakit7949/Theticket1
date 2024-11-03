import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link
import lyknImage from "/src/assets/concert/lykn_con/lykn1.jpg";
import lykn1Image from "/src/assets/concert/lykn_con/lykn2.jpg";
import lykn2Image from "/src/assets/concert/lykn_con/lykn3.jpg";
import image1 from "/src/assets/concert/lykn_con/lykn4.jpg";
import image2 from "/src/assets/concert/lykn_con/lykn5.jpg";
import image3 from "/src/assets/concert/lykn_con/lykn6.jpg";
import image4 from "/src/assets/concert/lykn_con/lykn7.jpg";
import image5 from "/src/assets/concert/lykn_con/lykn8.jpg";
import image6 from "/src/assets/concert/lykn_con/lykn9.jpg";

const images = [image1, image2, image3, image4, image5, image6];

function ConcertLykn() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
      LYKN
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, black, #d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        “ʟʏᴋɴ” ส่งซิงเกิลใหม่ “โฮ่ง! (ꜱᴜɢᴏɪ)” แนวเพลงแทนใจคนคลั่งรัก! 
      </Typography>

      {/* เพิ่มรูปภาพ */}
      <Box
        component="img"
        src={lyknImage}
        alt="lykn"
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
          background: "linear-gradient(to right, black, #d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        หากจะพูดถึงวงเกิร์ลกรุ๊ปที่มาแรงในขณะนี้ จะต้องมีชื่อ 3 สาว ᴘɪxxɪᴇ มาเบล, พิมมา และ อิงโกะ จากค่าย ʟɪᴛ ᴇɴᴛᴇʀᴛᴀɪɴᴍᴇɴᴛ 
        ที่ไม่ว่าจะปล่อยเพลงหรือมี ชาเลนจ์ท่าเต้นไหน แฟนๆ หลายคนก็ให้ความสนใจเป็นอย่างมาก เพราะนอกจากสาวๆ 
        จะมีเพอร์ฟอร์แมนซ์ที่น่าจับตามองแล้ว แต่ละคนยังมีบุคลิกที่แตกต่างที่เต็มไปด้วยความน่ารักและมีเสน่ห์ ทำให้แฟนเพลงหลายคนต้องโดนตกกันไปเต็มๆ
      
      </Typography>

      <Box
        component="img"
        src={lykn1Image}
        alt="lykn"
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
          background: "linear-gradient(to right, black,#d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        หลังจากมูฟออนจากเพลงเศร้าอย่าง “ความรักไม่ได้น่ากลัวขนาดนั้น (ᴛʀᴜꜱᴛ ᴍᴇ)” 
  5 หนุ่ม “ʟʏᴋɴ” วิลเลี่ยม-จักรภัทร, เลโก้-รพีพงศ์, นัท-ธนัท, ฮง-พิเชฐพงศ์, ตุ้ย-ชยธร บอยแบนด์สุดฮอต
   จาก “ʀɪꜱᴇʀ ᴍᴜꜱɪᴄ” ก็กลับมาเซอร์ไพร์สแฟน ๆ ด้วยแนวเพลงและสไตล์ดนตรีครั้งใหม่ ในซิงเกิลล่าสุด “โฮ่ง! (ꜱᴜɢᴏɪ)”
    ฉีกแนวเพลงใหม่ที่ไม่เคยทำมาก่อนกับ “ᴇʟᴇᴄᴛʀᴏɴɪᴄ ʜɪᴘʜᴏᴘ” โดยได้คนดนตรีคุณภาพอย่าง “ᴋᴀɴɢꜱᴏᴍᴋꜱ” 
    (แกงส้ม ธนทัต) มานั่งแท่น ᴘʀᴏᴅᴜᴄᴇʀ และแต่งเนื้อร้องให้
      </Typography>

      <Box
        component="img"
        src={lykn2Image}
        alt="lykn"
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
          background: "linear-gradient(to right, black,#d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        และความโฮ่งยังไม่หมดแต่เพียงเท่านี้ เพราะในซิงเกิลนี้หนุ่มๆ 
  จาก ʟʏᴋɴ ก็ได้มาร่วมแต่งเพลงนี้ด้วยเช่นกัน ทั้ง “ᴛᴜɪ (ᴛᴜɪᴄʜᴀʏᴀᴛᴏʀɴ)” ที่เข้ามาทำในส่วนของเนื้อเพลง
   และ “ʜᴏɴɢ (ʜᴏɴɢꜱʜɪ)” & “ʟᴇɢᴏ (ʟᴇɢᴏ ʀᴀᴘᴇᴇᴘᴏɴɢ)” ที่เข้ามาร่วมแต่ง อีกทั้ง “ʟᴇɢᴏ (ʟᴇɢᴏ ʀᴀᴘᴇᴇᴘᴏɴɢ)” 
   ยังได้มีส่วนร่วมในการออกแบบท่าเต้นสร้างความโฮ่งใหม่ให้กับ ʟʏᴋɴ ด้วยลุคและสไตล์ที่ฉีกกว่าเดิมในส่วนของมิวสิควิดีโอเพลงนี้อีกด้วย
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
                    height: "320px",
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
          background: "linear-gradient(to right, black, #d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        5 หนุ่ม “ʟʏᴋɴ” เผยว่า “สำหรับซิงเกิลนี้ถือเป็นเพลงที่ ʟʏᴋɴ กลับมาโชว์ ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ 
        แน่นๆ เหมือนเดิม หลังปล่อยเพลงช้าฟังเพราะๆ ให้แฟนๆ ได้ฟังกัน และแม้เพลงนี้จะหนักไปที่การเต้น ใช้เอนเนอร์จี้เยอะ 
        แต่ก็มีความยากในเรื่องของการร้อง ด้วยความที่ท่อนฮุคจะมีคำที่เป็นคำฮิตในสมัยนี้ด้วยอย่างคำว่า ‘โฮ่ง’ 
        (ศัพท์วัยรุ่นที่นิยมใช้กันในช่วงนึงที่นิยามความท็อป ความโดดเด่น) และมีภาษาญี่ปุ่นในเนื้อร้อง พวกเราก็ตั้งใจพยายามทำกันอย่างเต็มที่ 
        เพื่อให้งานออกมาดีที่สุด ซึ่งที่มาของชื่อเพลงนี้ก็เป็นช่วงที่พวกเราได้คุยกับ ‘พี่แกงส้ม’ ระหว่างแต่งเนื้อร้อง โดยมี ‘ตุ้ย-ฮง-เลโก้’
         เข้ามาร่วมช่วยแต่งด้วย จนได้ชื่อว่า ‘โฮ่ง! (ꜱᴜɢᴏɪ)’ ออกมา กับเนื้อหาฟีลคลั่งรัก สร้างความมั่นใจให้กับคนที่เรารักในสไตล์ ʟʏᴋɴ 
         ว่าตอนนี้ไม่ต้องกังวลในความรักของเราเลย เพราะมันโฮ่งมาก ส่วนพาร์ทมิวสิควิดีโอก็จะมีความสตรีทมากขึ้น มีความซ่าๆ สไตล์ ʟʏᴋɴ เช่นกัน
          บวกกับมีกลิ่นอายความเป็นญี่ปุ่น สไตลิ่งที่ชัดเจนมากขึ้นกับแนววัยรุ่นญี่ปุ่น”
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
         src="https://www.youtube.com/embed/nFp4zjAARFs?si=soSlvxP3WeIMwBzQ"
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
          background: "linear-gradient(to right, black, #d50000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ติดตามซิงเกิลใหม่ “โฮ่ง! (ꜱᴜɢᴏɪ)”
         จากศิลปินวง “ʟʏᴋɴ” ได้แล้ววันนี้ ทาง ʏᴏᴜᴛᴜʙᴇ : ʀɪꜱᴇʀ ᴍᴜꜱɪᴄ 
         และ ᴍᴜꜱɪᴄ ꜱᴛʀᴇᴀᴍɪɴɢ ทุกช่องทาง และสามารถติดตามข่าวสารได้ที่
          ꜰᴀᴄᴇʙᴏᴏᴋ, ɪɴꜱᴛᴀɢʀᴀᴍ, x ของ ʀɪꜱᴇʀ ᴍᴜꜱɪᴄ และติดตามความเคลื่อนไหวอื่นๆ
           ได้ที่ ꜰᴀᴄᴇʙᴏᴏᴋ / ɪɴꜱᴛᴀɢʀᴀᴍ / x / ᴛɪᴋᴛᴏᴋ : ʟʏᴋɴ ᴏꜰꜰɪᴄɪᴀʟ
      </Typography>

      {/* เพิ่มกรอบที่มีข้อความ "กลับไป concert" */}
      <Link to="/home-user" style={{ textDecoration: "none" }}>
        {" "}
        {/* ลิงค์ไปที่ home-user */}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            border: "2px solid #f44336", // สีกรอบเป็นสีเขียวพาสเทล
            backgroundColor: "#e57373", // สีพื้นหลัง
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#ffcdd2", // สีเขียวเข้มเมื่อเมาส์ไปโดน
            },
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "#d50000" }}>
            กลับไปหน้า concert
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default ConcertLykn;
