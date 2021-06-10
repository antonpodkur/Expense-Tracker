const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expenseRoute');

const app = express();

app.use(require('cors')());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/expense', expenseRoute);


mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {
    console.log('DB is connected');
});


app.listen(PORT, () =>{
    console.log(`Server up at ${PORT}`);
});