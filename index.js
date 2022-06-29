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

  app.use('/', (req,res,next) => {
    console.log("Dashboard");
    res.send("hi heroku");
    next();
})

  

const port = process.env.PORT || 5050;
app.listen(port, console.log(`Listening on port ${port}...`));