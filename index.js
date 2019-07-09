// import express from 'express'; // new ES6 way of importing modules

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(['Comp Sci 101', 'C#', 'Web Dev 101'])
});

app.listen(5000, () => console.log('Listening on port 5000...'));