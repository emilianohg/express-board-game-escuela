const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

require('./routes/boardgames.routes')(app);
require('./routes/favorites.routes')(app);

app.get('/', (req, res) => {
    res.json({ping: 'pong'});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
