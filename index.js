const express = require('express');
const config = require('config');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.use(express.json()); // built-in middleware
app.use(logger); // custom middleware example
app.use(express.static('public')); // built-in middleware
app.use(helmet()); // third-party middleware
app.use('/api/courses', courses);
app.use('/', home);

// Configuration examples
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password')); // example of storing credentials in env variables

// Environment example
if (app.get('env') === 'development'){
    app.use(morgan('common'));
    debug('Morgan enabled...'); // set DEBUG=app:startup
}

app.set('view engine', 'pug');

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

