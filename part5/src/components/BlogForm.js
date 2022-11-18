import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '' });

    const handleInput = (e) => {
        setBlog({...blog, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBlog(blog);
        setBlog({ title: '', author: '', url: '' });
    }

    return (
        <div>
            <form onSubmit = {e => handleSubmit(e)}>
                <div>
                    <h2>Create new</h2>
                </div>
                <div>
                    title: <input type = "text" name = "title" value={blog.title} onChange = {e => handleInput(e)} />
                </div>
                <div>
                    author: <input type = "text" name = "author" value={blog.author} onChange = {e => handleInput(e)} />
                </div>
                <div>
                    url: <input type = "text" name = "url" value={blog.url} onChange = {e => handleInput(e)} />
                </div>
                <div>
                    <button type = "submit">create</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;