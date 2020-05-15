/* eslint-disable comma-dangle */
const mySql = require('../../../config/connection').getInstance();
const tables = 'users_list';
/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
    const query = `SELECT * FROM ${tables};`;
    return mySql.query(query);
}

// /**
//  * @exports
//  * @method findById
//  * @param {string} id
//  * @summary get a user
//  * @returns {Promise<UserModel>}
//  */
// function findById(id) {
//     return UserModel.findById(id).exec();
// }

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create({ fullName, email }) {
    const query = `INSERT INTO ${tables} VALUES (NULL, '${fullName}', '${email}', NOW(), NOW());`;
    return mySql.query(query);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById({ id, fullName }) {
    const uniqueField = 'id';
    const changedField = 'fullName';
    const query = `UPDATE ${tables} SET ${changedField} = '${fullName}' WHERE ${uniqueField} = ${id};`;

    return mySql.query(query);
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(id) {
    const uniqueField = 'id';
    const query = `DELETE FROM ${tables} WHERE ${uniqueField} = ${id};`;

    return mySql.query(query);
}

module.exports = {
    findAll,
    // findById,
    create,
    updateById,
    deleteById,
};
