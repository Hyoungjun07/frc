// Importing Express module
// const express = require("express");
import express from "express";

// Import dotenv module.
import dotenv from "dotenv";
dotenv.config();

// Create an express instance
const app = express();

// Define a route to handle GET requests
app.get("/", function(req, res) {
    res.send("Hello World!");
});

// Read in PORT number.  Set 3000 to default value
const PORT = process.env.DB_PORT || 3000;

// Set up server listening
app.listen(PORT, function() {
    console.log(`server is running on port ${PORT}`);
});