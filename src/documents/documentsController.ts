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

export const upload = multer({ storage: storage })

export const testPostDocument = (req: Request, res: Response) => {
    try {
        const db = new sqlite3.Database('./uploadedFiles.db');
        const query = `INSERT INTO documents(name) VALUES ('${req.file?.filename}')`;
        db.run(query);
        db.close();
        res.status(200).send('Your file is successfully uploaded!');
    } catch (error) {
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
};

export const getAllFiles = (req: Request, res: Response) => {
    const db = new sqlite3.Database('./uploadedFiles.db');
    const sql = `SELECT DISTINCT id FROM documents
           ORDER BY created_at DESC`;

    const documentsArr: {
        id: number, name: string, created_at: number
    }[] = []

    db.all(sql, [], (err: string, rows: { id: number; name: string; created_at: number; }[]) => {
        rows.forEach((row: {id: number, name: string, created_at: number}) => {
            documentsArr.push(row)
        });
    });
    db.close();
    res.status(200).send(documentsArr);
};

