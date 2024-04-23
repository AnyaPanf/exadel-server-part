import { Request, Response } from 'express'
import multer from "multer";
const sqlite3 = require('sqlite3').verbose();

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//data base
// const db = new sqlite3.Database('../all_documents.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Connected to the all_documents SQlite database.');
// });
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });

export const upload = multer({ storage: storage })

export const testPostDocument = (req: Request, res: Response) => {
    try {
        const db = new sqlite3.Database('../all_documents.db');
        console.log(req.file);
        const query = `INSERT INTO documents (name) VALUES ('${req.file?.filename}')`;
        db.run(query);
        db.close();
        res.status(200).send('Your file is successfully uploaded!');
    } catch (error) {
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
};