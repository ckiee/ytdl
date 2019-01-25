// took 49minutes to video dl
const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const port = process.env.PORT || process.env.port || 3000;
const ffmpeg = require("fluent-ffmpeg");
const yt_regex = /^(http(s)?:\/\/)((w){3}.)?youtu(be|.be)?(\.com)?\/watch\?v=[a-zA-Z0-9]+/

app.use(express.static("static"));

app.get("/api", async (req, res) => {
    const {url, type} = req.query;
    if (!["mp3", "mp4"].includes(type)) return res.sendStatus(400);
    if (!yt_regex.test(url)) return res.sendStatus(400);
    const info = await ytdl.getBasicInfo(url);
    console.log(info);
    res.setHeader("Content-Disposition", `attachment; filename=${info.title.split(" ").join("_")}.${type}`);
    if (type == "mp4") {
        ytdl(url).pipe(res);
    } else {
        ffmpeg(ytdl(url))
            .format("mp3")
            .audioBitrate(128)
            .pipe(res)
    }
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}.`));