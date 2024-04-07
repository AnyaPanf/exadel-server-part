"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documents = void 0;
const express_1 = require("express");
exports.documents = (0, express_1.Router)();
exports.documents.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
