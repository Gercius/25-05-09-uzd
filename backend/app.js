const express = require('express');
const hotelRouter  = require('./routes/hotelRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
 /* app.use((req,res, next)=>{
    console.log("Hello from midlelware");
    next()
}) */


app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);

module.exports = app;