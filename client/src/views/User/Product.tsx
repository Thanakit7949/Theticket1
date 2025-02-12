import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Badge,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slider from "react-slick";
import molly from "/src/assets/home/molly.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [category, setCategory] = useState("Concert");
  const [subCategory, setSubCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [productsImage, setProducts] = useState<any[]>([]);
  const [flashsale, setFlashsale] = useState<any[]>([]);
  const [Shirtcon, setShirtcon] = useState<any[]>([]);
  const [lightstickcon, setlightstickcon] = useState<any[]>([]);
  const [albumcon , setalbumcon] = useState<any[]>([]);
  const [flashsaleSport, setFlashsaleSport] = useState<any[]>([]);
  const [shirtSport, setshirtSport] = useState<any[]>([]);
  const [scarfSport, setscarfSport] = useState<any[]>([]);
  const [shoeSport, setshoeSport] = useState<any[]>([]);
  



  // image
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลรูปภาพจาก Backend
    const fetchProductImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllProduct");
        const data = await response.json();
        setProducts(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductImages();
  }, []);



// CategoryConcert  
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลรูปภาพจาก Backend
    const fetchFlashsale = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllflashsale");
        const data = await response.json();
        setFlashsale(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
   
    const fetchShirtcon = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllshirtcon");
        const data = await response.json();
        setShirtcon(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchLightstick = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllligthstickcon");
        const data = await response.json();
        setlightstickcon(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchAlbumcon= async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllalbumcon");
        const data = await response.json();
        setalbumcon(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFlashsale();
    fetchShirtcon();
    fetchLightstick();
    fetchAlbumcon();

  }, []);


  //CategorySport
  useEffect(() => {
    const fetchFlashsaleSport = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllflashsaleSport");
        const data = await response.json();
        setFlashsaleSport(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchShirtsport= async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllshirtsport");
        const data = await response.json();
        setshirtSport(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchScarfsport= async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllscarfsport");
        const data = await response.json();
        setscarfSport(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchShoesport= async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllshoesport");
        const data = await response.json();
        setshoeSport(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFlashsaleSport();
    fetchShirtsport();
    fetchScarfsport();
    fetchShoesport();
  }, []);



  const concertCategories = [
    {
      label: "Flash Sales",
      products:flashsale,
      // products: [
      //   {
      //     id: 1,
      //     name: "Concert T-Shirt",
      //     price: "500 ฿",
      //     image: "/src/assets/home/molly.jpg",
      //   },
      //   { id: 2, name: "Album", price: "700 ฿", image: "/images/product2.jpg" },
      // ],
    },
    {
      label: "Shirt",
      products: Shirtcon,
      // products: [
      //   {
      //     id: 3,
      //     name: "Special Edition Shirt",
      //     price: "600 ฿",
      //     image: "/images/product3.jpg",
      //   },
      // ],
    },
    {
      label: "Light Stick",
      products: lightstickcon,
      // products: [
      //   {
      //     id: 4,
      //     name: "Light Stick",
      //     price: "300 ฿",
      //     image: "/images/product4.jpg",
      //   },
      // ],
    },
    {
      label: "Album",
      products: albumcon,
      // products: [
      //   { id: 5, name: "Got7", price: "1270 ฿", image: "/images/product4.jpg" },
      // ],
    },
  ];

  const sportsCategories = [
    {
      label: "Flash Sales",
      products:flashsaleSport,
      // products: [
      //   {
      //     id: 6,
      //     name: "Sports Flash Sale Item",
      //     price: "250 ฿",
      //     image: "/images/product5.jpg",
      //   },
      // ],
    },
    {
      label: "Shirt",
      products:shirtSport,
      // products: [
      //   {
      //     id: 7,
      //     name: "Sports Shirt",
      //     price: "700 ฿",
      //     image: "/images/product6.jpg",
      //   },
      // ],
    },
    {
      label: "Scarf",
      products:scarfSport,
      // products: [
      //   {
      //     id: 8,
      //     name: "Sports Scarf",
      //     price: "250 ฿",
      //     image: "/images/product7.jpg",
      //   },
      // ],
    },
    {
      label: "Shoes",
      products:shoeSport,
      // products: [
      //   {
      //     id: 9,
      //     name: "Sports Shoes",
      //     price: "1500 ฿",
      //     image: "/images/product8.jpg",
      //   },
      // ],
    },
  ];

  const navigate = useNavigate();


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleConcertClick = () => {
    setCategory("Concert");
    setSubCategory("");
  };

  const handleSportsClick = () => {
    setCategory("Sports");
    setSubCategory("");
  };

  const handleSubCategoryClick = (subCat: any) => {
    setSubCategory(subCat);
  };
  


  useEffect(() => {
    setSubCategory("Flash Sales");
  }, [category]);

  const handleFavoriteClick = (productId: any) => {
    setFavorites((prevFavorites: any) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id: any) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const handleConfirmPayment = () => {
    // Navigate to ProductDetail with cart data
    navigate("productDetail", { state: { selectedProducts: cart } });
  };

 

  const getProducts = () => {
    // รีเซ็ตการนับ id ใหม่ให้กับสินค้าของหมวดหมู่ที่เลือก
    if (category === "Concert") {
      return (
        concertCategories
          .find((cat) => cat.label === subCategory)
          ?.products.map((product, index) => ({
            ...product,
            id: index + 1, // เริ่มต้น id ใหม่จาก 1
          })) || []
      );
    } else if (category === "Sports") {
      return (
        sportsCategories
          .find((cat) => cat.label === subCategory)
          ?.products.map((product, index) => ({
            ...product,
            id: index + 1, // เริ่มต้น id ใหม่จาก 1
          })) || []
      );
    }
    return [];
  };

  const addToCart = (product: any) => {
    setCart((prevCart: any) => {
      const existingItem = prevCart.find((item: any) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: any) => {
    setCart((prevCart: any) => {
      return prevCart
        .map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item: any) => item.quantity > 0);
    });
  };




  const [cartCount, setCartCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(new Set());

  const handleCartIconClick = (productId: any) => {
    if (!addedToCart.has(productId)) {
      setCartCount((prevCount) => prevCount + 1);
      setAddedToCart((prevSet) => new Set(prevSet).add(productId));
    }
  };

  const products = getProducts();

  return (
    <Box
      sx={{
        padding: 6,
        background: "linear-gradient(to right, #FFD1DC, #D6EFFF)",
        borderRadius: 8,
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
        margin: "auto",
        width: "1090px",
        border: "2px solid #FFA4A2",
        textAlign: "center",
        position: "relative",
        overflow: "hidden", // หรือใช้ auto หากต้องการ scroll
        minHeight: "500px", // กำหนดความสูงเริ่มต้น แต่ปล่อยให้ขยายตามเนื้อหา
      }}
    >
      {/* Title with Icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#6A5ACD",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            position: "relative",
            paddingBottom: "10px",
            borderBottom: "4px solid #CC00FF",
            display: "inline-block",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          🛒 Best Products 🧺
        </Typography>

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "-10px",
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton color="primary">
            <Badge badgeContent={favorites.length} color="error">
              <FavoriteBorderIcon sx={{ fontSize: 32 }} />
            </Badge>
          </IconButton>
          <IconButton color="primary">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ fontSize: 32 }} />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {/* Search Field */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          maxWidth: "300px",
          marginLeft: "auto",
          marginBottom: "30px",
        }}
      >
        <TextField
          fullWidth
          label="Search..."
          id="search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Image Carousel */}
      <Box sx={{ marginBottom: "30px" }}>
        <Slider {...sliderSettings}>
          {productsImage.map((productsImage, index) => (
            <Box
              key={index}
              sx={{ width: "100%", height: "600px", overflow: "hidden", border: "6px solid black",borderRadius: "8px"  }}
            >
              <img
                src={`http://localhost/product/${productsImage.image}`} // ใช้ URL จากฐานข้อมูล
                alt={`Product ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          padding: "16px 0",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginTop: "60px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            margin: "0 20px",
            cursor: "pointer",
            transition: "color 0.3s, transform 0.2s",
            "&:hover": {
              color: "#1976d2",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleConcertClick}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Concerts
          </Typography>
        </Box>

        <Box
          sx={{
            margin: "0 20px",
            cursor: "pointer",
            transition: "color 0.3s, transform 0.2s",
            "&:hover": {
              color: "#1976d2",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleSportsClick}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Sports
          </Typography>
        </Box>
      </Box>

      
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: "12px 16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    borderRadius: "8px",
  }}
>
  {category === "Concert" &&
    concertCategories.map((cat) => (
      <Box
        key={cat.label}
        sx={{
          margin: "0 20px",
          cursor: "pointer",
          color: subCategory === cat.label ? "#1976d2" : "inherit",
          transition: "color 0.3s, transform 0.2s",
          "&:hover": {
            color: "#1976d2",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => handleSubCategoryClick(cat.label)}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {cat.label}
        </Typography>
      </Box>
    ))}

  {category === "Sports" &&
    sportsCategories.map((cat) => (
      <Box
        key={cat.label}
        sx={{
          margin: "0 20px",
          cursor: "pointer",
          color: subCategory === cat.label ? "#1976d2" : "inherit",
          transition: "color 0.3s, transform 0.2s",
          "&:hover": {
            color: "#1976d2",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => handleSubCategoryClick(cat.label)}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {cat.label}
        </Typography>
      </Box>
    ))}
</Box>

<Grid container spacing={4} sx={{ marginTop: 4 }}>
  {(category === "Concert"
    ? concertCategories.find((cat) => cat.label === subCategory)?.products
    : category === "Sports"
    ? sportsCategories.find((cat) => cat.label === subCategory)?.products
    : []
  )?.map((product) => (
    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
      <Box
        sx={{
          border: "2px solid #FFB6C1",
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={`http://localhost/product/${product.folder}/${product.image}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>
           <Typography
           variant="h6"
           sx={{ textDecoration: "line-through", color: "grey" }}
          >
           {product.oldPrice} ฿
         </Typography>
          <Typography
            variant="body1"
            sx={{ color: "red", marginBottom: 1 }}
          >
            {product.price} ฿
          </Typography>
          <IconButton onClick={() => handleFavoriteClick(product.id)}>
            <FavoriteBorderIcon
              color={favorites.includes(product.id) ? "error" : "inherit"}
            />
          </IconButton>
          <IconButton
            onClick={() => handleCartIconClick(product.id)}
            disabled={addedToCart.has(product.id)}
          >
            <ShoppingCartIcon
              color={addedToCart.has(product.id) ? "disabled" : "primary"}
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button onClick={() => removeFromCart(product)}>-</Button>
            <Typography>
              {cart.find((item: any) => item.id === product.id)?.quantity || 0}
            </Typography>
            <Button onClick={() => addToCart(product)}>+</Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>

<Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
  <Button
    variant="contained"
    onClick={handleConfirmPayment}
    color="primary"
    sx={{
      padding: "10px 30px",
      fontWeight: "bold",
      fontSize: "18px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
    }}
  >
    Confirm Payment
  </Button>
</Box>

    </Box>
  );
};

export default Product;


