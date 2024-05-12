import { strict } from 'assert';
import { NextFunction, Request, Response } from 'express'
import multer from "multer";
import path from 'path';
import fs from 'fs';
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

export const testPostDocument = (req: Request, res: Response, next: NextFunction) => {
    try {
        const docName = req.file?.filename;
        const db = new sqlite3.Database('./uploadedFiles.db');
        const query = `INSERT INTO documents(name) VALUES ('${docName}')`;
        db.run(query);
        db.close();
        res.status(200).send('Your file is successfully uploaded!');
    } catch (error) {
        next(alert("Sorry, couldn't upload the document :("))
        // res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
    
};

export const getAllFiles = (req: Request, res: Response) => {
    try {
        const db = new sqlite3.Database('./uploadedFiles.db');
        const sql = `SELECT * FROM documents
           ORDER BY created_at DESC`;

        const documentsArr: {
            id: number, name: string, created_at: number
        }[] = []

        db.all(sql, [], (err: string, rows: { id: number; name: string; created_at: number; }[]) => {
            rows.forEach((row: { id: number, name: string, created_at: number }) => {
                documentsArr.push(row)
            });
            res.status(200).send(documentsArr);
        });
        db.close();
    } catch (error) {
        alert("Sorry, couldn't download your documents :(")
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const docId = req.params.id;
        const docName = req.params.name;
        const db = new sqlite3.Database('./uploadedFiles.db');
        const sql = `DELETE FROM documents WHERE id = ${docId}`;
        db.run(sql);
        db.close();

        if (typeof docName !== 'string') {
            alert("Sorry, couldn't delete the document :(");
        } else {
            const pathToDoc = path.join("public", "files", docName)
            await fs.promises.unlink(pathToDoc);
        };
         res.status(200).send('Document deleted successfully');
    } catch (error) {
        next(alert("Sorry, couldn't delete the document :("));
        // res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
}

export const downloadDocument = async (req: Request, res: Response) => {
    try {
        const docName = req.params.name;
        const pathToDoc = path.join("public", "files", docName)
        res.download(pathToDoc);
    } catch (error) {
        alert("Sorry, can't download the document :(")
        res.status(404).send(`Oops! There is something wrong: ${error}`);
    }
}