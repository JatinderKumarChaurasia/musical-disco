import express, { NextFunction, Request, Response } from 'express';
import todosRoutes from './routes/todosRoutes';
import { json } from 'body-parser';
const port = 3000;
// const host = '127.0.0.1';
const app = express();
app.use(json());

app.use('/todos', todosRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
    // next();
});
app.listen(port);
