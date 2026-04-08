const API_KEY = "DEMO_KEY";

const content = document.getElementById("content");
const dateInput = document.getElementById("dateInput");

async function fetchAPOD(date) {
  let url = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

  if (date) {
    url = url + "&date=" + date;
  }

  const response = await fetch(url);
  const data = await response.json();

  displayData(data);
}

function displayData(data) {
  let media = "";

  if (data.media_type === "image") {
    media = "<img src='" + data.url + "'>";
  } else {
    media = "<iframe src='" + data.url + "'></iframe>";
  }

  let html =
    "<h2>" + data.title + "</h2>" +
    "<p>" + data.date + "</p>" +
    media +
    "<p>" + data.explanation + "</p>";

  content.innerHTML = html;
}

function getData() {
  fetchAPOD(dateInput.value);
}

function getToday() {
  fetchAPOD();
}

function getRandom() {
  let start = new Date(1995, 5, 16);
  let end = new Date();

  let randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  let formatted = randomDate.toISOString().split("T")[0];

  fetchAPOD(formatted);
}

fetchAPOD();