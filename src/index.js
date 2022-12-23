import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import unauthRouter from './routes/unauth.routes.js';
import authRouter from './routes/auth.routes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(unauthRouter);
app.use(authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`running in port ${PORT}`));
