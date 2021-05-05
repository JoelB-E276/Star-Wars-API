/* 
let searchText = document.getElementById("search").value;
console.log(searchText);

searchBtn = document.getElementsByName("btn").addEventListener("click", function() {
  search();
});
 */

function createDisp(data) {

  let list = document.getElementById("result");
 
  for (planet of data.results) {

    list.innerHTML += "<li>"+ planet.name + "</li>"; 
    list.innerHTML += "<li>"+ planet.residents + "</li>"; 
    
    /* ajouter For in pour boucler sur les clefs à l'intérieur du tableau*/
 console.log(planet)





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
  httpRequest.open('GET', 'https://swapi.dev/api/planets', true);
  httpRequest.send();
}

search();

