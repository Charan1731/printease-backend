import express from 'express';
import cors from 'cors';
import connectToDB from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import pdfRouter from './routes/pdf.routes.js';

const app = express();

// Allow CORS for your frontend origin
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/pdf', pdfRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, async () => {
    console.log('Server is running on port http://localhost:8080');
    await connectToDB();
});

export default app;
