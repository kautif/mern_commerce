import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://localhost/mern_commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({message: 'Product not found'});
//     }
// })

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// app.get('/', (req, res) => {
//     res.send("Server reached");
// })

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});