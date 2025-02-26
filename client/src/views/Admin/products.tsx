import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Tabs, Tab } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  status: string;
}

const Products: React.FC = () => {
  const [flashsalePro, setFlashsalePro] = useState<Product[]>([]);
  const [flashsaleSport, setFlashsaleSport] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [scarfSport, setScarfSport] = useState<Product[]>([]);
  const [shoeSport, setShoeSport] = useState<Product[]>([]);
  const [shirtSport, setShirtSport] = useState<Product[]>([]);
  const [shirtCon, setShirtCon] = useState<Product[]>([]);
  const [shirtConPro, setShirtConPro] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    image: '',
    status: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>('product');
  const [tabIndex, setTabIndex] = useState(0);

  const fetchProducts = async () => {
    try {
      const [flashsaleProRes, flashsaleSportRes, productsRes, scarfSportRes, shoeSportRes, shirtSportRes, shirtConRes, shirtConProRes] = await Promise.all([
        axios.get('http://localhost:5000/getAllFlashsalePro'),
        axios.get('http://localhost:5000/getAllFlashsaleSport'),
        axios.get('http://localhost:5000/getAllProduct'),
        axios.get('http://localhost:5000/getAllScarfSport'),
        axios.get('http://localhost:5000/getAllShoeSport'),
        axios.get('http://localhost:5000/getAllShirtSport'),
        axios.get('http://localhost:5000/getAllShirtCon'),
        axios.get('http://localhost:5000/getAllShirtConPro')
      ]);

      setFlashsalePro(flashsaleProRes.data);
      setFlashsaleSport(flashsaleSportRes.data);
      setProducts(productsRes.data);
      setScarfSport(scarfSportRes.data);
      setShoeSport(shoeSportRes.data);
      setShirtSport(shirtSportRes.data);
      setShirtCon(shirtConRes.data);
      setShirtConPro(shirtConProRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleTableChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTable(e.target.value as string);
  };

  const handleAddOrUpdate = async () => {
    try {
      const url = isEditing
        ? `http://localhost:5000/updateProduct/${formData.id}`
        : `http://localhost:5000/addProduct?table=${selectedTable}`;
      const method = isEditing ? axios.put : axios.post;
      const response = await method(url, { ...formData, table: selectedTable });

      if (isEditing) {
        setProducts((prev) => prev.map((product) => (product.id === formData.id ? response.data : product)));
        alert('Product updated successfully!');
      } else {
        setProducts((prev) => [...prev, response.data]);
        alert('Product added successfully!');
      }

      setFormData({ id: 0, name: '', price: 0, image: '', status: '' });
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        alert(`Failed to add/update product: ${error.response?.data.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('Failed to add/update product due to an unexpected error.');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number, table: string) => {
    try {
      await axios.delete(`http://localhost:5000/deleteProduct/${id}?table=${table}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.put(`http://localhost:5000/updateProductStatus/${id}`, { status });
      setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, status } : product)));
      alert('Product status updated successfully!');
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Failed to update product status.');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const renderTable = (products: Product[], tableName: string) => (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.image}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Edit />}
                  sx={{ mr: 1 }}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(product.id, tableName)}
                >
                  Delete
                </Button>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={product.status}
                    onChange={(e) => handleStatusChange(product.id, e.target.value as string)}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    <MenuItem value="Discontinued">Discontinued</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Product Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpen}
        sx={{ mb: 4 }}
      >
        Add Product
      </Button>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Flash Sale Products" />
        <Tab label="Flash Sale Sports" />
        <Tab label="Products" />
        <Tab label="Scarf Sports" />
        <Tab label="Shoe Sports" />
        <Tab label="Shirt Sports" />
        <Tab label="Shirt Con" />
        <Tab label="Shirt Con Pro" />
      </Tabs>
      {tabIndex === 0 && renderTable(flashsalePro, 'flashsalepro')}
      {tabIndex === 1 && renderTable(flashsaleSport, 'flashsalesport')}
      {tabIndex === 2 && renderTable(products, 'product')}
      {tabIndex === 3 && renderTable(scarfSport, 'scarfsport')}
      {tabIndex === 4 && renderTable(shoeSport, 'shoesport')}
      {tabIndex === 5 && renderTable(shirtSport, 'shirtsport')}
      {tabIndex === 6 && renderTable(shirtCon, 'shirtcon')}
      {tabIndex === 7 && renderTable(shirtConPro, 'shirtconpro')}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2" mb={2}>
            {isEditing ? 'Edit Product' : 'Add Product'}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Table</InputLabel>
            <Select
              value={selectedTable}
              onChange={handleTableChange}
            >
              <MenuItem value="flashsalepro">FlashsalePro</MenuItem>
              <MenuItem value="flashsalesport">FlashsaleSport</MenuItem>
              <MenuItem value="product">Products</MenuItem>
              <MenuItem value="scarfsport">ScarfSport</MenuItem>
              <MenuItem value="shoesport">ShoeSport</MenuItem>
              <MenuItem value="shirtsport">ShirtSport</MenuItem>
              <MenuItem value="shirtcon">ShirtCon</MenuItem>
              <MenuItem value="shirtconpro">ShirtConPro</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image"
            name="image"
            value={formData.image}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrUpdate}
            sx={{ mt: 2 }}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default Products;