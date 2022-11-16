const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/blog');
const helper = require('../test_helper');

const api = supertest(app);

describe('blogs', () => {
    const blogs = [
        {
            title: 'title1',
            author: 'author1',
            url: 'url1',
            likes: 1
        },
        {
            title: 'title2',
            author: 'author2',
            url: 'url2',
            likes: 2
        },
        {
            title: 'title3',
            author: 'author3',
            url: 'url3',
            likes: 3
        }
    ]

    beforeEach(async () => {
       await Blog.deleteMany({});
       let blog = new Blog(blogs[0]);
       await blog.save();
       blog = new Blog(blogs[1]);
       await blog.save();
       blog = new Blog(blogs[2]);
       await blog.save();
    });

    describe('GET', () => {
        test('all blogs are returned', async () => {
            const result = await api.get('/api/blogs');
            expect(result.body).toHaveLength(blogs.length);
        });
    
        test('returned blogs have \'id\' instead of \'_id\'', async () => {
            const result = await api.get('/api/blogs');
            expect(result.body[0]._id).not.toBeDefined();
            expect(result.body[0].id).toBeDefined();
        });
    });
    
    describe('POST', () => {
        test('new blog can be added', async () => {
            const newBlog = {
                title: 'title4',
                author: 'author4',
                url: 'url4',
                likes: 4
            };
    
            await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);
    
            const blogsInDb = await helper.blogsInDb();
            expect(blogsInDb).toHaveLength(blogs.length + 1);
    
            const titles = blogsInDb.map(item => item.title);
            const authors = blogsInDb.map(item => item.author);
            const urls = blogsInDb.map(item => item.url);
            const likesList = blogsInDb.map(item => item.likes);
            expect(titles).toContain(newBlog.title);
            expect(authors).toContain(newBlog.author);
            expect(urls).toContain(newBlog.url);
            expect(likesList).toContain(newBlog.likes);
        });
    
        test('missing likes property defaults value to zero', async () => {
            const newBlog = {
                title: 'title4',
                author: 'author4',
                url: 'url4'
            };
    
            await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);
            const blogsInDb = await helper.blogsInDb();
            expect(blogsInDb).toHaveLength(blogs.length + 1);
    
            const storedNewBlog = blogsInDb.filter(item => item.title === newBlog.title);
            expect(storedNewBlog).toHaveLength(1);
            expect(storedNewBlog[0].likes).toBeDefined();
            expect(storedNewBlog[0].likes).toBe(0);
        });
    
        test('mising title returns status 400', async () => {
            const newBlog = {
                author: 'author4',
                url: 'url4'
            };
    
            await api.post('/api/blogs').send(newBlog).expect(400);
        });
    
        test('mising url returns status 400', async () => {
            const newBlog = {
                title: 'title4',
                author: 'author4'
            };
    
            await api.post('/api/blogs').send(newBlog).expect(400);
        });
    });

    describe('DELETE', () => {
        test('wrong id returns CastError', async () => {
            await api.delete('/api/blogs/1').send().expect(500);
        });
    
        test('delete one entity', async () => {
            const blogsInDb = await helper.blogsInDb();
            expect(blogsInDb).toHaveLength(3);
    
            const id = blogsInDb[0].id;
    
            await api.delete(`/api/blogs/${id}`).send().expect(204);
            const blogsInDbAfterDelete = await helper.blogsInDb();
            expect(blogsInDbAfterDelete).toHaveLength(2);
        });
    });

    describe('PUT', () => {
        test('wrong id returns CastError', async () => {
            const newBlog = {
                likes: 4
            };

            await api.put('/api/blogs/1').send(newBlog).expect(500);
        });

        test('missing body returns 400', async () => {
            const blogsInDb = await helper.blogsInDb();
            const id = blogsInDb[0].id;
            await api.put(`/api/blogs/${id}`).send(null).expect(400);
        });

        test('updates likes value', async () => {
            const blogsInDb = await helper.blogsInDb();
            expect(blogsInDb).toHaveLength(3);

            const firstBlog = blogsInDb[0];
            expect(firstBlog.likes).toBe(1);

            const id = firstBlog.id;

            const newBlog = {
                likes: 5
            };

            await api.put(`/api/blogs/${id}`).send(newBlog).expect(200);

            const blogsInDbAfterUpdate = await helper.blogsInDb();
            expect(blogsInDbAfterUpdate).toHaveLength(3);

            const firstBlogAfterUpdate = blogsInDbAfterUpdate[0];
            expect(firstBlogAfterUpdate.likes).toBe(5);
        });
    });

    afterAll(() => {
        mongoose.connection.close()
    });
});
    