module.exports = (app) => {
    const boardgames = require('../controllers/boardgame.controller');

    app.post('/boardgame', boardgames.create);

    app.get('/boardgame', boardgames.findAll);

    app.get('/boardgame/:id', boardgames.find);

    app.put('/boardgame/:id', boardgames.update);

    app.delete('/boardgame/:id', boardgames.delete);
}
