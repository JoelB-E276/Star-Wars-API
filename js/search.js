function dropdownSearch(){
  let category = document.getElementById("category");
  let choiceCategory = category.options[category.selectedIndex].text; 
  swapiRequest(choiceCategory);
}

function dropdownItem(dropdownOption, itemUrl){ 
  deleteDropdown();
  let selectItem = document.getElementById("item");
  let select = document.createElement("select");
  let option = document.createElement("option");
  selectItem.appendChild(select);
  select.setAttribute("id", "itemName");
  select.setAttribute("onchange", "itemDetails()");
  select.appendChild(option);
  option.setAttribute("value","/");
  option.innerText = "details of";
 
  for(let i = 0; i < dropdownOption.length; i++){
    select.innerHTML += `<option class="itemList">${dropdownOption[i]} </option>`;
  }
  if(option){
   let optionlist = document.getElementsByClassName("itemList");
  
    for(let j = 0; j < optionlist.length; j++){
      for(let k = 0; k < itemUrl.length; k++){
        optionlist[j].setAttribute("value", itemUrl[j]);
      }
    }  
  }
}

function itemDetails(){
  let category = document.getElementById("category");
  let choiceCategory = category.options[category.selectedIndex].text; 
  let itemList = document.getElementById("itemName");
  let optionValue = itemList.options[itemList.selectedIndex].value;
  swapiRequest(choiceCategory, optionValue);
}



function createTable(data){
  let result = document.getElementById("result");
  result.innerHTML = "";
  let dropdownOption = [];
  let itemUrl = [];
  if(data.results){
    for(item of data.results){
      if(item.name){
        dropdownOption.push(item.name);
        itemUrl.push(item.url);
      }
      if(item.title){
        dropdownOption.push(item.title);
        itemUrl.push(item.url);
      }
      for(let property in item){
        if(item.name){
          result.innerHTML +=
          ` <tbody>
              <tr>
                <th class="table-warning" scope="row">${property} :</th>
                <td class="table-dark">${item[property]}</td>
              </tr>
            </tbody>`; 
        }
        if(item.title){
          result.innerHTML +=
          `<table class= table table-striped>
            <tbody>
              <tr>
                <th class="table-warning" scope="row" id="key">${property}</th>
                <td class="table-dark">'${item[property]}'</td>
              </tr>
            </tbody>
          </table>`; 
        }
      }
    }
  } else {
      for(let property in data){
        if(data.name){
          result.innerHTML +=
          ` <tbody>
              <tr>
                <th class="table-dark" scope="row">${property} :</th>
                <td>${data[property]}</td>
              </tr>
            </tbody>`; 
        }
        if(data.title){
          result.innerHTML +=
          `<table class= table table-striped>
            <tbody>
              <tr>
                <th class="table-dark" scope="row" id="key">${property}</th>
                <td>'${data[property]}'</td>
              </tr>
            </tbody>
          </table>`; 
        }
      }
    }
  dropdownItem(dropdownOption, itemUrl);
}  
 
function deleteDropdown(){
  let selectItem = document.getElementById("item");

  if(document.getElementById("itemName")){
    while (document.getElementById("itemName")) {
      let itemName = document.getElementById("itemName");
      selectItem.removeChild(selectItem.childNodes[0]);
      itemName.remove();
    }
  }
}

function swapiRequest(choiceCategory, optionValue = ''){
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);
        /* console.log(data.results);
        console.log(data); */
        createTable(data);
      } else {
        let message = document.getElementById("message");
        message.innerHTML = "<div class='alert alert-danger'>Une erreur est survenue, nous ne pouvons pas afficher les articles</div>";
      }
    }
  };
  if(optionValue.length > 5){
    httpRequest.open('GET', optionValue , true);
  } else {
      httpRequest.open('GET', 'https://swapi.dev/api/' + choiceCategory + '/', true);  
    }
 httpRequest.send();
};