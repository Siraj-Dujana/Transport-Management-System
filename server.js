// modules
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const mongoose = require('mongoose');

// Models
const transportSchema = require('./model/TransportSchema.js');
const AdminSchema = require('./model/AdminSchema.js');

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'transport_secret_key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/TransportSetup')
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Middleware to protect routes
function isLoggedIn(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
}

// UUID setup
let fullId = uuidv4();
let shortId;

// 🚧 Transporter Routes (protected)
app.get('/transporter', isLoggedIn, async (req, res) => {
    console.log("GET /transporter");
    shortId = fullId.split("-")[0];
    let Transporters = await transportSchema.find();
    let Total = Transporters.length;
    res.render('index.ejs', { records: Transporters, count: Total, title: "Total", id: shortId });
});

app.post('/transporter', isLoggedIn, async (req, res) => {
    console.log("POST /transporter");
    const { id, transportName, transporterName, pCell, sCell, address, city } = req.body;
    try {
        await transportSchema.create({
            id, transportName, transporterName, pCell, sCell, address, city
        });
        fullId = uuidv4();
        shortId = fullId.split("-")[0];
        res.redirect('/transporter');
    } catch (error) {
        console.log(error);
    }
});

app.get('/transporter/:id/edit', isLoggedIn, async (req, res) => {
    console.log("GET /transporter/:id/edit");
    const { id } = req.params;
    try {
        let transporter = await transportSchema.find({ id });
        if (!transporter.length) return res.send("Not found");
        let data = transporter[0];
        res.render('update.ejs', { data });
    } catch (error) {
        console.log(error);
    }
});

app.patch('/transporter/:id/edit', isLoggedIn, async (req, res) => {
    console.log("PATCH /transporter/:id/edit");
    const { id } = req.params;
    const { transportName, transporterName, pCell, sCell, address, city } = req.body;
    try {
        await transportSchema.updateOne(
            { id },
            { $set: { transportName, transporterName, pCell, sCell, address, city } }
        );
        res.redirect('/transporter');
    } catch (err) {
        console.error("Update failed:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/transporter/:id/delete', isLoggedIn, async (req, res) => {
    console.log("DELETE /transporter/:id/delete");
    const { id } = req.params;
    await transportSchema.deleteOne({ id });
    res.redirect('/transporter');
});

app.post('/search', isLoggedIn, async (req, res) => {
    console.log("POST /search");
    const { id } = req.body;
    shortId = fullId.split("-")[0];
    let records = await transportSchema.find({ id });
    let count = records.length;
    res.render('index', { records, count, title: "Searched", id: shortId });
});

// 🛡️ Admin Auth Routes
app.get('/admin/register', (req, res) => {
    console.log("GET /admin/register");
    res.render('register', { display: false });
});

app.post('/admin/register', async (req, res) => {
    console.log("POST /admin/register");
    const { userName, password, repassword } = req.body;
    try {
        if (password === repassword) {
            await AdminSchema.create({ name: userName, password });
            return res.render('login', { title: null, display: false });
        }
        res.render('register', { display: true });
    } catch (error) {
        console.log(error);
    }
});

app.get('/admin/login', (req, res) => {
    console.log("GET /admin/login");
    res.render('login', { display: false, title: null });
});

app.post('/admin/login', async (req, res) => {
    console.log("POST /admin/login");
    const { userName, password } = req.body;
    const nreg = "Not Registered";
    const inco = "Password or username is incorrect";
    try {
        const record = await AdminSchema.findOne({ name: userName });
        if (!record) {
            return res.render('login', { display: true, title: nreg });
        }
        if (userName !== record.name || password !== record.password) {
            return res.render('login', { display: true, title: inco });
        }

        req.session.isAdmin = true; // ✅ Login success
        return res.redirect('/transporter');
    } catch (error) {
        console.log(error);
    }
    res.render('login');
});

app.get('/admin/logout', (req, res) => {
    console.log("GET /admin/logout");
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});
