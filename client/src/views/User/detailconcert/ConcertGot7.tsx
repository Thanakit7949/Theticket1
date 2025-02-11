import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link
import gotImage from "/src/assets/concert/got7_con/got71.jpeg";
import got1Image from "/src/assets/concert/got7_con/got2.jpg";
import got3Image from "/src/assets/concert/got7_con/got3.jpg";
import image1 from "/src/assets/concert/got7_con/got4.jpg";
import image2 from "/src/assets/concert/got7_con/got5.jpg";
import image3 from "/src/assets/concert/got7_con/got6.jpg";
import image4 from "/src/assets/concert/got7_con/got8.jpg";
import image5 from "/src/assets/concert/got7_con/got9.jpg";
import image6 from "/src/assets/concert/got7_con/got10.jpg";
import image7 from "/src/assets/concert/got7_con/got11.jpg";
import image8 from "/src/assets/concert/got7_con/mv.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7];

function ConcertGot7() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        GOT7
      </Typography>
      {/* เพิ่มรูปภาพ */}
      <Box
        component="img"
        src={gotImage}
        alt="got7"
        sx={{
          width: "100%",
          maxWidth: "900px",
          height: "auto",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, #4caf50, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        GOT7 ที่เป็นผลงานล่าสุด หลังแยกย้ายกันไปตามเส้นทางของตัวเอง
        พวกเขากลับมาทำตามสัญญาที่ให้ไว้กับอากาเซ่ “เราจะร้องเพลงให้คุณฟัง” เพลง
        “NANANA” ผลงานที่เป็นเหมือนเส้นทางที่บรรจบกันของดาว 7 ดวง
      </Typography>

      <Box
        component="img"
        src={got1Image}
        alt="got7"
        sx={{
          width: "100%",
          maxWidth: "750px",
          height: "500px",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, #4caf50, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        เรียกได้ว่าเป็นศิลปินที่ฮอตไม่มีแผ่วจริงๆ สำหรับ 7 หนุ่ม GOT7
        แม้จะแยกย้ายกันไปทำงานเดี่ยวตามความถนัดของแต่ละคน
        แต่เมื่อได้โอกาสกลับมารวมตัวกันอีกครั้งแฟนคลับก็ยังให้การต้อนรับอย่างดี
        หลังจากประกาศว่าจะคัมแบคและปล่อยอัลบั้มใหม่
        ซึ่งเป็นการรียูเนียนรวมตัวสมาชิกทั้ง 7
        แบบครบทีมก็ทำเอาเหล่าอากาเซ่ใจฟูไม่ไหว
        เพราะนี่ถือว่าเป็นการคัมแบคคัมใจในรอบ 1 ปี 3 เดือน
        กับเพลงไตเติลที่มาพร้อมความสดใสอย่าง “NANANA” ที่พวกเขา GOT7
        เชื่อว่าทุกคนจะสามารถสนุกไปด้วยกันได้!
      </Typography>

      <Box
        component="img"
        src={got3Image}
        alt="got7"
        sx={{
          width: "100%",
          maxWidth: "900px",
          height: "300px",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, #4caf50, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ต้องบอกว่าการตัดสินใจไม่ต่อสัญญากับค่าย JYP Entertainment ของ GOT7
        เมื่อช่วงต้นปี 2021 นั้นถือเป็นข่าวที่บีบหัวใจเหล่าอากาเซ่อย่างมาก
        แต่ถึงแม้ว่าเหล่าเมมเบอร์จะไม่ได้ต่อสัญญากับค่าย
        พวกเขาก็ไม่ได้หายหน้าหายตาไปไหน ยังคงเดินตามความฝันที่ตัวเองรัก
        แยกย้ายกันไปทำงานตามความถนัดของตัวเอง
        ซึ่งงานเดี่ยวของแต่ละคนก็ปังสะบัดไม่น้อยหน้าใคร
      </Typography>

      {/* แถวที่มี 7 รูปภาพ  */}
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
                maxWidth: "300px", // ปรับขนาดตามต้องการ
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
          background: "linear-gradient(to right, #4caf50, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ในที่สุดเส้นทางของดาว 7 ดวงก็มาบรรจบกันอีกครั้ง กลับมารวมตัวกันในฐานะ
        GOT7 พร้อมปล่อยมินิอัลบั้มใหม่เอาใจเหล่าอากาเซ่
        กับอัลบั้มพิเศษที่มีชื่อเดียวกับวง และเพลงไตเติลของอัลบั้มมีชื่อว่า
        “NANANA” เพลงที่เต็มไปด้วยพลังและสีสันอันเป็นเอกลักษณ์ของวง GOT7
        ที่ผสมผสานออกมาในสไตล์ป๊อปที่โดดเด่นด้วยไลน์เสียงกีตาร์
        อีกหนึ่งความพิเศษของเพลงนี้คือได้ลีดเดอร์ของวงอย่าง JayB
        มาเป็นโปรดิวเซอร์ร่วมกับ iHwak และ Royal Dive
        ทำให้ภาพรวมของเพลงมีสีสันและซาวด์ดนตรีที่จัดจ้านขึ้น
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
          src="https://www.youtube.com/embed/IZ0oQ6nzKxo?si=nW8tMaEsljdkMfSA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            borderRadius: "16px", // เพิ่มความโค้งมนที่นี่
          }}
        ></iframe>
      </Box>

      <Box
        component="img"
        src={image8}
        alt="got7"
        sx={{
          width: "100%",
          maxWidth: "1050px",
          height: "600px",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          background: "linear-gradient(to right, #4caf50, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        ฟังเพลง ‘ɴᴀɴᴀɴᴀ’ ได้แล้ววันนี้ในทุกสตรีมมิ่งแพลตฟอร์มทาง ʏᴏᴜᴛᴜʙᴇ : GOT7
      </Typography>

      {/* เพิ่มกรอบที่มีข้อความ "กลับไป concert" */}
      <Link to="/concert" style={{ textDecoration: "none" }}>
        {" "}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            backgroundColor: "#a5d6a7", // สีพื้นหลัง
            color: "green",
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#f8bbd0", // สีเขียวเข้มเมื่อเมาส์ไปโดน
              color: "#e91e63",
            },
          }}
        >
          <Typography variant="h6" textAlign="center">
            กลับไปหน้า concert
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default ConcertGot7;
