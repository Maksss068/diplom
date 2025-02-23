const pool = require('../db');

const saveMessage = async (userId, message) => {
    const result = await pool.query(
        'INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *',
        [userId, message]
    );
    return result.rows[0];
};

const getMessages = async () => {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 20');
    return result.rows;
};

module.exports = { saveMessage, getMessages };
