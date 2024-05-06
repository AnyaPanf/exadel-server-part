import { strict } from 'assert';
import { Request, Response } from 'express'
import multer from "multer";
const sqlite3 = require('sqlite3').verbose();
import fs from 'fs';
import path from 'node:path';

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
};

export const deleteDocument = async (req: Request, res: Response) => {
    const docId = req.query.id;
    const docName = req.query.name;
    const db = new sqlite3.Database('./uploadedFiles.db');
    const sql = `DELETE FROM documents WHERE id = ${docId}`;
    db.run(sql);
    res.status(200).send('Document deleted successfully');
    db.close();

    if (typeof docName !== 'string') {
        res.status(400).send('Error');
    } else {
        const pathToDoc = path.join("public", "files", docName)
        await fs.promises.unlink(pathToDoc);
    };
}

export const downloadDocument = (req: Request, res: Response) => {
    //1
    // const blob = new Blob([fileData], { type: 'application/octet-stream' });
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = req.params.name;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    //2
    // const url = window.URL.createObjectURL(new Blob(['http://localhost:3000/files']));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "image.png");
    // document.body.appendChild(link);
    // link.click();
}
