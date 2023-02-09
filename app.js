// const fs = require('fs');
const express = require("express")
const app = express()
const ytdl = require('ytdl-core');
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.listen(1000)

app.post('/youtubeDownload', async (req, res) => {

    if(!("url" in req.body.url)) return res.send({error: true, message: "Missing url key in request object"})

    const url = req.body.url


    if(url.length > 500) return res.send({error: true, message: "Link too long"})

    let info
    try {
        info = await ytdl.getInfo(url)
    } catch (e) {
        res.send({error: true, message: "Video unavailable. Check if link provided is correct"})
    }

    res.send(info)
})