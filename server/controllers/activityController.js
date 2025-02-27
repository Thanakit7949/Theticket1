const express = require('express');
const router = express.Router();

router.get('/getRecentActivities', async (req, res) => {
  const db = req.db;
  const page = parseInt(req.query.page) || 0;
  const limit = 10;
  const offset = page * limit;

  try {
    const [rows] = await db.query(`
      SELECT 
        bu.booking_id AS id, 
        u.first_name AS user_name, 
        'Booking' AS activity_type, 
        bu.booking_time AS activity_time, 
        CONCAT('Booked ', c.name, ' in ', z.name) AS details 
      FROM 
        bookings_user bu
      JOIN 
        users u ON bu.user_id = u.id
      JOIN 
        concerts c ON bu.concert_id = c.id
      JOIN 
        zones z ON bu.zone_id = z.id
      ORDER BY 
        activity_time DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
