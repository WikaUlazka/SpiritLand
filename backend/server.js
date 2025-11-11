import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/index.js';
import spiritRouter from './routes/spirit.routes.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Trasy API
app.use('/api/spirits', spiritRouter);

// Uruchomienie serwera
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Połączono z bazą PostgreSQL i zaktualizowano modele.');

    app.listen(3000, '0.0.0.0', () => {
      console.log('🚀 Backend działa na http://localhost:3000');
    });
  } catch (error) {
    console.error('❌ Błąd przy uruchamianiu serwera:', error);
  }
};

startServer();
