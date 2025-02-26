const express = require('express');
const router = express.Router();

const addProduct = async (req, res) => {
  try {
    const { table } = req.query;
    if (!table) {
      return res.status(400).json({ message: 'Table name is required' });
    }
    const productData = req.body;

    // Add product to the database
    const query = `INSERT INTO ${table} (name, price, image, status) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [productData.name, productData.price, productData.image, productData.status]);
    const newProduct = { id: result.insertId, ...productData };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { table, ...productData } = req.body;
    if (!table) {
      return res.status(400).json({ message: 'Table name is required' });
    }

    // Update product in the database
    const query = `UPDATE ${table} SET name = ?, price = ?, image = ?, status = ? WHERE id = ?`;
    await db.query(query, [productData.name, productData.price, productData.image, productData.status, id]);

    res.status(200).json({ id, ...productData });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

router.post('/addProduct', addProduct);
router.put('/updateProduct/:id', updateProduct);

module.exports = router;
