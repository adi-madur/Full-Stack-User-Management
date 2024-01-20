const express = require('express');
const connectToDb = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoute');

const app = express(); 
connectToDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth/', authRouter);

app.use('/', (req, res)=>{
    res.status(200).json({
        msg:"Server is running...",
    })
})

module.exports = app;