const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static HTML file
app.use(express.static('public'));

// Middleware to capture the IP and log it to ipz.txt
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logEntry = `IP: ${ip} - Date: ${new Date().toISOString()}\n`;

    // Append the IP log to ipz.txt
    fs.appendFile(path.join(__dirname, 'ipz.txt'), logEntry, (err) => {
        if (err) {
            console.error('Failed to log IP:', err);
        }
    });

    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
