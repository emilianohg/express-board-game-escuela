const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

require('./routes/boardgames.routes')(app);
require('./routes/favorites.routes')(app);

app.get('/', (req, res) => {
    res.json({ping: 'pong'});
});

app.use((error, req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
