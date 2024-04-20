import { Request, Response } from 'express'
import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploadedFiles/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

export const upload = multer({ dest: './src/uploadedFiles/' })
// export const Data = multer({ storage: storage });

export const testPostDocument = (req: Request, res: Response) => {
    try {
        res.status(200).send('Your file is successfully uploaded!');
    } catch (error) {
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
};