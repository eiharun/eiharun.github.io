---
layout: page
title: track my git
permalink: /commits/
nav: true
nav_order: 6
---

# Recent GitHub Commits

<div id="commits-container">
  <div class="spinner"></div>
  <p class="loading-text">Fetching commits...</p>
</div>

<style>
.spinner {
  margin: 20px auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #555;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

.load-more-btn {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #444;
  color: white;
  cursor: pointer;
}
.load-more-btn:hover { background-color: #666; }
</style>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("commits-container");
  const commitsPerPage = 50;
  let commits = [];
  let page = 0;

  try {
    const res = await fetch("/assets/json/commits.json?cachebust=" + Date.now());
    if (!res.ok) throw new Error("Failed to fetch commits.json");
    commits = await res.json();

    if (!commits.length) {
      container.innerHTML = "<p>No commits found.</p>";
      return;
    }

    container.innerHTML = ""; // clear spinner on fresh load

    function renderCommits() {
      const start = page * commitsPerPage;
      const end = start + commitsPerPage;
      const slice = commits.slice(start, end);

      slice.forEach(commit => {
        const pre = document.createElement("pre");
        pre.innerHTML = `💬 ${commit.message}
📂 <a href="https://github.com/eiharun/${commit.repo}" target="_blank">${commit.repo}</a> • <a href="${commit.url}" target="_blank">view</a> • ${new Date(commit.date).toLocaleString()}`;
        container.appendChild(pre);
      });

      // Remove old button if it exists
      const oldBtn = document.querySelector(".load-more-btn");
      if (oldBtn) oldBtn.remove();

      // Add "Load 50 more" button at bottom if needed
      if (end < commits.length) {
        const btn = document.createElement("button");
        btn.textContent = "Load 50 more";
        btn.className = "load-more-btn";
        btn.addEventListener("click", () => {
          page++;
          renderCommits();
        });
        container.appendChild(btn); // always appended at the end
      }
    }

    // Always start fresh on page load
    page = 0;
    renderCommits();

  } catch (err) {
    container.innerHTML = `<p style="color:red">❌ Failed to load commits: ${err.message}</p>`;
    console.error(err);
  }
});
</script>
