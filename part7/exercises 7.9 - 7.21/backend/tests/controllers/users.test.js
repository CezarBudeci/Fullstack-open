const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app');
const User = require('../../models/user');
const helper = require('../test_helper');

const api = supertest(app);

describe('users', () => {

    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('secret', 10);
        const newUser = new User({
            username: 'testUsername',
            passwordHash: passwordHash,
        });
        await newUser.save();
    })

    describe('GET', () => {
        test('returns a list with all users', async () => {
            const result = await api.get('/api/users').send().expect(200).expect('Content-Type', /application\/json/);
            expect(result.body).toHaveLength(1);
        })
    });

    describe('POST', () => {
        test('invalid username does not add user and returns proper statuscode and message', async () => {
            const usersInDb = await helper.usersInDb();
            expect(usersInDb).toHaveLength(1);

            const newUser = {
                username: 'te',
                password: 'secret'
            };

            const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
            expect(result.body.error).toContain('Username and password must be at least 3 characters long');

            const usersInDbAfterPost = await helper.usersInDb();
            expect(usersInDbAfterPost).toHaveLength(1);
        });

        test('invalid password does not add user and returns proper statuscode and message', async () => {
            const usersInDb = await helper.usersInDb();
            expect(usersInDb).toHaveLength(1);

            const newUser = {
                username: 'test',
                password: 'se'
            };

            const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
            expect(result.body.error).toContain('Username and password must be at least 3 characters long');

            const usersInDbAfterPost = await helper.usersInDb();
            expect(usersInDbAfterPost).toHaveLength(1);
        });

        test('not unique username does not add user and returns proper statuscode and message', async () => {
            const usersInDb = await helper.usersInDb();
            expect(usersInDb).toHaveLength(1);

            const newUser = {
                username: 'testUsername',
                password: 'secret'
            };

            const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
            expect(result.body.error).toContain('Username must be unique');

            const usersInDbAfterPost = await helper.usersInDb();
            expect(usersInDbAfterPost).toHaveLength(1);
        });

        test('valid values add user and return proper status and new user', async () => {
            const usersInDb = await helper.usersInDb();
            expect(usersInDb).toHaveLength(1);

            const newUser = {
                username: 'testUsername1',
                password: 'secret'
            };

            const result = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);
            const resultBody = result.body;
            expect(resultBody.username).toBe(newUser.username);
            expect(resultBody.name).toBe('');
            expect(resultBody.id).toBeDefined();

            const usersInDbAfterPost = await helper.usersInDb();
            expect(usersInDbAfterPost).toHaveLength(usersInDb.length + 1);
        });
    });

    afterAll(() => {
        mongoose.connection.close()
    });
});