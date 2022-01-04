require('dotenv').config();
const crpto = require('crypto');
const express = require('express');
const app = express();

const Razorpay = require('razorpay');

app.post('/donate', async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.REACT_APP_KEY_ID,
            key_secret: process.env.REACT_APP_KEY_SECRET
        })

        const options = {
            amount: 500.00,
            currency: 'INR'
        }

        const order = await instance.orders.create(options);
        if(!order) return res.status(500).send('something went wrong!')
        res.json(order);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/success', (req, res) => {
    try {
        const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        })
        
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;