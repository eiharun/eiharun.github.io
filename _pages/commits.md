---
layout: page
title: Track My Git
permalink: /commits/
nav: true
nav_order: 6
---

# Recent GitHub Commits

<div id="commits-container">
  <div class="loading-spinner"></div>
  <p class="loading-text">Fetching commits...</p>
</div>

<style>
/* Spinner */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 15px auto;
  animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

.loading-text {
  text-align: center;
  font-size: 0.95rem;
  color: #555;
  margin-top: 5px;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("commits-container");
  const username = "eiharun";
  const MAX_COMMITS = 50;

  try {
    // Step 1: Get all public repos sorted by last push
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`);
    if (!reposRes.ok) throw new Error(`GitHub API error (repos): ${reposRes.status}`);
    const repos = await reposRes.json();

    if (!repos.length) {
      container.innerHTML = "<p>No public repositories found.</p>";
      return;
    }

    let allCommits = [];

    // Step 2: Fetch commits for all branches of each repo
    for (const repo of repos) {
      // Get all branches
      const branchesRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/branches?per_page=100`);
      if (!branchesRes.ok) continue;
      const branches = await branchesRes.json();

      for (const branch of branches) {
        let page = 1;
        while (true) {
          const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?sha=${branch.name}&per_page=100&page=${page}`);
          if (!res.ok) break;
          const commits = await res.json();
          if (!commits.length) break;

          commits.forEach(commit => {
            allCommits.push({
              message: commit.commit.message,
              repo: repo.name,
              url: commit.html_url,
              date: new Date(commit.commit.author.date),
              branch: branch.name
            });
          });

          page++;
        }
      }
    }

    if (!allCommits.length) {
      container.innerHTML = "<p>No commits found.</p>";
      return;
    }

    // Step 3: Sort all commits by newest first and slice the most recent 50
    allCommits.sort((a,b) => b.date - a.date);
    const latestCommits = allCommits.slice(0, MAX_COMMITS);

    // Step 4: Render commits in log-style <pre>
    container.innerHTML = "";
    latestCommits.forEach(commit => {
      const pre = document.createElement("pre");
      pre.innerHTML = `💬 ${commit.message}
📂 <a href="https://github.com/${username}/${commit.repo}" target="_blank">${commit.repo}</a> (branch: ${commit.branch}) • <a href="${commit.url}" target="_blank">view</a> • ${commit.date.toLocaleString()}`;
      container.appendChild(pre);
    });

  } catch (error) {
    container.innerHTML = `<p style="color:red">❌ Failed to load commits: ${error.message}</p>`;
    console.error(error);
  }
});
</script>
