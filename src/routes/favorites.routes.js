module.exports = (app) => {
    const favorites = require('../controllers/favorites.controller');

    app.post('/favorites', favorites.create);

    app.get('/favorites', favorites.findAll);

    app.delete('/favorites/:id', favorites.delete);
}
