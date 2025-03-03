import express from 'express';
import connectToDB from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import pdfRouter from './routes/pdf.routes.js';

const app = express();
const allowedOrigin = ["http://localhost:5173"];

app.use((req, res, next) => {
    if (allowedOrigin.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(cookieParser());



app.use('/api/v1/user', userRouter);
app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/pdf', pdfRouter)

app.use(errorMiddleware)



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, async () => {
    console.log('Server is running on port http://localhost:3000');

    await connectToDB();
})


export default app;