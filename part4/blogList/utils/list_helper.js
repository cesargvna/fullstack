import _ from "lodash";
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const res = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog,
  );
  const favorite = {
    title: res.title,
    author: res.author,
    likes: res.likes,
  };
  return favorite;
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(_.keys(authors), (author) => authors[author]);
  const res = {
    author: topAuthor,
    blogs: authors[topAuthor],
  };
  return res;
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const likes = _.mapValues(authors, (blogs) =>
    blogs.reduce((sum, blog) => sum + blog.likes, 0),
  );
  const topAuthor = _.maxBy(_.keys(likes), (author) => likes[author]);
  const res = {
    author: topAuthor,
    likes: likes[topAuthor],
  };
  return res;
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
