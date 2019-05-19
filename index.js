const express = require('express');

const app = express();

app.get('/about', (req, res) => {
    res.send("This game was created by Oles Odynets. May 2019");
});

app.use('/', express.static('./public'));

app.listen(4000, () => console.log("Server is listening on port 4000!"));