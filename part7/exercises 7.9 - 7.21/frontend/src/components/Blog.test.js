import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

beforeAll(() => {
    localStorage.setItem(
        'user',
        JSON.stringify({
            id: '123',
            username: 'username',
            name: 'name name',
        })
    );
});

describe('<Blog />', () => {
    test('renders content without url and like', () => {
        const blog = {
            title: 'test title',
            likes: 2,
            author: 'test author',
            url: 'test url',
        };

        const { container } = render(<Blog blog={blog} />);

        const div = container.querySelector('.blog');
        expect(div).toHaveTextContent('test title');
        expect(div).toHaveTextContent('test author');
        expect(div).not.toHaveTextContent('test url');
        expect(div).not.toHaveTextContent('likes 2');
    });

    test('clicking the button shows url and likes', () => {
        const blog = {
            title: 'test title',
            likes: 2,
            author: 'test author',
            url: 'test url',
            user: {
                id: '123',
                username: 'username',
                name: 'name name',
            },
        };

        const user = userEvent.setup();

        const { container } = render(<Blog blog={blog} />);
        const div = container.querySelector('.blog');
        const button = screen.getByText('view');

        return user.click(button).then(() => {
            return waitFor(() => {
                expect(div).toHaveTextContent('test url');
                expect(div).toHaveTextContent('likes 2');
            });
        });
    });

    test('clicking the like button twice triggers event handler twice', () => {
        const blog = {
            title: 'test title',
            likes: 2,
            author: 'test author',
            url: 'test url',
            user: {
                id: '123',
                username: 'username',
                name: 'name name',
            },
        };

        const mockUpdateBlog = jest.fn();
        const user = userEvent.setup();

        render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);
        const viewButton = screen.getByText('view');

        return user
            .click(viewButton)
            .then(() => {
                const likeButton = screen.getByText('like');
                return user.dblClick(likeButton);
            })
            .then(() => {
                return waitFor(() => {
                    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
                });
            });
    });
});

afterAll(() => {
    localStorage.clear();
});
