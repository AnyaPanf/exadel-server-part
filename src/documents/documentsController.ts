import { Request, Response } from 'express'
import multer from "multer";
import { documents } from './documentsRouter';
import { error } from 'console';
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
        console.log(req.file);
        const query = `INSERT INTO documents(name) VALUES ('${req.file?.filename}')`;
        db.run(query);

        const sql = `SELECT * FROM documents`
        db.all(sql, [], (err: { message: any; }, rows: any[]) => {
            if (err) return console.error(err.message);
            rows.forEach((row: any) => {
                console.log(row);
            })
        })
        db.close();
        res.status(200).send('Your file is successfully uploaded!');
    } catch (error) {
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
};

