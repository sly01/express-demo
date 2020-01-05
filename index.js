const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());


app.use(logger);
app.use("/api/courses", courses);
app.use("/", home);


app.set("view engine", "pug");
app.set("views", "./views"); // default

console.log("App name:", config.get('name'));
console.log("Mail Host:", config.get('mail.host'));
console.log("Mail Pass:", config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan Enabled");
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`));
