const API_KEY = "E44ehj1sHkc6t7dVll7i60DOab5vBF05";
const BASE_URL =
  "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=";
const URL = BASE_URL + API_KEY;
async function getNews() {
  await fetch(URL)
    .then((d) => d.json())
    .then((response) => {
      console.log(response.results);
      for (var i = 0; i < response.results.length; i++) {
        const output = document.getElementById("output");

        try {
          output.innerHTML += `
                    <div class="card">
                    <div class="card-body">
                    <img src="${response.results[i]["media"][0]["media-metadata"][2].url}" class="card-img-top" alt="${response.results[i]["media"][0].caption}" title="${response.results[i]["media"][0].caption}"><br>
                    <h2 class="card-title">${response.results[i].title}</h2>
                    <div class="card-text">
                        <p>${response.results[i].abstract}</p>
                    </div>
                    </div>
                    </div>
                    <br>
                    `;
          console.log(response.results[i]["media"][0].caption);
        } catch (err) {
          console.log(err);
        }
      }
      document.getElementById("copyright").innerHTML = response.copyright;
    });
}
getNews();
