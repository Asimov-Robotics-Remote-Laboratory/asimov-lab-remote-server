const createUser = require('./createUser');
const listAllUsers = require('./listAllUsers');
const findUsersByNameOrEmail = require('./findUsersByNameOrEmail');
const authenticateUser = require('./authenticateUser');
const removeUser = require('./removeUser');
const findUserById = require('./findUserById');
const updateUser = require('./updateUser');
const resetPassword = require('./resetPassword');
const redefinePassword = require('./redefinePassword');

module.exports = [
    createUser,
    listAllUsers,
    authenticateUser,
    removeUser,
    findUserById,
    updateUser,
    resetPassword,
    redefinePassword,
    findUsersByNameOrEmail
];