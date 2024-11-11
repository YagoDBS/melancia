import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());



app.use((req, res, next) => {
    console.log(`Request requestada: ${req.method} ${req.url}`);
    next();
});

app.use('/api', routes);

connectDB();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao mongo'))
    .catch((erro) => console.error('MongoDB deu erro:', erro));


app.listen(5000, () => {
    console.log('Server ta no port 5000');
});