const favoritesList = document.querySelector(".favorites");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  //gets favorites from the local storage and then converts to an array
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  //creates an HTML element for each brewery in the local storage
  const favoritesArray = favorites.map((favorite) => {
    return `<div class="card clear" data-name = "${favorite.name}" style=" background-color: #f2c025; width: 18rem;">
    
    <div class="card-body">
    <a style ="text-decoration: none;" href="${favorite.website_url}" target="_blank" class="card-link">
      <h5 class="card-title">${favorite.name}</h5>
      </a>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.city}, ${favorite.state}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.street}</h6>
      <h6 class="card-subtitle mb-2 text-muted">phone: ${favorite.phone}</h6>
      
      <button style ="float:right;"class="remove btn btn-outline-danger">Remove </button>
      
    </div>
  </div>
  `;
  });

  //joins array into a string
  favoritesList.innerHTML = favoritesArray.join("");
});

//allows you to remove an element from the favorites list
document.addEventListener("click", (e) => {
  //   e.preventDefault();
  if (e.target.classList.contains("remove")) {
    const target = document.querySelector(".clear");

    //removing element from local storage and HTML

    //First, get the current data in the local storage and turn it into an array
    let favoriteList = JSON.parse(localStorage.getItem("favorites"));

    //find the object that you want to remove. This will return the object that matches the name of the card where the remove button is clicked
    const elementRemoved = favoriteList.find((element) => {
      return element.name === target.dataset.name;
    });

    //loop through the local storage. If the name matches the name of object that you want to remove, splice that object from the array
    for (let i = 0; i < favoriteList.length; i++) {
      if (favoriteList[i].name === elementRemoved.name) {
        favoriteList.splice(i, 1);
      }
    }

    //turn the local storage array back into JSON
    favoriteList = JSON.stringify(favoriteList);
    //Reset the local storage to the new JSON object that has removed the desired item
    localStorage.setItem("favorites", favoriteList);
    //Remove HTML
    target.remove();
  }
});
