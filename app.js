
const searchButtonCocktail = document.querySelector('#btn-get-cocktail');
const searchButtonIngredient = document.querySelector('#btn-get-ingredient');

let searchCocktail = document.querySelector('#input-cocktail-name');
let searchIngredient = document.querySelector('#input-ingredient-name');


const AppendCocktailSuggestionsHere = document.getElementById('AppendCocktailSuggestionsHere');
const AppendCocktailIngredientHere = document.getElementById('AppendCocktailIngredientHere');

var cocktailSuggestionsToRemove = document.getElementById('search-suggestions');
var IngredientSuggestionsToRemove = document.getElementById('AppendCocktailIngredientHere');

let currentTab = "";

let length = 0;
const cocktailSearchCard = document.getElementById('cocktail-search-card');
const ingredientSearchCard = document.getElementById('ingredient-search-card');
const cocktailDetails = document.getElementById('cocktail-details');

const randomCocktailDetails = document.getElementById('random-cocktail-details')
const favouritesList = document.getElementById('favourites-lst');

const infiniteScroll = document.getElementById('infinite-scroll');

let AmountofCocktailsInSearchResults = "";
let IngredientsWithoutSpace = "";

let currentIngredient ="";
var cocktailIngredients="";


let cocktailObjects = ""

if (searchButtonCocktail){
  searchButtonCocktail.addEventListener('click', getCocktail);

}
if (searchButtonIngredient){
  searchButtonIngredient.addEventListener('click', getIngredient);
}



//-----------------------------SETUP--------------------------------------
getRandomCocktail();

createFavouritesList();

addCocktailSuggestions()
getIngredientList()

//----------------------------GETTING THE API---------------------------------------

function getCocktail(){

    getCocktailInput();
  let cocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailInput}`;
  fetch(cocktails).then(getJson).then(updateDisplay).catch(reportError);
}


function getIngredient(i){
cocktailObject = cocktailIngredients[i];
let correctCocktailIngredient = cocktailObject.strIngredient1;
RemoveSpaces(correctCocktailIngredient);
console.log(IngredientsWithoutSpace);
let IngredientsForRealThisTime = IngredientsWithoutSpace
 // getIngredientInput();
let ingredients = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${IngredientsWithoutSpace}`;
fetch(ingredients).then(getJson).then(updateDisplayForIngredients).catch(reportError);
}

function getIngredientList(){
let ingredients = `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
fetch(ingredients).then(getJson).then(addIngredientSuggestions).catch(reportError);
}

//-------------------------------------------------------------------

function updateDisplayForIngredients(jsonObj){
  let ingredientObjectArray = jsonObj;
  ingredientObjects = ingredientObjectArray.drinks;
  
  RemoveCocktailSuggestions(IngredientSuggestionsToRemove);
  appendSearchItems(ingredientObjects, ingredientSearchCard);
}


function updateDisplay(jsonObj){
  let cocktailObjectArray = jsonObj;
  cocktailObjects = cocktailObjectArray.drinks;

  RemoveCocktailSuggestions(cocktailSuggestionsToRemove);
  appendSearchItems(cocktailObjects, cocktailSearchCard);
}

function RemoveCocktailSuggestions(elem){
    elem.parentNode.removeChild(elem);
}

//------------------------GENERATING CONTENT-------------------------------------------

function addIngredientSuggestions(jsonObj){
  let cocktailIngredientsArray = jsonObj;
  cocktailIngredients = cocktailIngredientsArray.drinks

  for (var i = 0; i <  cocktailIngredients.length ; i++ ) {
    let q = i+1;
    let cocktailNumber = cocktailIngredients[i];
    const cocktailSuggestions = document.createElement('ion-list');
    cocktailSuggestions.setAttribute("id", "CocktailIngredientSuggestions");
    cocktailSuggestions.innerHTML = `
            <ion-item button onclick="getIngredient(${i})">
              <ion-label>${cocktailNumber.strIngredient1}</ion-label>
            </ion-item>
            `
    AppendCocktailIngredientHere.appendChild(cocktailSuggestions);
    }   
}

function addCocktailSuggestions(){
  var cocktailForSuggestions = {
     "0": {
      "strDrink":"3-Mile Long Island Iced Tea",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
      "idDrink":"15300"},
      "1": {
      "strDrink":"Mojito",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/vwxrsw1478251483.jpg",
      "idDrink":"11000"},
      "2": {
      "strDrink":"Old Fashioned",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
      "idDrink":"11001"},
      "3": {
      "strDrink":"Gin Sour",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/noxp7e1606769224.jpg",
      "idDrink":"11417"},
      "4": {
      "strDrink":"Dry Martini",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg",
      "idDrink":"11005"},
      "5": {
      "strDrink":"Daiquiri",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
      "idDrink":"11006"},
      "6": {
      "strDrink":"Margarita",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      "idDrink":"15300"},
      "7": {
      "strDrink":"Snowday",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/4n1ipk1614009624.jpg",
      "idDrink":"178349"},
      "8": {
      "strDrink":"Figgy Thyme",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/pbw4e51606766578.jpg",
      "idDrink":"178344"},
      "9": {
      "strDrink":"Brigadier",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/nl89tf1518947401.jpg",
      "idDrink":"17825"},
      "10": {
      "strDrink":"Gin Smash",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/iprva61606768774.jpg",
      "idDrink":"11416"},
      "11": {
      "strDrink":"White Lady",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/jofsaz1504352991.jpg",
      "idDrink":"17194"},
      "12": {
      "strDrink":"Bermuda Highball",
      "strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/qrvtww1441206528.jpg",
      "idDrink":"11084"} }

      for (var i = 0; i < 12 ; i += 2 ) {

        let q = i+1;
        let cocktailNumber = cocktailForSuggestions[i];
        let cocktailNumber2 = cocktailForSuggestions[q];

   const cocktailSuggestions = document.createElement('ion-item');
   cocktailSuggestions.setAttribute("id", "CocktailSearchSuggestions");
   cocktailSuggestions.innerHTML = `
   <ion-row>
    <ion-col col-sm>
        <ion-card button onclick="clickme2(${cocktailNumber.idDrink})">
            <img src="${cocktailNumber.strDrinkThumb}">
            <ion-card-header>
                <ion-title class="ion-no-padding">${cocktailNumber.strDrink}</ion-title>
            </ion-card-header>
        </ion-card> 
    </ion-col>

    <ion-col>
        <ion-card col-sm button onclick="clickme2(${cocktailNumber2.idDrink})">
            <img src="${cocktailNumber2.strDrinkThumb}">
            <ion-card-header>
                <ion-title class="ion-no-padding">${cocktailNumber2.strDrink}</ion-title>
            </ion-card-header>
        </ion-card> 
    </ion-col>
  </ion-row>
   `
   AppendCocktailSuggestionsHere.appendChild(cocktailSuggestions);
  } 
  }


function appendSearchItems(cocktailData, WhereToAppendTheCards) {
  AmountofCocktailsInSearchResults = cocktailData.length;
    for (var i = 0; i < cocktailData.length ; i++) {
      let cocktailNumber = cocktailData[i];
      let cocktailsID = cocktailNumber.idDrink;
      const el = document.createElement('ion-item');
      el.setAttribute("id", "CocktailSearchResult");
      el.innerHTML = `
                        <ion-card forceOverscroll="true" button onclick="clickme(${cocktailsID})" >
                        <ion-card-header>
                            <ion-toolbar>
                                <Ion-card-title  >${cocktailNumber.strDrink}</Ion-card-title>
                                <ion-buttons slot="end">
                                    <ion-icon name="heart-outline" class="heart"></ion-icon>
                                </ion-buttons>
                            </ion-toolbar>

                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-card-subtitle>Gin</ion-card-subtitle>
                                    </ion-col>
                                    <ion-col>
                                        <ion-card-subtitle>Salt</ion-card-subtitle>
                                    </ion-col>
                                    <ion-col>
                                        <ion-card-subtitle>Lemon</ion-card-subtitle>
                                    </ion-col>
                                    <ion-col>
                                        <ion-card-subtitle>salt</ion-card-subtitle>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-card-header>   
                    <img id="cocktail-img" src="${cocktailNumber.strDrinkThumb}"></img>
                    </ion-card>
      `;
      WhereToAppendTheCards.appendChild(el);
      if (WhereToAppendTheCards === cocktailSearchCard){
        currentTab = cocktailDetails;
      }
      else if (WhereToAppendTheCards === favouritesList){
        currentTab = favouritesList;
      }
      length++;
      }
      console.log(WhereToAppendTheCards);
    }


//--------------------FUNCTIONS USED IN THE GENERATED HTML-----------------------------------------------
function clickme2(data){
  currentTab = cocktailDetails;
  getCocktailByID(data);
  RemoveCocktailSuggestions(cocktailSuggestionsToRemove);
}
  
function clickme(data){
  getCocktailByID(data);
}

//-------------------------USING THE API TO GET COCKTAIL INFORMATION------------------------------------------
 function getCocktailByID(cocktailsID) {
  let cocktailsFromID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailsID}`;
  fetch(cocktailsFromID).then(getJson).then(showCocktailSearchResultDetails).catch(reportError);
}

function getRandomCocktail() {
  let randomCocktail = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  //fetch(randomCocktail).then(getJson).then(showRandomCocktailDetails).catch(reportError);
  fetch(randomCocktail).then(getJson).then(showRandomCocktailDetailsFromAPI).catch(reportError);
}

function showRandomCocktailDetailsFromAPI(jsonObj){
    let cocktailObjectArray = jsonObj;
    let cocktailObjects = cocktailObjectArray.drinks;
    let cocktailInfo = cocktailObjects[0];

  IDForTheDetailsPage = "RandomCocktailDetailsPage";
  randomCocktailIngrediets = "randomCocktailIngredientsID"
  randomCocktailMeasurements = "randomCocktailMeasurementsID"
  GenerateDetails(cocktailInfo, IDForTheDetailsPage, randomCocktailDetails, randomCocktailIngrediets, randomCocktailMeasurements);
 }

function showCocktailSearchResultDetails(jsonObj){
  let cocktailObjectArray = jsonObj;

  let cocktailObjects = cocktailObjectArray.drinks;
  let cocktailInfo = cocktailObjects[0];

  console.log("here is the currentTeb");
  console.log(currentTab);
  if (currentTab === ""){
    currentTab = ingredientSearchCard;
    console.log("done");
    console.log("currentTab");
  }
  RemoveCocktails();
  IDForTheDetailsPage = "SearchCocktailDetailsPage";
  searchCocktailIngredients = "searchCocktailIngredientsID"
  searchCocktailMeasurements = "searchCocktailMeasurementsID"
  GenerateDetails(cocktailInfo, IDForTheDetailsPage, currentTab, searchCocktailIngredients, searchCocktailMeasurements );
}

function RemoveCocktails(){

    for (var i = 0; i < AmountofCocktailsInSearchResults; i++) {
  var elem = document.getElementById('CocktailSearchResult');
  elem.parentNode.removeChild(elem);
  }
}

//-------------------------GENERATING THE DETAILS PAGE------------------------------------------

function GenerateDetails(cocktailInfo, DetailsID, AppendID, ingredientID, measurementID){
  console.log(AppendID);
  let cocktailToAddToFavourites = cocktailInfo;
  const details = document.createElement('div');
  details.setAttribute("id", "DetailsPageID");
  
      details.innerHTML = `
      <div id="divID">
      <ion-header>          
      <ion-toolbar>

         <ion-title>${cocktailInfo.strDrink}</ion-title>
         <ion-buttons slot="end">
          <ion-icon name="heart-outline" color="danger" class="heart" button id="addToFavourites"></ion-icon>
           </ion-buttons>
         </ion-toolbar>
  </ion-header>


          <img src="${cocktailInfo.strDrinkThumb}" scroll="false" alt="Amaretto"></img>

          <ion-card>
              <ion-card-header>
                  <ion-card-title>Ingredients</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                  <ion-row>
                      <ion-col>
                          <ion-list id="${ingredientID}" lines="none">
                              
                          </ion-list>
                      </ion-col>
                      <ion-col>
                        <ion-list id="${measurementID}" lines="none">
                                
                        </ion-list>
                      </ion-col>
                  </ion-row>
              </ion-card-content>
          </ion-card>

              <ion-card>
                  <ion-card-header>
                      <ion-card-title>
                          Glass
                      </ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                      <p>${cocktailInfo.strGlass}</p>
                  </ion-card-content>
              </ion-card>

              <ion-card>
                  <ion-card-header>
                      <ion-card-title>
                          Instructions
                      </ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                      <p>${cocktailInfo.strInstructions}</p>
                      <p>${cocktailInfo.strIngredient1}</p>
                  </ion-card-content>
              </ion-card>

          <div id="PlaceForRemoveCocktailButton">
          <ion-button id="RemoveFavouriteButton" expand="block">Remove Cocktail</ion-button>
          </div>
 
          </ion-card>

          <br>
          <br>
          <br>
          </div>

      `;
      AppendID.appendChild(details);
      const DetailsPageID = document.getElementById("DetailsPageID");
      const PlaceForRemoveCocktailButton = document.getElementById("PlaceForRemoveCocktailButton");
      if (localStorage.getItem(cocktailInfo.idDrink) === null){
        PlaceForRemoveCocktailButton.remove();
     }
     else{
      const removeFavouriteButton = document.getElementById("RemoveFavouriteButton");
      const divID = document.getElementById("divID");
      removeFavouriteButton.addEventListener('click', removefavourite(cocktailInfo.idDrink, DetailsPageID));
     }

      const ingredientList = document.getElementById(ingredientID);
      const measurementList = document.getElementById(measurementID);
      const addToFavourites = document.getElementById("addToFavourites");
      addToFavourites.addEventListener('click', function() {
        addToFavorites(cocktailToAddToFavourites);
      });
      var cocktailIngredientList = [cocktailInfo.strIngredient1, cocktailInfo.strIngredient2, cocktailInfo.strIngredient3, cocktailInfo.strIngredient4, cocktailInfo.strIngredient5, cocktailInfo.strIngredient6, cocktailInfo.strIngredient7, cocktailInfo.strIngredient8, cocktailInfo.strIngredient9, cocktailInfo.strIngredient10, cocktailInfo.strIngredient11, cocktailInfo.strIngredient12, cocktailInfo.strIngredient13, cocktailInfo.strIngredient14, cocktailInfo.strIngredient15];
      var cocktailMeasurementList = [cocktailInfo.strMeasure1, cocktailInfo.strMeasure2, cocktailInfo.strMeasure3, cocktailInfo.strMeasure4, cocktailInfo.strMeasure5, cocktailInfo.strMeasure6, cocktailInfo.strMeasure7, cocktailInfo.strMeasure8, cocktailInfo.strMeasure9, cocktailInfo.strMeasure10, cocktailInfo.strMeasure11, cocktailInfo.strMeasure12, cocktailInfo.strMeasure13, cocktailInfo.strMeasure14, cocktailInfo.strMeasure15];
      for(let i=0; i<15; i++){

     if (cocktailIngredientList[i] !== null){
          let addingIngredientsDetails = document.createElement('ion-item');
          addingIngredientsDetails.innerHTML = `
            <ion-item>
            <p>${cocktailIngredientList[i]}</p>
            </ion-item> 
            `;
          ingredientList.appendChild(addingIngredientsDetails);
        }
      

      if (cocktailMeasurementList[i] !== null){
        let addingMeasurementDetails = document.createElement('ion-item');
        addingMeasurementDetails.innerHTML = `
        <ion-item>
        <p>${cocktailMeasurementList[i]}</p>
        </ion-item> 
        `;
        measurementList.appendChild(addingMeasurementDetails);
      
     }
    }
  }

function removeElement(removal){
  removal.remove();

}
 
function addToFavorites(data){
let data_serialized = JSON.stringify(data);
localStorage.setItem(data.idDrink, data_serialized);

createFavouritesList();
}

function createFavouritesList(){
  var storedCocktails = [];
for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    var value_deserialised = JSON.parse(value)
   
   storedCocktails.push(value_deserialised);
}


appendSearchItems(storedCocktails, favouritesList);
}

function removefavourite(id,DetailsPageID){
  localStorage.removeItem(id);
  removeElement(DetailsPageID);
}


function getJson(aResponse){
  return aResponse.json();
}

function reportError(anError){
  console.log(anError);
}


function getCocktailInput(){
 cocktailInputOld = searchCocktail.value;
 cocktailInput = cocktailInputOld.replace(/ /g, '_');
}

function RemoveSpaces(withSpaces){
  console.log(withSpaces.replace(/ /g, '_'));
  let withoutSpaces = withSpaces.replace(/ /g, '_');
  IngredientsWithoutSpace = withSpaces.replace(/ /g, '_');
  return withoutSpaces;
 }

 



