describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'testusername', name: 'test name', password: 'testpassword' });
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function() {
        cy.get('form').should('be.visible');
    });

    describe('Login', () => {
        it('succeeds with correct credentials', function() {
            cy.get('input[name="username"]').type('testusername');
            cy.get('input[name="password"]').type('testpassword');
            cy.get('button').click();
            cy.contains('test name logged in');
        });

        it('fails with wrong credentials', function() {
            cy.get('input[name="username"]').type('test');
            cy.get('input[name="password"]').type('test');
            cy.get('button').click();
            cy
                .get('p.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)');
        });

        it('fails with empty credentials', function() {
            cy.get('button').click();
            cy.get('p.error')
                .should('contain', 'Login failed')
                .and('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('input[name="username"]').type('testusername');
            cy.get('input[name="password"]').type('testpassword');
            cy.get('button').click();
        });

        it('A blog can be created', function() {
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('test title');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();
            cy
                .get('p.message')
                .should('contain', 'A new blog test title by test author added')
                .and('have.css', 'color', 'rgb(0, 128, 0)');
            cy
                .get('.blogs')
                .children()
                .should('have.length', 1);
            cy
                .get('.blog-short')
                .should('contain', 'test title test author');
        });

        it('A blog can be liked', function() {
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('test title');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();
            cy
                .get('p.message')
                .should('contain', 'A new blog test title by test author added')
                .and('have.css', 'color', 'rgb(0, 128, 0)');
            cy
                .get('div.blogs')
                .children()
                .should('have.length', 1);
            cy
                .get('.blog-short')
                .should('contain', 'test title test author');

            cy.get('.view-blog').click();
            cy.contains('likes 0').should('exist');
            cy.get('.like-blog').click();
            cy.contains('likes 1').should('exist');

        });

        it('A blog can be deleted', function() {
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('test title');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();
            cy
                .get('p.message')
                .should('contain', 'A new blog test title by test author added')
                .and('have.css', 'color', 'rgb(0, 128, 0)');
            cy
                .get('div.blogs')
                .children()
                .should('have.length', 1);
            cy
                .get('.blog-short')
                .should('contain', 'test title test author');

            cy.get('.view-blog').click();
            cy.get('.remove-blog').click();
            cy.on('window:confirm', function(text) {
                expect(text).to.contain('Remove test title by test author');
            });

            cy
                .get('div.blogs')
                .children()
                .should('to.be', undefined);
        });

        it('A blog can not be deleted by different user', function() {
            cy.request('POST', 'http://localhost:3003/api/users', { username: 'testusername2', name: 'test2 name2', password: 'testpassword' });
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('test title');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();
            cy
                .get('p.message')
                .should('contain', 'A new blog test title by test author added')
                .and('have.css', 'color', 'rgb(0, 128, 0)');
            cy
                .get('div.blogs')
                .children()
                .should('have.length', 1);
            cy
                .get('.blog-short')
                .should('contain', 'test title test author');

            cy.contains('logout').click();
            cy.get('input[name="username"]').type('testusername2');
            cy.get('input[name="password"]').type('testpassword');
            cy.get('button').click();
            cy.contains('test2 name2 logged in');

            cy
                .get('.blog-short')
                .should('contain', 'test title test author');

            cy.get('.view-blog').click();
            cy.get('.remove-blog').should('to.be', undefined);
        });

        it('Blogs are sorted by likes', function() {
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('blog1');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();

            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('blog2');
            cy.get('input[name="author"]').type('test author');
            cy.get('input[name="url"]').type('test url');
            cy.get('button[type="submit"]').click();

            cy
                .get('div.blogs')
                .children()
                .should('have.length', 2);

            cy.get('.blog').eq(1).children().find('button').click();
            cy.get('.like-blog').click();

            cy.get('.blog').eq(0).should('contain', 'blog2');
            cy.get('.blog').eq(1).should('contain', 'blog1');
        });
    });

});