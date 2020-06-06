const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findById(id);
        });
}

function findById(id) {
    return db('users').where({ id }).first();
}