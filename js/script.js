// Select profile information
const profile = document.querySelector(".overview");
// Select repo list
const repoList= document.querySelector(".repo-list")
// Username
const username = "grahamcottridge";

// Fetch profile from API
const getProfile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  displayProfile(data);
};

getProfile()

// Display all information
const displayProfile = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info")
  div.innerHTML = `
  <figure>
  <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
  profile.append(div);
  getRepos()
};

// Fetch repos from API
const getRepos = async function () {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
  const repoData = await res.json();
  displayRepos(repoData);
}

// Sub function to display repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
}