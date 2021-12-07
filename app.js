import express from 'express'
import data from './src/routes/data'
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.json({limit: "3000mb",parameterLimit:100000000}));
app.use(express.urlencoded({limit: "3000mb", extended: true, parameterLimit:100000000}));
app.use('/',data)

app.listen(process.env.PORT)