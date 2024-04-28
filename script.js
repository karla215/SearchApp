const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const userNotFound = document.querySelector(".user-not-found");
let users = [];

fetch("./itunes.json")
//fetch("https://itunes.apple.com/search?term=indie&entity=song")
.then(res => res.json())
.then(data => {
      users = data.results.map(user => {
          const card = userCardTemplate.content.cloneNode(true).children[0];
          const header = card.querySelector("[data-header]");
          const body = card.querySelector("[data-body]");
          header.textContent = user.artistName;
          body.textContent = user.trackName;
          return { artistName: user.artistName, trackName: user.trackName, element: card }
        })
})

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    let numOfCardsShown = 0;
    users.forEach(function(user) {
      const isFound =
        value && (
        user.artistName.toLowerCase().includes(value) ||
        user.trackName.toLowerCase().includes(value));
    if(isFound) {
          userCardContainer.append(user.element);
          userNotFound.innerHTML = "";
          numOfCardsShown++;
      }
    if(value && !numOfCardsShown) {
          userNotFound.innerHTML = "Artist and/or song not found"; 
    }
    user.element.classList.toggle("hide", !isFound);
    })
  })