const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, item) => {
        return total + item.likes;
    }, 0);
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => { return (a.likes < b.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0) });
    let favBlog = {...sortedBlogs[0]};
    delete favBlog._id;
    delete favBlog.__v;

    return favBlog;
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return {};
    }
    
    if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blogs: 1
        }
    }

    let blogsCount = {};
    blogs.forEach((blog) => {
        if (blogsCount[blog.author]) {
            blogsCount[blog.author] += 1;
        } else {
            blogsCount[blog.author] = 1;
        }
    });
    let mostBlogsCount = {
        author: '',
        blogs: 0
    };
    Object.keys(blogsCount).forEach((key) => {
        if (blogsCount[key] > mostBlogsCount.blogs) {
            mostBlogsCount.author = key;
            mostBlogsCount.blogs = blogsCount[key];
        }
    });

    return mostBlogsCount;
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return {};
    }
    
    if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }

    let likesCount = {};
    blogs.forEach((blog) => {
        if (likesCount[blog.author]) {
            likesCount[blog.author] += blog.likes;
        } else {
            likesCount[blog.author] = blog.likes;
        }
    });
    let mostLikesCount = {
        author: '',
        likes: 0
    };
    Object.keys(likesCount).forEach((key) => {
        if (likesCount[key] > mostLikesCount.likes) {
            mostLikesCount.author = key;
            mostLikesCount.likes = likesCount[key];
        }
    });

    return mostLikesCount;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };