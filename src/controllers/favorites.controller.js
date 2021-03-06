const favoritesRepository = require('../repositories/favorites');

exports.create = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(422).json({
            message: 'Something was wrong',
            errors: ['Field id is required'],
        });
    }

    favoritesRepository.create(id)
        .then(data => {
            return res.json({
                message: 'Board game added to favorites',
                data: data,
            });
        })
        .catch(err => {
            return res.status(422).json({
                message: 'Something was wrong',
                errors: [err],
            });
        });
};

exports.findAll = (req, res) => {
    
    const { category } = req.query;

    favoritesRepository.findAll(category)
        .then(data => {
            return res.json({
                message: null,
                data: data,
            });
        })
        .catch(err => {
            return res.status(422).json({
                message: 'Something was wrong',
                errors: [err],
            });
        });
};

exports.delete = (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(422).json({
            message: 'Something was wrong',
            errors: ['Field id is required'],
        });
    }

    favoritesRepository.delete(id)
        .then(data => {
            return res.json({
                message: null,
                data: data,
            });
        })
        .catch(err => {
            return res.status(422).json({
                message: 'Something was wrong',
                errors: [err],
            });
        });
};
