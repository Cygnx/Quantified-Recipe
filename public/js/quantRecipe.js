var prevDom;

function back() {
    document.body.innerHTML = prevDom;
}

function clearAll() {
    prevDom = document.body.innerHTML;
    //while (document.getElementById("button").nextSibling != null) document.getElementById("button").parentNode.removeChild(document.getElementById("button").nextSibling);
     document.getElementById("container").innerHTML = "";
}
// BUTTON FUNCTION
function ajaxCall() {
    clearAll();
    var keywords = document.getElementById("keywords").value;
    var keywordsQuery = "/dyn/getKeywords?keywords=" + keywords;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) useAJAXdata(xmlhttp.response);
    }
    xmlhttp.open("GET", keywordsQuery, true); // true = asynch
    xmlhttp.send();
}
// Adds stuff to some element of the DOM
function addToDOM(someHTML) {
  //  var element = document.body;
    //var div = document.createElement('div');
    var container = document.getElementById("container");
    container.innerHTML = someHTML;
   // element.appendChild(div);
}

function recipe(id) {
    clearAll();
    var keywordsQuery = "/dyn/getRecipe/" + id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            useAJAXdata2(xmlhttp.response);
        }
    }
    xmlhttp.open("GET", keywordsQuery, true); // true = asynch
    xmlhttp.send();
}
// CALLBACK FUNCTION
function useAJAXdata(responseJSON) {
    f2fObj = JSON.parse(responseJSON);
    //addToDOM("<div class='row-fluid'><div class='col-sm-5 col-sm-offset-2'> <h1>Here are some possible recipes </h1>");
    var recipes = "<div class='row-fluid'><div class='col-sm-5 col-sm-offset-2'> <h1>Here are some possible recipes </h1>";
        recipes += '<ul>';
    for (var i = 0; i < f2fObj.count; i++) {
        recipes += '<li onClick = \'recipe("' + f2fObj.recipes[i].recipe_id + '")\' class = "text">' + f2fObj.recipes[i].title + "</li>";
    }
    recipes += "</div></div></ul>";
    addToDOM(recipes);
}
// CALLBACK FUNCTION
function useAJAXdata2(responseJSON) {
    f2fObj = JSON.parse(responseJSON);
     document.body.background = f2fObj.recipe.image_url;
    var backButton = '<button type="button" onClick = "back()">Go back!</button>';
    var recipes = "<div class='row-fluid'><div class='col-sm-6 col-sm-offset-1'> <h3>" + f2fObj.recipe.title + "</h3>";
        recipes += '<ul>';

    var waterUsages = "<div class='col-sm-4 col-sm-offset-1'>";
        waterUsages += "<h1>Water Usage:</h1>";

    var total = 0;

    for (var i = 0; i < f2fObj.recipe.ingredients.length; i++) {
        var ing = f2fObj.recipe.ingredients[i].split("~~~")[0];
        var wtr = f2fObj.recipe.ingredients[i].split("~~~")[1];
        if(typeof wtr == 'undefined')
            wtr = 0;

        recipes += '<li><mark>' + ing + "</mark></li>";
        waterUsages += '<li><mark>' + wtr + "</mark></li>";

            total += Number(wtr);
    }
    recipes += "</ul></div>";
    waterUsages += "<li><h1 style='color:#add8e6;'>Total water usage is "+ Number(total) +"</h1></li>";
    waterUsages += "</ul></div></div>";

    var ingredients = backButton  + recipes + waterUsages;
    addToDOM(ingredients);
}