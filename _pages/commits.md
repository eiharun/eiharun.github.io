---
layout: page
title: track my git
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
  const username = "eiharun"; // your GitHub username

  try {
    // Step 1: Get all public repos
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!reposRes.ok) throw new Error(`GitHub API error (repos): ${reposRes.status}`);
    const repos = await reposRes.json();

    if (!repos.length) {
      container.innerHTML = "<p>No public repositories found.</p>";
      return;
    }

    let allCommits = [];

    // Step 2: Fetch commits for each repo
    for (const repo of repos) {
      const branch = repo.default_branch || "main";
      const commitsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?sha=${branch}&per_page=5`);
      if (!commitsRes.ok) continue; // skip if error
      const commits = await commitsRes.json();

      commits.forEach(commit => {
        allCommits.push({
          message: commit.commit.message,
          repo: repo.name,
          url: commit.html_url,
          date: new Date(commit.commit.author.date)
        });
      });
    }

    if (!allCommits.length) {
      container.innerHTML = "<p>No commits found.</p>";
      return;
    }

    // Step 3: Sort newest first
    allCommits.sort((a,b) => b.date - a.date);

    // Step 4: Render commits in log-style <pre>
    container.innerHTML = "";
    allCommits.forEach(commit => {
      const pre = document.createElement("pre");
      pre.innerHTML = `💬 ${commit.message}
📂 <a href="https://github.com/${username}/${commit.repo}" target="_blank">${commit.repo}</a> • <a href="${commit.url}" target="_blank">view</a> • ${commit.date.toLocaleString()}`;
      container.appendChild(pre);
    });

  } catch (error) {
    container.innerHTML = `<p style="color:red">❌ Failed to load commits: ${error.message}</p>`;
    console.error(error);
  }
});
</script>
