// Select profile information
const profile = document.querySelector(".overview");
// Select repo list
const repoList = document.querySelector(".repo-list");
// Username
const username = "grahamcottridge";
// Select repo section
const repoSection = document.querySelector(".repos");
// Select repo data section
const repoData = document.querySelector(".repo-data");

// Fetch profile from API
const getProfile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  displayProfile(data);
};

getProfile();

// Display profile
const displayProfile = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
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
  getRepos();
};

// Fetch repos from API
const getRepos = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
  );
  const repoData = await res.json();
  displayRepos(repoData);
};

// Sub function to display repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// Target repo name to display info
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// Fetch repo info
const getRepoInfo = async function (repoName) {
  const info = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await info.json();
  console.log(repoInfo);
  // fetch languages used infor
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // List of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  displayRepo(repoInfo, languages);
};

// Display repo info
const displayRepo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};
