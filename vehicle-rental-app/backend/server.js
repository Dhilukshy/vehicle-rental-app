const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'rental_db'
});

// REGISTER
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    db.query(
        "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
        [name, email, hashed, role],
        (err) => {
            if (err) return res.send(err);
            res.send({ message: "Registered" });
        }
    );
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
        if (result.length > 0 && await bcrypt.compare(password, result[0].password)) {
            res.send(result[0]);
        } else {
            res.status(401).send({ message: "Invalid" });
        }
    });
});

// ADD VEHICLE
app.post('/addVehicle', (req, res) => {
    const { owner_id, vehicle_name, type, price, location, contact, image } = req.body;
    db.query(
        "INSERT INTO vehicles (owner_id,vehicle_name,type,price,location,contact,image_url) VALUES (?,?,?,?,?,?,?)",
        [owner_id, vehicle_name, type, price, location, contact, image],
        () => res.send({ message: "Added" })
    );
});

// GET VEHICLES
app.get('/vehicles', (req, res) => {
    const { type, location } = req.query;
    let query = "SELECT * FROM vehicles WHERE 1=1";
    let params = [];

    if (type) {
        query += " AND type=?";
        params.push(type);
    }
    if (location) {
        query += " AND location LIKE ?";
        params.push('%' + location + '%');
    }

    db.query(query, params, (err, data) => res.send(data));
});

app.listen(3000, () => console.log("Server running"));