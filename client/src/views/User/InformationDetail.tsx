import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  IconButton,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Share, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import in1 from "/src/assets/information/in1.jpg";
import in2 from "/src/assets/information/in1.1.jpg";
import in3 from "/src/assets/information/in2.jpg";
import in4 from "/src/assets/information/in2.2.jpg";
import in5 from "/src/assets/information/in3.jpg";
import in6 from "/src/assets/information/in3.3.jpg";
import in7 from "/src/assets/information/in4.4.jpg";
import in8 from "/src/assets/information/in4.jpg";


function InformationDetail() {
  const { id } = useParams();

  const mockInformationDetails = {
    1: {
      subtitle: "GMM MUSIC เปิดตัวค่าย 19 และศิลปินเลือดใหม่",
      detail: `นับเป็นหนึ่งความน่าสนใจในปีนี้กับการเปิดค่าย 19 (ไนน์-ทีน) ค่ายน้องใหม่ล่าสุดในเครือ GMM Music
       ซึ่งหลังจากเฟ้นหาศิลปินในสังกัดกันอย่างเข้มข้นในรายการ 19Lab จากผู้สมัครทั่วประเทศคัดจนเหลือเพียง 91 คน 
       ที่ได้เข้าสู่การทดลองและผ่านกระบวนการคัดเลือกอย่างเข้มข้นจนได้ 5 ศิลปินเดี่ยวที่ได้เซ็นสัญญาและเป็นศิลปินรุ่นแรกของค่าย
        ได้แก่ กอกี้ กวิสรา, QEETHA, fit aroon, ossey และ Jigsaw Story ซึ่งพวกเขาได้ทยอยปล่อยผลงานออกมาอย่างต่อเนื่อง 
        แอดเลยจะมาแนะนำผลงานเพลงของทั้ง 5 ศิลปินรุ่นใหม่มากความสามารถจากค่าย 19 ให้ได้ติดตามกัน`,
      image: in1,
      image1: in2,
      detail2: "เพลง “ประปราย” ที่ถ่ายทอดเกี่ยวกับความหมายและการต่อสู้ของชีวิต มาพร้อมบีทที่หนักแน่นตามสไตล์ Old School Hiphop ที่เป็นเอกลักษณ์ของเจ้าตัว นอกจากผลงานเจ๋งๆ Artist’s Original Song ที่ได้แนะนำไป ล่าสุดพวกเขาทั้ง 5 คนก็ได้เปิดตัว DigitalAlbum “19” อัลบั้มเดบิวต์ที่มีเพลงใหม่ของทั้ง 5 คนอย่างเป็นทางการ ซึ่งในอัลบั้มนี้จะสะท้อนเอกลักษณ์และตัวตนที่แตกต่างของศิลปินแต่ละคน พร้อมทั้งบ่งบอกถึงแนวทางที่ชัดเจนของค่ายในการสร้างความแปลกใหม่และผลักดันศิลปินรุ่นใหม่ให้ก้าวไปข้างหน้าโดยภายในอัลบั้มจะมีเพลง “โอ้ เจ้าดอกไม้” - กอกี้ กวิสรา, “เก่งนักก็ทำเองดิวะ” - QEETHA, “คิดถึงเธออีกแล้ว” - fit aroon, “Zombabe” - ossey และ “รอยสัก” - Jigsaw Story" ,
      video: "https://www.youtube.com/embed/5oAIsyoafSQ?si=1sXlMzTd6aFbRhVE",
      tags: ["GMM Music", "ค่ายเพลง", "ศิลปินใหม่", "เพลงไทย", "ดนตรี"],
    },
    2: {
      subtitle: "j.rabbit” ชวนมาเก็บโมเมนต์ความสุขไปกับซิงเกิลใหม่ “Capture” เพลงป๊อบฟังสบายติดหู!",
      detail: `เก็บเรื่องราวดีๆ ไปกับ “Capture” ซิงเกิลใหม่ของ “j.rabbit” ศิลปินเดี่ยวน้องใหม่จากค่ายเพลง MILK! BKK เพลงป๊อบฟังสนุก! สำหรับคนที่อยากบันทึกทุกช่วงเวลาที่ได้ใช้ร่วมกันกับคนรัก`,
      image: in3,
      image1: in4,
      detail2: "j.rabbit หรือ เจสัน โสตางกูร ศิลปินมากฝีมือจากค่ายเพลง MILK! BKK หลังจากเดบิวต์เป็นศิลปินเดี่ยวพร้อมเพลงจังหวะสนุกอย่าง Loop  และตามด้วยเพลงเอาใจคนดีที่เธอไม่รัก “แค่ดี (it’s not me)” ปลายปีนี้เจสันกลับมาพร้อมเพลงป๊อบฟังสบาย “Capture” สำหรับคนที่อยากบันทึกทุกช่วงเวลาที่ได้ใช้ร่วมกันกับคนรักไว้ในความทรงจำ",
      video: "https://www.youtube.com/embed/nZRW9NU0UGk?si=6_XSPoIOqCUTUUrg",
      tags: ["j.rabbit", "เพลงใหม่", "ป๊อบ", "ความรัก", "MILK! BKK"],
    },
    3: {
      subtitle: "GET TO KNOW LITTLE JOHN วงร็อกฟอร์มดีผู้สร้างปรากฏการณ์เพลงเปิดตัวสุดฮิต “ฉันไม่ต้องการตัวเธอในตอนนี้”",
      detail: `ทำความรู้จักกับ “Little John” วงดนตรีร็อกน้องใหม่จากค่ายเพลง “9Arkkhan” ผู้ที่ปลุกดนตรีร็อกดิบๆ ที่ห่างหายไปนานพร้อมสร้างปรากฏการณ์เพลงไวรัล “ฉันไม่ต้องการตัวเธอในตอนนี้”
ถ้าคุณไถฟีด TikTok แล้วได้ยินเพลงท่อน “ไปจากฉันได้แล้วววว” นั่นแสดงว่าคุณได้สัมผัสถึงความทรมานของการอดทนอยู่กับคนที่ไม่หลงเหลือความรักให้กันอีกต่อไปจากเพลง “ฉันไม่ต้องการตัวเธอในตอนนี้” ผลงานเปิดตัวของวงร็อกน้องใหม่ไฟแรงนามว่า “Little John” จากค่ายเพลง “9Arkkhan (เก้าอัคคัญญ์)” ภายใต้การดูแลของ “จ๋าย อิชณน์กร พึ่งเกียรติรัศมี” หรือที่เรารู้จักกันดีในชื่อ “จ๋าย - ไททศมิตร แม้จะเพิ่งเดบิวต์เป็นศิลปินเต็มตัวไปเมื่อวันที่ 1 สิงหาคมที่ผ่านมา แต่กระแสตอบรับจากแฟนๆ ที่มีต่อ Little John เรียกว่าเกินคาดมากๆ เพราะมียอดฟังบน YouTube สูงกว่า 27 ล้านครั้งเข้าไปแล้ว!! (ข้อมูล ณ วันที่ 16 ตุลาคม 2567) วันนี้ The Concert เลยจะพาทุกคนมาทำความรู้จักกับพวกเขาให้มากขึ้นกัน`,
      image: in5,
      image1: in6,
      detail2: "LITTLE JOHN น้องใหม่ไฟแรงที่พร้อมปลุกเนื้อแท้ของความร็อกให้กลับมาอีกครั้ง ย้อนไปเมื่อปี 2020 มีวัยรุ่นกลุ่มหนึ่งที่อยากถ่ายทอดมุมมองที่มีต่อความรักและสังคมรอบข้างในรูปแบบของตัวเอง เลยเกิดการรวมตัวกันของ 5 สมาชิก โอ๊ค - กัลยกร แก้วกระจ่าง (ร้องนำ), มิว - ฐณาณัฏฐ์ วุฒิอนันต์ชัย (เบส), มีน - ธนา วิภาตะพันธุ์ (กลอง), แฟ้ม - จิณณวัตร คันศร (กีตาร์) และ ปอนด์ - ชิติพัทธ์ ไสไทย (กีตาร์) จนกลายเป็นวงดนตรีแนวเพลงร็อกเข้มๆ ที่ห่างหายไปนานในวงการอุตสาหกรรมเพลงไทยในชื่อ “LITTLE JOHN” โดยคำว่า “LITTLE” หมายถึงกลุ่มดนตรีเล็กๆ ส่วนคำว่า “JOHN” ก็เปรียบเทียบถึงคนทั่วไปที่ไม่แบ่งแยกรูปลักษณ์ ชนชั้น เพศ หรืออายุ ",
      video: "https://www.youtube.com/embed/Hy_BVgkKMRg?si=3aDXDRcAUJ3s8SUC",
      tags: ["Little John", "วงร็อก", "เพลงไวรัล", "ฉันไม่ต้องการตัวเธอในตอนนี้", "เพลงไทย"],
    },
    4: {
      subtitle: "รวมไอดอลไทป์ลูกแมวน้อย น่ารักกระปุ๊กกระปิ๊กที่สุดเลยเหมี๊ยววว ~",
      detail: `นี่แหละๆ “9 ไอดอลไทป์ลูกแมวน้อยน่ารัก ตัวกระปุ๊กกระปิ๊ก” ที่เวลาทำหน้านิ่งหรือหน้าอ้อน ก็มีเสน่ห์น่าฟัด เอ้ย! น่ารักจนพี่ๆ เอ็นดูหนักมากเลยนะเหมี๊ยวววว ~`,
      image: in7,
      image1: in8,
      detail2: "ในเมื่อมีไอดอลไทป์ลูกหมาบ๊อกแบ๊กไปแล้ว.. เพื่อฉลอง “วันแมวสากล (International Cat Day)” ก็ต้องมีเหล่าไอดอลไทป์แมวน้อยน่ารักกระปุ๊กกระปิ๊กที่กลุ่มแฟนคลับนิยามกันไว้ด้วยสิแก ไม่ว่าจะตอนนั่งนิ่งๆ แล้วแอบมีหน้าพร้อมวีนดูเจ้าเล่ห์ แต่บทจะยิ้มหวานพูดจาแบบอ้อนๆ ก็น่ารักและมีเสน่ห์จนใจเจ็บตลอด ซึ่งพฤติกรรมที่แอบสวิทช์ไปมานี่แหละที่ตกหัวใจแฟนคลับได้อย่างมหาศาล จะมีไอดอลคนไหนบ้าง แล้วจะมีไอดอลคนโปรดของคุณด้วยมั้ย ไปดูกันเลยเหมี๊ยววว ",
      video: "https://www.youtube.com/embed/tSk0rMO3m6g?si=FB9tCNyFD8JGrJ-M",
      tags: ["ไอดอลไทย", "ไอดอลน่ารัก", "วันแมวสากล", "ลูกแมวน้อย", "แฟนคลับ"],
    },
  };

  const [informationDetail, setInformationDetail] = useState(mockInformationDetails[id]);

  useEffect(() => {
    setInformationDetail(mockInformationDetails[id]);
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Subtitle */}
      <Typography variant="h3"  fontWeight = "bold" color="black" sx={{ mb: 2 }}>
        {informationDetail.subtitle}
      </Typography>

      {/* Main Image */}
      <Box
        sx={{
          width: "100%",
          height: 500,
          backgroundImage: `url(${informationDetail.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          mb: 4,
          boxShadow: "0 6px 30px rgba(0, 0, 0, 0.3)",
        }}
      ></Box>

      {/* Detail */}
      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
        {informationDetail.detail}
      </Typography>

      {/* Secondary Image */}
      <Box sx={{ mb: 4 }}>
        <Box
          component="img"
          src={informationDetail.image1}
          alt="Detail Image 1"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 3,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>

      {/* Additional Detail */}
      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
        {informationDetail.detail2}
      </Typography>

      {/* Video Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Watch Video
        </Typography>
        <Box
          component="iframe"
          src={informationDetail.video}
          title="Video"
          width="100%"
          height="600px"
          sx={{
            border: "none",
            borderRadius: 3,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        ></Box>
      </Box>

      {/* Tags Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tags
        </Typography>
        <Box>
          {informationDetail.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              color="primary"
              sx={{
                 mr: 1, 
                 mb: 1,
                 fontSize: '1.2rem', // ปรับขนาดตัวอักษร
                padding: '0.5rem 1rem', // ปรับระยะขอบภายใน
                borderWidth: '2px', // ปรับความหนาของเส้นขอบ
                
                
                }}
            />
          ))}
        </Box>
      </Box>

      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => window.history.back()}
        sx={{
          textTransform: "none",
          color: "primary.main",
          borderColor: "primary.main",
          ":hover": {
            backgroundColor: "primary.light",
            borderColor: "primary.main",
            color: "white",
          },
        }}
      >
        กลับไป
      </Button>
    </Container>
  );
}

export default InformationDetail;
