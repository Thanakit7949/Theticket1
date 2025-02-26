const express = require('express');
const router = express.Router();

const getAllOrders = async (req, res) => {
  try {
    const query = `
      SELECT 
        bu.booking_id,
        u.first_name AS user_name,
        c.name AS concert_name,
        z.name AS zone_name,
        bu.booking_time,
        bu.total_price
      FROM 
        bookings_user bu
      JOIN 
        users u ON bu.user_id = u.id
      JOIN 
        concerts c ON bu.concert_id = c.id
      JOIN 
        zones z ON bu.zone_id = z.id
    `;
    const [rows] = await req.db.query(query); // Use the db connection from the request object
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/getAllOrders', getAllOrders);

module.exports = router;
