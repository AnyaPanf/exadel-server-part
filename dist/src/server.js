"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const documentsRouter_1 = require("../documents/documentsRouter");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// const app: Application = express();
const PORT = 3000;
dotenv_1.default.config();
// body-parser
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
dotenv_1.default.config();
// routes
app.use('/documents', documentsRouter_1.documents);
// start the server
app.listen(dotenv_1.default.env.BACK_PORT, () => {
    console.log(`server running : http://${dotenv_1.default.env.BACK_HOST}:${dotenv_1.default.env.BACK_PORT}`);
});
