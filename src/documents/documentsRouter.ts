import { Router } from 'express';
import { upload, testPostDocument, getAllFiles, deleteDocument, downloadDocument } from './documentsController';

export const documents = Router();

// documents.get('/', cors(corsOptions), (req: Request, res: Response): void => {
//   res.send("What's up doc ?!");
// });

documents.post("/", upload.single('file'), testPostDocument)

documents.get('/', getAllFiles);

documents.delete('/:id/:name', deleteDocument);

documents.get('/', downloadDocument);