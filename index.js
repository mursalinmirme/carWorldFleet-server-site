const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4100;

app.get('/', async(req, res) => {
    res.send("Hi, I am successfully placed in local server. My sub category data will comming soon...");
})



app.listen(port, () => {
    console.log(`The current port: ${port} is running now!`);
})













