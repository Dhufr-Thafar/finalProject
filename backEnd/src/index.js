const express = require("express");
var cors = require('cors')
require("dotenv").config()
const dbconnect= require("./dbconnect")
const app = express();

app.use(cors())
// parse requests of content-type -
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mySQL application." });
});

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

let postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}.`);
});