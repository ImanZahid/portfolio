// Script to fetch GitHub repos and cache them as static JSON
// Run with: node scripts/fetch-github-repos.js

const GITHUB_USERNAME = 'ImanZahid';
const OUTPUT_PATH = './public/data/repos.json';

async function fetchRepos() {
  console.log('Fetching repos from GitHub...');

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const repos = await response.json();
  console.log(`Fetched ${repos.length} repositories`);

  // Fetch README for each repo
  const reposWithReadme = await Promise.all(
    repos.map(async (repo) => {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
          { headers: { Accept: 'application/vnd.github.v3.raw' } }
        );
        if (readmeResponse.ok) {
          const readme = await readmeResponse.text();
          const shortReadme = readme.slice(0, 200).trim() + (readme.length > 200 ? '...' : '');
          return { ...repo, readme: shortReadme };
        }
      } catch {
        console.log(`No README for ${repo.name}`);
      }
      return repo;
    })
  );

  // Only keep the fields we need to reduce file size
  const minimalRepos = reposWithReadme.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    topics: repo.topics,
    language: repo.language,
    updated_at: repo.updated_at,
    readme: repo.readme,
  }));

  return {
    fetchedAt: new Date().toISOString(),
    repos: minimalRepos,
  };
}

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  try {
    const data = await fetchRepos();

    // Ensure directory exists
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log(`\nCached ${data.repos.length} repos to ${OUTPUT_PATH}`);
    console.log(`Cache timestamp: ${data.fetchedAt}`);
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    process.exit(1);
  }
}

main();
