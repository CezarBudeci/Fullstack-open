import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./notification";

const Blogs = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            {
                props.message && <Notification type = "MESSAGE" text = {props.message} />
            }
            {
                props.error && <Notification type = "ERROR" text = {props.error} />
            }
            <p>{props.user.name} logged in <button onClick={props.logout}>logout</button></p>
            <BlogForm createBlog = {props.createBlog} />
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default Blogs;