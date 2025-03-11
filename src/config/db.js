import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis do .env
dotenv.config();

const uri = process.env.MONGO_URI;

export const conectarBanco = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ Conectado ao banco de dados');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados', error);
    }
};
