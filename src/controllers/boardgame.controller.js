const boardgameRepository = require('../repositories/boardgame');

exports.create = (req, res) => {
    const _boardgame = req.body;

    const errors = validateRequestCreate(_boardgame);
    if (errors.length > 0) {
        return res.status(422).json({
            message: 'Request not valid',
            errors,
        });
    }

    boardgameRepository.create(_boardgame)
    .then(data => {
        console.log('data');
        console.log(data);
        return res.json({
            message: 'Boardgame created successfuly',
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
    boardgameRepository.findAll()
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

exports.find = (req, res) => {
    const { id } = req.params;
    boardgameRepository.find(id)
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

exports.update = (req, res) => {
    const { id } = req.params;
    const _boardgame = req.body;

    const errors = validateRequestUpdate(_boardgame);
    console.log(errors);

    if (errors.length > 0) {
        return res.status(422).json({
            message: 'Request not valid',
            errors,
        });
    }

    console.log(_boardgame);

    boardgameRepository.update(id, _boardgame)
        .then(_ => {
            return res.json({
                message: 'Board Game updated successfully',
                data: _boardgame,
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
    boardgameRepository.delete(id)
        .then(_ => {
            return res.json({
                message: 'Board Game deleted successfully',
                data: id,
            });
        })
        .catch(err => {
            return res.status(422).json({
                message: 'Something was wrong',
                errors: [err],
            });
        });
};

const validateRequestCreate = (_boardgame) => {
    const errors = [];
    if(!_boardgame.name) {
        errors.push('Field name is required');
    }
    if(!_boardgame.publisher) {
        errors.push('Field publisher is required');
    }
    if(!_boardgame.category) {
        errors.push('Field category is required');
    }
    if(_boardgame.name.length > 80) {
        errors.push('Field name is too long, maximum length is 80 characters');
    }
    if(_boardgame.publisher.length > 60) {
        errors.push('Field publisher is too long, maximum length is 60 characters');
    }
    if(_boardgame.category.length > 2) {
        errors.push('Field category is too long, maximum length is 2 characters');
    }
    if(_boardgame.description.length > 200) {
        errors.push('Field description is too long, maximum length is 200 characters');
    }
    if(_boardgame.year.toString().length !== 4) {
        errors.push('Field year must be in YYYY format');
    }
    return errors;
}

const validateRequestUpdate = (_boardgame) => {
    const errors = [];

    if(!_boardgame.publisher) {
        errors.push('Field publisher is required');
    }
    if(!_boardgame.category) {
        errors.push('Field category is required');
    }
    if(_boardgame.publisher.length > 60) {
        errors.push('Field publisher is too long, maximum length is 60 characters');
    }
    if(_boardgame.category.length > 2) {
        errors.push('Field category is too long, maximum length is 2 characters');
    }
    if(_boardgame.description.length > 200) {
        errors.push('Field description is too long, maximum length is 200 characters');
    }
    if(_boardgame.year.toString().length !== 4) {
        errors.push('Field year must be in YYYY format');
    }
    return errors;
}
