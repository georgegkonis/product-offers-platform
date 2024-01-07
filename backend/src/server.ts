import { StatusCode } from './enums/status-code.enum';

require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import multer from 'multer';
import warehouseRoute from './routes/warehouse.route';
import { handleErrors } from './middleware/handle-errors.middleware';

const app = express();

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Cors
app.use(
    cors({
        origin: config.get<string>('origin'),
        credentials: true
    })
);

// File Upload
const upload = multer({ dest: 'uploads/' });
app.use(upload.any());

// Routes
const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/warehouse', warehouseRoute);

app.use('/disaster-response-coordinator/v1', apiRouter);

// Unknown Routes
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = StatusCode.NOT_FOUND;
    next(err);
});

// Global Error Handler
app.use(handleErrors);

const port = config.get<number>('port');
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // ? call the connectDB function here
    connectDB();
});

