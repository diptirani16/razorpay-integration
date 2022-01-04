const express = require('express');
const donateController = require('./routes/donate');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({extended: false}));

app.use("/pay", donateController);

app.listen(8080, () => console.log('server running on port 8080'));