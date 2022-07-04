import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/', function (req: Request, res: Response) {
 return res.send({message: 'Hello NPM!'});
});

app.listen(process.env.PORT || 8080);