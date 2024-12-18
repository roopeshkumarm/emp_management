const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'employee_management',
    port: '3306'
});

db.connect((error) => {
    if (error) {console.log('Error connecting to the database:', error);} 
    else {console.log('Database connected');}
});

app.post("/", (req, res) => {
    const { name, employeeId, email, phone, department, joiningDate, role } = req.body;

    const checkQuery = "SELECT * FROM employees WHERE employeeId = ? OR email = ?";
    db.query(checkQuery, [employeeId, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (result.length > 0) {
            return res.json({ success: false, message: "Employee already exists." });
        }

        const insertQuery = "INSERT INTO employees (name, employeeId, email, phone, department, joiningDate, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [name, employeeId, email, phone, department, joiningDate, role], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.json({ success: true, message: 'Employee added successfully' });
        });
    });
});

app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM employees WHERE employeeId = ?";
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (result.affectedRows > 0) {
            return res.json({ success: true, message: 'Employee deleted.' });
        } else {
            return res.json({ success: false, message: 'Employee not found' });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server running on ${PORT}');
});
