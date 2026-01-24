import { writeFileSync, mkdirSync, readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, resolve } from 'path';

// Configure these for your content repository
const GITHUB_ORG = 'fulcrumscience';
const GITHUB_REPO = 'hub-content';
const BRANCH = 'main';
const CONTENT_DIR = 'content';
const CONTENT_SOURCE = process.env.CONTENT_SOURCE || 'remote';
const LOCAL_CONTENT_PATH = process.env.CONTENT_LOCAL_PATH || '';

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
  if (CONTENT_SOURCE === 'skip') {
    console.log('Skipping content fetch (CONTENT_SOURCE=skip).');
    return;
  }

  if (CONTENT_SOURCE === 'local') {
    if (!LOCAL_CONTENT_PATH) {
      throw new Error('CONTENT_LOCAL_PATH is required when CONTENT_SOURCE=local');
    }

    const localRoot = resolve(LOCAL_CONTENT_PATH);
    console.log(`Copying content from local path: ${localRoot}`);

    const collectFiles = (dir, base = '') => {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const relPath = join(base, entry);
        const stats = statSync(fullPath);
        if (stats.isDirectory()) {
          collectFiles(fullPath, relPath);
        } else if (entry.endsWith('.md') || entry.endsWith('.json')) {
          const localPath = join(CONTENT_DIR, relPath);
          mkdirSync(dirname(localPath), { recursive: true });
          writeFileSync(localPath, readFileSync(fullPath));
          console.log(`  ${relPath}`);
        }
      }
    };

    collectFiles(localRoot);
    console.log('\nContent copied successfully!');
    return;
  }

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
