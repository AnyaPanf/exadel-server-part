import express, { Express, Request, Response }from 'express'
import { Router } from 'express';

export const documents = Router();

documents.get('/', (req: Request, res: Response): void => {
  res.send("What's up doc ?!");
});