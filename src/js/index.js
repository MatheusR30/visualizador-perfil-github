import { fetchGithubUser, fetchGithubRepos } from "./githubApi.js";
import { renderProfile } from "./profileView.js";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

btnSearch.addEventListener("click", async () => {
  const userName = inputSearch.value;
  if (!userName) {
    alert("Por favor, digite um nome de usuário do GitHub.");
    profileResults.innerHTML = "";
    return;
  }

  profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

  try {
    const userData = await fetchGithubUser(userName);
    const userRepos = await fetchGithubRepos(userName);
    console.log(userRepos);

    renderProfile(userData, userRepos, profileResults);
  } catch (error) {
    console.error("Erro ao buscar o perfil do ususario:", error);
    alert(
      "Usuário nao encontrado. Por favor, verifique o nome do usuário e tente novamente",
    );
  }
});
