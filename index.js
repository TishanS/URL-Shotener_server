// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const connection = require("./db");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const passwordResetRoutes = require("./routes/passwordReset");

// // database connection
// connection();

// // middlewares
// app.use(express.json());
// app.use(cors());

// // routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/password-reset", passwordResetRoutes);
// app.use('/', (req,res,next) => {
//     console.log("Dashboard");
//     res.send("hi heroku");
//     next();
// })

// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));

const express=require('express');
require('dotenv').config();
const cors=require('cors');
const mongoose = require("./db");
const ShortUrl=require('./models/short')
const app=express();

// database connection
mongoose();

// middlewares
app.use(express.json());

app.use(cors())
app.use(express.urlencoded({extended:false}))

app.use('/', (req,res,next) => {
    console.log("Dashboard");
    res.send("hi heroku");
    next();
})

app.get('/get',async(req,res)=>{
    const shortUrls=await ShortUrl.find()
    res.send(shortUrls)
})
app.post('/shortUrls',async (req,res)=>{
await ShortUrl.create({full:req.body.fullUrl})
res.send("updated")
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })

  
app.listen(process.env.PORT || 5050);