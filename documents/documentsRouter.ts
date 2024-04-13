import { Request, Response } from 'express'
import { Router } from 'express';
import { testPostDocument } from './documentsController';

export const documents = Router();

documents.get('/', (req: Request, res: Response): void => {
  res.send("What's up doc ?!");
});

documents.post("/", testPostDocument)
