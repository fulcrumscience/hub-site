import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

// Configure these for your content repository
const GITHUB_ORG = 'fulcrumscience';
const GITHUB_REPO = 'hub-content';
const BRANCH = 'main';
const CONTENT_DIR = 'content';

async function fetchTree() {
  const url = `https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch tree: ${res.status}`);
  const data = await res.json();
  return data.tree.filter(item =>
    item.type === 'blob' && (item.path.endsWith('.md') || item.path.endsWith('.json'))
  );
}

async function fetchFile(path) {
  const url = `https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/${BRANCH}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.text();
}

async function fetchContent() {
  console.log(`Fetching content from ${GITHUB_ORG}/${GITHUB_REPO}...`);

  const files = await fetchTree();
  console.log(`Found ${files.length} files\n`);

  for (const file of files) {
    const localPath = join(CONTENT_DIR, file.path);
    mkdirSync(dirname(localPath), { recursive: true });

    console.log(`  ${file.path}`);
    const content = await fetchFile(file.path);
    writeFileSync(localPath, content);
  }

  console.log('\nContent fetched successfully!');
}

fetchContent().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
