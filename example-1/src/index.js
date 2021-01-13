const express = require("express");
const fs = require("fs");

const app = express();
if (!process.env.PORT) {
    throw new Error("Please specify number for the HTTP server");
}
const PORT = process.env.PORT;

//
// Registers a HTTP GET route.
//
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/video', (req, res) => {
    const path = './videoes/SampleVideo_1280x720_1mb.mp4';
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error(err);
            res.statusCode(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4"
        });

        fs.createReadStream(path).pipe(res);
    })
})

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`First example app listening on port ${PORT}, point your browser at http://localhost:3000`);
});  