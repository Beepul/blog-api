const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors')
require('dotenv').config();

const app = express();

connectDB(process.env.MONGO_URL);

app.use(express.static('public'));

app.use(cors())
app.use(express.json());


app.use('/api/auth', require("./route/auth"));
app.use('/api/user', require('./route/user'));
app.use('/api/post',require('./route/post'));
app.use('/api/category',require('./route/category'));


const server = app.listen(process.env.PORT, () => 
    console.log(`App listening to port ${process.env.PORT}`)
)

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(()=> process.exit(1))
})