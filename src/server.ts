import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { documents } from './documents/documentsRouter';
import cors from 'cors'

const app: Express = express();
app.use(cors())
const port = 3000;
dotenv.config();
app.use(express.json());

// routes
app.use('/', documents);
app.use(express.static('public/files'))

// start the server
app.listen(process.env.BACK_PORT, () => {
    console.log(
        `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
    );
});