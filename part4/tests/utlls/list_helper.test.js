const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../../utils/list_helper');

describe('list_helper', () => {
  let blog1;
  let blog2;
  let blog3;
  let blog4;
  let blog5;
  let emptyList;
  let listWithOneBlog;
  let listWithMultipleOrderedBlogs;
  let listWithMixedBlogs;
  let listWithDuplicateBlogs;

  beforeEach(() => {
    blog1 = {
      _id: 'id1',
      title: 'title1',
      author: 'author1',
      url: 'url1',
      likes: 1,
      __v: 0
    };
    
    blog2 = {
      _id: 'id2',
      title: 'title2',
      author: 'author2',
      url: 'url2',
      likes: 2,
      __v: 0
    };
    
    blog3 = {
      _id: 'id3',
      title: 'title3',
      author: 'author3',
      url: 'url3',
      likes: 3,
      __v: 0
    };
    
    blog4 = {
      _id: 'id4',
      title: 'title4',
      author: 'author4',
      url: 'url4',
      likes: 4,
      __v: 0
    };
    
    blog5 = {
      _id: 'id5',
      title: 'title5',
      author: 'author5',
      url: 'url5',
      likes: 5,
      __v: 0
    };
    
    emptyList = [];
    listWithOneBlog = [blog5];
    listWithMultipleOrderedBlogs = [blog1, blog2, blog3, blog4, blog5];
    listWithMixedBlogs = [blog3, blog1, blog5, blog4, blog2];
    listWithDuplicateBlogs = [blog5, blog2, blog1, blog5, blog4, blog4, blog5, blog5];
  })


  test('dummy returns one', () => {
    const result = dummy(emptyList)
    expect(result).toBe(1)
  })

  describe('total likes', () => {
    test('of empty list is zero', () => {
      const result = totalLikes(emptyList);
      expect(result).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog);
      expect(result).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
      const result = totalLikes(listWithMultipleOrderedBlogs);
      expect(result).toBe(15);
    });
  });

  describe('favorite blog', () => {
    const expectedResult = {
      title: 'title5',
      author: 'author5',
      url: 'url5',
      likes: 5
    };

    test('of empty list is empty object', () => {
      const result = favoriteBlog(emptyList);
      expect(result).toStrictEqual({});
    });

    test('of list with one blog is that blog', () => {
      const result = favoriteBlog(listWithOneBlog);
      expect(result).toStrictEqual(expectedResult);
    });

    test('of list with mixed multiple blogs is the right one', () => {
      const result = favoriteBlog(listWithMixedBlogs);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('most blogs', () => {
    let expectedResult = {
      author: 'author5',
      blogs: 0
    };

    test('of empty list is empty object', () => {
      const result = mostBlogs(emptyList);
      expect(result).toStrictEqual({});
    });

    test('of list with one blog is that author and one blog', () => {
      expectedResult.blogs = 1;
      const result = mostBlogs(listWithOneBlog);
      expect(result).toStrictEqual(expectedResult);
    });

    test('of list with multiple duplicate blogs is correct author and blog count', () => {
      expectedResult.blogs = 4;
      const result = mostBlogs(listWithDuplicateBlogs);
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('most likes', () => {
    let expectedResult = {
      author: 'author5',
      likes: 0
    };

    test('of empty list is empty object', () => {
      const result = mostLikes(emptyList);
      expect(result).toStrictEqual({});
    });

    test('of list with one blog is that author and its amount of likes', () => {
      expectedResult.likes = 5;
      const result = mostLikes(listWithOneBlog);
      expect(result).toStrictEqual(expectedResult);
    });

    test('of list with multiple duplicate blogs is correct author and likes count', () => {
      expectedResult.likes = 20;
      const result = mostLikes(listWithDuplicateBlogs);
      expect(result).toStrictEqual(expectedResult);
    });
  });

});