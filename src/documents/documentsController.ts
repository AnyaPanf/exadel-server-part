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
        if (typeof docName !== 'string') {
            throw new Error("Incorrect document name")
        } else {
            const db = new sqlite3.Database('./uploadedFiles.db');
            const query = `INSERT INTO documents(name) VALUES ('${docName}')`;
            db.run(query);
            db.close();
            res.status(200).send('The file is successfully uploaded!');
        }
    } catch (error) {
        res.status(400).send(`Oops! ${error}`);
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
        res.status(400).send(`Oops! ${error}`);
    }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const docId = req.params.id;
        const docName = req.params.name;
        if (docId === undefined || docName === undefined) {
            throw new Error('docId or docName is undefined')
        }

        const db = new sqlite3.Database('./uploadedFiles.db');
        const sql = `DELETE FROM documents WHERE id = ${docId}`;
        db.run(sql);
        db.close();

        const pathToDoc = path.join("public", "files", docName)
        await fs.promises.unlink(pathToDoc);
        res.status(200).send('Document deleted successfully');
    } catch (error) {
        res.status(400).send(`Oops! ${error}`);
    }
}

export const downloadDocument = async (req: Request, res: Response) => {
    try {
        const docName = req.params.name;
        if (typeof docName !== 'string') {
            throw new Error("Document name is not astring")
        };
        const pathToDoc = path.join("public", "files", docName)
        res.download(pathToDoc);
    } catch (error) {
        res.status(400).send(`Oops! ${error}`);
    }
}