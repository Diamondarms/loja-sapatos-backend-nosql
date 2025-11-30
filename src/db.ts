import mongoose from 'mongoose';

const connectionString = process.env.DATABASE_URL as string;

async function dbConnect() {
  try {
    await mongoose.connect(connectionString);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

export default dbConnect;
