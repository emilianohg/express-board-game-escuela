const { connection } = require('../database/database');

/**
 * @return Promise
 */
exports.findAll = async (category = null) => {
    return new Promise((resolve, reject) => {
        let statement = `
            SELECT
               favorites.id,
               name,
               publisher,
               category,
               year
            FROM boardgames
            INNER JOIN favorites on boardgames.id = favorites.boardgame_id
        `;

        if (category != null && category != 'null') {
            statement += ` WHERE category = ${category}`;
        }

        connection().query(statement, (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data);
        });
    });
};

/**
 * @param {int} id
 * @return Promise
 */
exports.create = async (id) => {
    return new Promise((resolve, reject) => {
        const statement = 'INSERT INTO favorites(boardgame_id) VALUES(?)';
        connection().query(statement, [id], (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data);
        });
    });
};

/**
 * @param {int} id
 * @return Promise
 */
exports.delete = async (id) => {
    return new Promise((resolve, reject) => {
        const statement = 'DELETE FROM favorites WHERE boardgame_id = ?';
        connection().query(statement, [id], (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data);
        });
    });
};
