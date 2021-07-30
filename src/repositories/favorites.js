const { connection } = require('../database/database');

/**
 * @return Promise
 */
exports.findAll = async () => {
    return new Promise((resolve, reject) => {
        const statement = `
            SELECT
               boardgames.id,
               name,
               publisher,
               category,
               description,
               year,
               (favorites.id IS NOT NULL) AS is_favorite
            FROM boardgames
            INNER JOIN favorites on boardgames.id = favorites.boardgame_id;
        `;
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
