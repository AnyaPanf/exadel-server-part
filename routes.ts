import express from 'express';
import { documents } from './documents/documentsRouter';
import { document } from './documents/documentsController';

export const routes = express.Router();

routes.use(documents);
routes.use(document)