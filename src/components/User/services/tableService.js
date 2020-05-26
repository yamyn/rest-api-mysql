/* eslint-disable comma-dangle */
const mySql = require('../../../config/connection').getInstance();
const table = 'users_list';
/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<Users[]>
 */
function findAll() {
    const query = `SELECT * FROM ${table};`;

    return mySql.query(query);
}

/**
 * @exports
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<User>}
 */
function findByEmail(email) {
    const uniqueField = 'email';
    const query = `SELECT * FROM ${table} WHERE ${uniqueField} = ?`;
    const params = [email];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method getStatistic
 * @param {number} countDay
 * @summary get a user statistic
 * @returns {Promise<Cursor>}
 */
function getStatistic(countDay) {
    const criteria = 'created_at';
    const choosedFieldQuery = `SELECT DATE_FORMAT(${table}.${criteria}, '%d.%m.%Y') AS date, COUNT(id) AS count FROM ${table}`;
    const expressionQuery = `WHERE ${criteria} > NOW() - INTERVAL ${countDay} DAY`;
    const groupQuery = `GROUP BY DATE_FORMAT(${table}.${criteria}, '%d.%m.%Y')`;
    const orderQuery = `ORDER BY ${table}.${criteria}`;
    const query = `${choosedFieldQuery} ${expressionQuery} ${groupQuery} ${orderQuery}`;

    return mySql.query(query);
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<ResultSetHeader>}
 */
function create({ fullName, email }) {
    const query = `INSERT INTO ${table} (fullName, email) VALUES ('${fullName}', '${email}');`;

    return mySql.query(query);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {object} profile
 * @summary update a user's profile
 * @returns {Promise<ResultSetHeader>}
 */
function updateById({ id, fullName }) {
    const uniqueField = 'id';
    const changedField = 'fullName';
    const query = `UPDATE ${table} SET ${changedField} = ? WHERE ${uniqueField} = ?`;
    const params = [fullName, id];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function deleteById(id) {
    const uniqueField = 'id';
    const query = `DELETE FROM ${table} WHERE ${uniqueField} = ?`;
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    findAll,
    findByEmail,
    getStatistic,
    create,
    updateById,
    deleteById,
};
