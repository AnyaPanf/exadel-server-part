import { Request, Response } from 'express'
import { Router } from 'express';
import { testPostDocument, Data } from './documentsController';
import cors from 'cors'

export const documents = Router();

const corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200
}

documents.get('/', cors(corsOptions), (req: Request, res: Response): void => {
  res.send("What's up doc ?!");
});

documents.post("/", Data.any(), testPostDocument) 
