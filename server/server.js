const express = require('express');
const donateController = require('./routes/donate');
const app = express();

app.use(express.json({extended: false}));

app.use("/donate", donateController);

app.listen(8080, () => console.log('server running on port 8080'));