const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy
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
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}