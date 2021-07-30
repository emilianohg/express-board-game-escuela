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
            LEFT JOIN favorites on boardgames.id = favorites.boardgame_id;
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
exports.find = async (id) => {
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
            LEFT JOIN favorites on boardgames.id = favorites.boardgame_id
            WHERE boardgames.id = ?;
        `;
        connection().query(statement, [id], (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data);
        });
    });
};

/**
 * @param {string} name
 * @param {string} publisher
 * @param {string} category
 * @param {string} description
 * @param {int} year
 * @return Promise
 */
exports.create = async ({
  name,
  publisher,
  category,
  description,
  year
}) => {
    return new Promise((resolve, reject) => {
        const statement = 'INSERT INTO boardgames(name, publisher, category, description, year) VALUES (?, ?, ?, ?, ?)';
        connection().query(statement, [name, publisher, category, description, year], (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data.insertId);
        });
    });
};

/**
 * @param {int} id
 * @param {string} publisher
 * @param {string} category
 * @param {string} description
 * @param {int} year
 * @return Promise
 */
exports.update = async (id, {
    publisher,
    category,
    description,
    year
}) => {
    return new Promise((resolve, reject) => {
        const statement = 'UPDATE boardgames SET publisher = ?, category = ?, description = ?, year = ? WHERE id = ?';
        connection().query(statement, [publisher, category, description, year, id], (err, data) => {
            console.log(err, data);
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
        const statement = 'DELETE FROM boardgames WHERE id = ?';
        connection().query(statement, [id], (err, data) => {
            if(err) {
                reject({err});
            }
            return resolve(data);
        });
    });
};
