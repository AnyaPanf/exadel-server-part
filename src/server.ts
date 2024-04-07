import express, { Express, Request, Response }from 'express'
import dotenv from 'dotenv';
import { documents } from '../documents/documentsRouter';
import bodyParser from 'body-parser';
import { routes } from '../routes';

const app: Express = express();
const port = 3000;
// dotenv.config();

// body-parser
// app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// dotenv.config();

// routes
app.use('/', routes);

// start the server
app.listen(3000, () => {
    console.log(
        "server running : http://localhost:3000"
    );
});

// app.listen(dotenv.env.BACK_PORT, () => {
//     console.log(
//         `server running : http://${dotenv.env.BACK_HOST}:${dotenv.env.BACK_PORT}`
//     );
// });
