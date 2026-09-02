const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "../posts");

function makeExcerpt(content) {
  const plain = content
    .replace(/^#.*$/m, "") 
    .replace(/[#>*_`\-]/g, "")
    .trim();
  return plain.slice(0, 160).trim() + (plain.length > 160 ? "…" : "");
}

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.md$/, "");

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date) : fs.statSync(filePath).mtime,
      tags: data.tags || [],
      excerpt: data.excerpt || makeExcerpt(content),
      content,
    };
  });

  posts.sort((a, b) => b.date - a.date);
  return posts;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

module.exports = {
  getAllPosts,
  formatDate,
};

