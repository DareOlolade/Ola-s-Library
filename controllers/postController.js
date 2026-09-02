const MarkdownIt = require("markdown-it");
const { getAllPosts, formatDate } = require("../utils/postHelpers");

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

// @desc    Get all blog posts
// @route   GET /
exports.getHome = (req, res) => {
  const posts = getAllPosts();
  res.render("index", { posts, formatDate });
};

// @desc    Get single blog post by slug
// @route   GET /post/:slug
exports.getPostBySlug = (req, res) => {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === req.params.slug);

  if (!post) {
    return res.status(404).render("404");
  }

  const html = md.render(post.content);
  res.render("post", { post, html, formatDate });
};

