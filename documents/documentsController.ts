import express, { Request, Response } from 'express'
import { documents } from "./documentsRouter";
import { Router } from 'express';

export const document = Router();

export const testDocument = (req: Request, res: Response) => {
    // if (req === undefined) {
    //     return res.status(404).send('Document not found')
    // }
    // res.status(201).send(console.log("Document is correct"));
    res.send(console.log("Document is correct"));
};