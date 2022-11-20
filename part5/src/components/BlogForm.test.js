import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

beforeAll(() => {
    localStorage.setItem('user',
        JSON.stringify({
            id: '123',
            username: 'username',
            name: 'name name'
        })
    );
});

describe('<BlogForm />', () => {
    test('event handler is called once with right details', () => {
        const mockCreateBlog = jest.fn();
        const user = userEvent.setup();

        const { container } = render(<BlogForm createBlog = {mockCreateBlog} />);

        const titleInput = container.querySelector('input[name="title"]');
        const authorInput = container.querySelector('input[name="author"]');
        const urlInput = container.querySelector('input[name="url"]');

        const button = screen.getByRole('button');

        return user
            .type(titleInput, 'testTitle')
            .then(() => {
                return user.type(authorInput, 'testAuthor');
            })
            .then(() => {
                return user.type(urlInput, 'testUrl');
            })
            .then(() => {
                return user.click(button);
            })
            .then(() => {
                return waitFor(() => {
                    expect(mockCreateBlog.mock.calls).toHaveLength(1);
                    expect(mockCreateBlog.mock.calls[0][0].title).toBe('testTitle');
                    expect(mockCreateBlog.mock.calls[0][0].author).toBe('testAuthor');
                    expect(mockCreateBlog.mock.calls[0][0].url).toBe('testUrl');
                });
            });
    });
});

afterAll(() => {
    localStorage.clear();
});