const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "../posts");

function parsePostDate(rawDate, filePath) {
  if (rawDate) {

    const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(rawDate).trim());
    if (isoDateOnly) {
      const [, year, month, day] = isoDateOnly;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return new Date(rawDate);
  }

  console.warn(
    `[postHelpers] No "date" in frontmatter for ${path.basename(filePath)}; ` +
      `falling back to file mtime, which may not reflect when it was written. ` +
      `Add "date: YYYY-MM-DD" to its frontmatter.`
  );
  return fs.statSync(filePath).mtime;
}

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
      date: parsePostDate(data.date, filePath),
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
