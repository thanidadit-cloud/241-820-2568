const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(express.json()); // ให้รองรับการส่งข้อมูลแบบ JSON
app.use(cors());         // อนุญาตให้หน้าเว็บ (Frontend) ส่งข้อมูลมาได้

let conn = null;

// เชื่อมต่อกับ MySQL ใน Docker (Port 8820)
const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root', // รหัสผ่านใน docker-compose
            database: 'webdb',
            port: 8820 
        });
        console.log('✅ Connected to MySQL (Docker Port 8820)');
    } catch (err) {
        console.error('❌ MySQL Connection Error:', err.message);
    }
};

initMySQL();

// รับข้อมูลจากหน้าเว็บ (POST /users)
app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, age, gender, interests, description } = req.body;
        
        // บันทึกลงตารางชื่อ users
        const sql = 'INSERT INTO users (firstName, lastName, age, gender, interests, description) VALUES (?, ?, ?, ?, ?, ?)';
        await conn.query(sql, [firstName, lastName, age, gender, JSON.stringify(interests), description]);

        res.json({ message: 'บันทึกข้อมูลลงฐานข้อมูลแล้ว!' });
    } catch (err) {
        console.error('Server Error:', err.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่ Server' });
    }
});

app.listen(8000, () => {
    console.log('🚀 API Server running on http://localhost:8000');
});