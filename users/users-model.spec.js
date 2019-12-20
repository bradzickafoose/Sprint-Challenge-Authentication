const Users = require('./users-model');
const db = require('../database/dbConfig');

describe('users model', function () {

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add()', function () {

        it('should add the user to the database', async function () {

            await Users.add({ username: 'Ted', password: 'test' });
            await Users.add({ username: 'Karen', password: 'test' });
            await Users.add({ username: 'Johnny', password: 'test' });
            await Users.add({ username: 'Winston', password: 'test' });

            const users = await db('users');
            expect(users).toHaveLength(4);
        });
    });
});