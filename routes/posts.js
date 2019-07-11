const express = require('express');
const router = express.Router();

// sends params object to browser
router.get('/api/posts/:year/:name', (req, res)=>{
    res.send(req.params);
});

// sends query string param to browser. comment out above function, else this never gets hit
router.get('/api/posts/:year/:name', (req, res)=>{
    res.send(req.query);
});

module.exports = router;