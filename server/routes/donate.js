require('dotenv').config();
const express = require('express');
const app = express();

const Razorpay = require('razorpay');

app.post('/donate', async (req, res) => {
    try {
        const razorpayInstance = new Razorpay({
            key_id: process.env.REACT_APP_KEY_ID,
            key_secret: process.env.REACT_APP_KEY_SECRET
        })

        const options = {
            amount: 500.00,
            currency: 'INR',
            // receipt: 'receipt_order_74394'
        }

        const order = await razorpayInstance.orders.create(options);
        if(!order) return res.status(500).send('something went wrong!')
        res.json(order);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;