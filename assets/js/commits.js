document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("commits-container");

  try {
    const username = "eiharun";
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const events = await response.json();

    // Extract commits from PushEvents safely
    let commits = [];
    events.forEach(event => {
      if (event.type === "PushEvent" && event.payload && event.payload.commits) {
        event.payload.commits.forEach(commit => {
          if (commit && commit.sha && commit.message) {
            commits.push({
              message: commit.message,
              repo: event.repo.name,
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
              date: new Date(event.created_at)
            });
          }
        });
      }
    });

    commits = commits.sort((a, b) => b.date - a.date).slice(0, 15);

    // Remove the loader
    container.innerHTML = "";

    if (commits.length === 0) {
      container.innerHTML = "<p>No recent commits found (or API limit hit).</p>";
      return;
    }

    const list = document.createElement("ul");
    list.className = "commit-list";

    commits.forEach(commit => {
      const item = document.createElement("li");
      item.className = "commit-item";
      item.innerHTML = `
        <div class="commit-message">💬 ${commit.message}</div>
        <div class="commit-meta">
          📂 <a href="https://github.com/${commit.repo}" target="_blank">${commit.repo}</a>
          • <a href="${commit.url}" target="_blank">view commit</a>
          • <span class="commit-date">${commit.date.toLocaleString()}</span>
        </div>
      `;
      list.appendChild(item);
    });

    container.appendChild(list);
  } catch (error) {
    container.innerHTML = `<p class="error">❌ Failed to load commits. (${error.message})</p>`;
    console.error("Error fetching commits:", error);
  }
});
