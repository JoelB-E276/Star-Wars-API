/* 
let searchText = document.getElementById("search").value;
console.log(searchText);

searchBtn = document.getElementsByName("btn").addEventListener("click", function() {
  search();
});
 */

function createDisp(data) {

  for (results in data) {
    console.log(results);
    console.log(data.results);
    let getArticle = document.getElementById("filmsCont");
    let creatDivCount = document.createElement("div");
    creatDivCount.classList.add("container");
    let creatDivRow = document.createElement("div");
    creatDivRow.classList.add("row");
    let creatDivCol = document.createElement("div");
    creatDivCol.classList.add("col-xs-1", "col-md-6", "col-lg-4");
    let creatDivName = document.createElement("div");
    creatDivName.classList.add("dName");
    let creatDivPeople = document.createElement("div");
    creatDivPeople.classList.add("dPeople");

    creatDivCount.appendChild(creatDivRow);
    creatDivRow.appendChild(creatDivCol);
    creatDivCol.appendChild(creatDivName);
    creatDivName.appendChild(creatDivPeople);
    getArticle.appendChild(creatDivCount);

    creatDivName.innerText = name.value;
    /* creatDivPeople.innerText = text; */

    let thName = document.getElementById("name");
    thName.innerText = data;
    let tdFilms = document.getElementById("films.val");
    tdFilms.innerText = data.results;
    let dtPeople = document.getElementById("people.val");
    dtPeople.innerText = data.people;
    let dtPlanets = document.getElementById("planets.val");
    dtPlanets.innerText = data.planets;
    let tdSpaceships = document.getElementById("spacesphips.val");
    tdSpaceships.innerText = data.spaceships;
  }
}

function dispData(data) {
  let title = document.getElementsByClassName("title");

  for (const [name, results] of Object.entries(data)) {
    let title = document.getElementsByClassName("title");


    console.log(name);
    console.log(results);
    let creatDivCount = createDisp(data)
    document.body.innerHTML += name;

  }
}

function search() {

  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);

        createDisp(data);
        /* dispData(data); */
      }
      else {
        let filmsCont = document.getElementById("filmsCont");
        filmsCont.innerHTML = "<div class='alert alert-danger'>Une erreur est survenue, nous ne pouvons pas afficher les articles</div>";
      }
    }
  };
  //httpRequest.open('GET', 'https://swapi.dev/api/' + searchText + '/', true);
  httpRequest.open('GET', 'https://swapi.dev/api/planets/', true);
  httpRequest.send();
}

search();

