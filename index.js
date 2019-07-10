const express = require('express');
const Joi = require('joi');

const app = express();

app. use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

let courses = [{id: 1, name: 'Comp Sci 101'}, {id: 2, name: 'C#'}, {id: 3, name: 'Web Dev 101'}];

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// route params, sends name of course of id provided in route param
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with provided id not found.');

    res.send(course);
});

// sends params object to browser
app.get('/api/posts/:year/:name', (req, res)=>{
    res.send(req.params);
});

// sends query string param to browser. comment out above function, else this never gets hit
app.get('/api/posts/:year/:name', (req, res)=>{
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with provided id not found.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with provided id not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});