const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.port || 8000;

const db = require('./config/mongoose');

// app.use(express.json({ extended: false }));
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/", require("./routes/index"));

app.listen(port, function(err){
    if(err){
        console.log(`Error occured while running the server at ${port}`);
    }
    console.log(`Yup! Successfully running server on ${port}`);
});