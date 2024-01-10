const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users, orders } = require('../model');

router.post('/createOrder', async (req, res) => {
    try {
        const { userId, totalAmount } = req.body;
        if (!userId || !totalAmount) {
            return res.status(400).json({
                error: 'Invalid data'
            })
        }
        await orders.create({ userId, totalAmount: totalAmount });

        res.status(201).json({ message: 'Order Created Successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})


router.get('/fetchOrder', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({
                error: 'Invalid data'
            })
        }
        let orderData = orders.find(userId)
        res.status(200).json({ data: orderData, message: 'Order fetched Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})


router.get('/fetchOrderById', async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({
                error: 'Invalid data'
            })
        }
        let orderDataByID = orders.findById(orderId)
        res.status(200).json({ data: orderDataByID, message: 'Order fetched Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

router.post('/updateOrderById', async (req, res) => {
    try {
        const { orderId, totalAmount } = req.body;
        if (!orderId) {
            return res.status(400).json({
                error: 'Invalid data'
            })
        }
        let orderDataByID = orders.findOneAndUpdate({ _id: orderId }, { totalAmount: totalAmount });
        res.status(200).json({ data: orderDataByID, message: 'Order updated Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

router.post('/deleteOrderById', async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({
                error: 'Invalid data'
            })
        }
        let orderDataByID = orders.findOneUpdate({ _id: orderId }, { isDeleted: true })
        res.status(200).json({ data: orderDataByID, message: 'Order Deleted Successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})