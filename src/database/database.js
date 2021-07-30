const mysql = require('mysql');
const config = require('../config/database.config');

conn = null;

/**
 * @return {Connection} A new MySQL connection
 * @public
 */
exports.connection = () => {
    if (this.conn) {
        return this.conn;
    }
    this.conn = mysql.createConnection(config);
    this.conn.connect((error) => {
        if(error) {
            console.log("Ha ocurrido un error: ", error);
        } else {
            console.log("Base de datos conectada");
        }
    });

    return this.conn;
}
