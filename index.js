const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

let newsDataArr = [];

const API_KEY = "30c08f49e75d40f48630131342f0708c";
const HEADLINES_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&category=sports&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=ch&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function () {
  newsType.innerHTML = "<h4>Top News</h4>";
  fetchHeadlines();
};

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Allgemeine News</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sport</h4>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technologie</h4>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Suchen : " + newsQuery.value + "</h4>";
  fetchQueryNews();
});

const fetchHeadlines = async () => {
  const response = await fetch(HEADLINES_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    console.log(myJson);
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

const fetchQueryNews = async () => {
  if (newsQuery.value == null) return;

  const response = await fetch(
    SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY
  );
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  displayNews();
};

function displayNews() {
  newsdetails.innerHTML = "";

  if (newsDataArr.length == 0) {
    newsdetails.innerHTML = "<h5>Keine News gefunden.</h5>";
    return;
  }

  newsDataArr.forEach((news) => {
    let date = news.publishedAt.split("T");

    let col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    let card = document.createElement("div");
    card.className = "p-2";

    let image = document.createElement("img");
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    let cardBody = document.createElement("div");

    let newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    let dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    let discription = document.createElement("p");
    discription.className = "text-muted";
    discription.innerHTML = news.description;

    let link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(discription);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
  });
}

function darkmode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
