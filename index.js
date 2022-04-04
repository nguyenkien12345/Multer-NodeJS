const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const path = require("path");
const hbs = require('express-handlebars');
const connection = require('./database/database');

const multerRoute = require('./multerRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

connection();

// setup view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
}));

app.use('/v1/multer', multerRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
})