const apiKey = "UGiU9193GB1WZdOOEg3NN7YlyjCeGbzRoQAHngJBSuy3p6Hakp5fQp5b";
let currentSearchTerm = "nature";
let currentPage = 1;

const apiUrl = `https://api.pexels.com/v1/search?per_page=15&page=${currentPage}&query=`;
const searchButton = document.querySelector("#search-button");
const searchForm = document.querySelector("form");
const loadMoreButton = document.querySelector("#load-more");

function loadPhotos(searchTerm, page) {
  const url = apiUrl + searchTerm + `&page=${page}`;
  fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (page === 1) {
        document.querySelector("#photos").innerHTML = "";
      }
      data.photos.forEach((photo) => {
        const photoElement = `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${photo.src.medium}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">${photo.photographer}</p>
                        </div>
                    </div>
                </div>
            `;
        document.querySelector("#photos").innerHTML += photoElement;
      });

      if (data.next_page) {
        loadMoreButton.style.display = "block";
      } else {
        loadMoreButton.style.display = "none";
      }
    })
    .catch((error) => console.log(error));
}

loadPhotos(currentSearchTerm, currentPage);

searchButton.addEventListener("click", function () {
  const searchInput = document.querySelector("#search-input").value;
  currentSearchTerm = searchInput;
  currentPage = 1;
  loadPhotos(currentSearchTerm, currentPage);
  loadMoreButton.innerText = "Load more";
});

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input").value;
  currentSearchTerm = searchInput;
  currentPage = 1;
  loadPhotos(currentSearchTerm, currentPage);
  loadMoreButton.innerText = "Load more";
});

loadMoreButton.addEventListener("click", function () {
  currentPage++;
  loadPhotos(currentSearchTerm, currentPage);
});
