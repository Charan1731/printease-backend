import express from 'express';
import connectToDB from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/user', userRouter);
app.use('/api/v1/vendor', vendorRouter);

app.use(errorMiddleware)



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, async () => {
    console.log('Server is running on port http://localhost:3000');

    await connectToDB();
})


export default app;