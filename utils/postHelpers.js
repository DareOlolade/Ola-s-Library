const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "../posts");

// Matches "2026-09-15-my-post-title.md" -> date "2026-09-15", rest "my-post-title.md"
const FILENAME_DATE_RE = /^(\d{4}-\d{2}-\d{2})-(.+\.md)$/;

function parseDateOnly(dateStr) {
  const [, year, month, day] = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function parsePostDate(rawDate, filePath, filenameDateMatch) {
  // Priority: date in filename > date in frontmatter > file mtime (last resort)
  if (filenameDateMatch) {
    return parseDateOnly(filenameDateMatch[1]);
  }

  if (rawDate) {
    const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(rawDate).trim());
    if (isoDateOnly) {
      return parseDateOnly(isoDateOnly[0]);
    }
    return new Date(rawDate);
  }

  console.warn(
    `[postHelpers] No date in the filename or frontmatter for ${path.basename(filePath)}; ` +
      `falling back to file mtime, which may not reflect when it was written. ` +
      `Rename the file to start with "YYYY-MM-DD-" to fix this.`
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

    const filenameDateMatch = FILENAME_DATE_RE.exec(filename);
    // slug: strip the date prefix (if present) and the .md extension
    const nameWithoutDate = filenameDateMatch ? filenameDateMatch[2] : filename;
    const slug = nameWithoutDate.replace(/\.md$/, "");

    return {
      slug,
      title: data.title || slug,
      date: parsePostDate(data.date, filePath, filenameDateMatch),
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
