import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Conectado ao mongus: ${conn.connection.host}`);
    } catch (erro) {
        console.error(`Erro: ${erro.message}`);
        process.exit(1);
    }
};

export default connectDB;
