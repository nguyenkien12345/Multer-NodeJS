const express = require("express");
const path = require("path");
const multerRoute = require('./multerRoute');

const app = express();

app.use('/v1/multer', multerRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("SERVER IS RUNNING AT PORT 3000");
})