let cam;
let delta = 0.001;
let ed;
let rotXAmount = 180;
let rotYAmount = 0;
let posXAmount = 0;
let posYAmount = 0;
let zoomedZAmount = 0;
let normalMaterialVar = 0;
let color1slider, color2slider, color3slider, strokslider, backslider;
let color1val, color2val, color3val, strokval, backval;
let colorChange;
var canvas;
let logoImg;
let showModel;
let aboutNoScroll;
let zParam;
var body;
let catorgies;
let stl;
var stlList;
let postsMem;
var postsList;
let currentOpName = []; 
let currentTtl = [];
let currentDesc = [];
let stlSelection = [];
let accounts;
var accountsList;
let category;
let subCategory;
var categoryList;
var subCategoryList;
var subOption;
var subOptionName;
let optionName;
let option;
var selection;

function preload() {
  ed = loadModel('ed.obj', true);
  categories = loadXML('categories.xml');
  stl = loadXML('stl.xml');
  postsMem = loadXML('posts.xml');
  accounts = loadXML('accounts.xml');
}

window.onload = function() {
  
  createHome();
  
  body = document.body, 
    r = document.querySelector('#r'), 
    g = document.querySelector('#g'), 
    b = document.querySelector('#b'), 
    r_out = document.querySelector('#r_out'), 
    g_out = document.querySelector('#g_out'), 
    b_out = document.querySelector('#b_out'), 
    hex_out = document.querySelector('#hex');


  r.addEventListener('change', function() {
    setColor();
    r_out.value = r.value;
  }
  , false);

  r.addEventListener('input', function() {
    setColor();
    r_out.value = r.value;
  }
  , false);

  g.addEventListener('change', function() {
    setColor();
    g_out.value = g.value;
  }
  , false);

  g.addEventListener('input', function() {
    setColor();
    g_out.value = g.value;
  }
  , false);

  b.addEventListener('change', function() {
    setColor();
    b_out.value = b.value;
  }
  , false);

  b.addEventListener('input', function() {
    setColor();
    b_out.value = b.value;
  }
  , false);
};

function setup() {
  
  categoryList = document.getElementById("categories");
  subCategoryList = document.getElementById("subCategories");

  category = categories.getChildren('category');

  subCategory = categories.getChildren('subCategory');

  for (let i = 0; i < category.length; i++) {
    optionName = category[i].getContent();
    option = document.createElement("option");
    option.text = optionName;
    categoryList.add(option, categoryList[i]);
  }

  categoryList.selectedIndex = "0";

  for (let i = 0; i < subCategory.length; i++) {
    subOptionName = subCategory[i].getContent();
    subOption = document.createElement("option");
    subOption.text = subOptionName;
    subCategoryList.add(subOption, subCategoryList[i]);
  }

  subCategoryList.selectedIndex = "0";

  selectCat();
 
  const opList = document.querySelectorAll("#opName");
  const opArray = [...opList];

  const titleList = document.querySelectorAll("#postTitle");
  const titleArray = [...titleList];

  const descList = document.querySelectorAll("#postDesc");
  const descArray = [...descList];

  postsList = postsMem.getChildren('post');
  stlList = stl.getChildren('file');

  for (let i = 0; i < postsList.length; i++) {

    currentOpName[i] = postsList[i].getString('op');
    opArray[i].innerHTML = currentOpName[i];

    currentTtl[i] = postsList[i].getString('ttl');
    titleArray[i].innerHTML = currentTtl[i];

    currentDesc[i] = postsList[i].getString('desc');
    descArray[i].innerHTML = currentDesc[i];
   
  }
  

  canvas = createCanvas(windowWidth / 2, windowHeight / 2, WEBGL);
  canvas.position(windowWidth/ 4, windowHeight / 4 + 175);
  //normalMaterial();
  cam = createCamera();


  color1slider = createSlider(0, 255, 0);
  color2slider = createSlider(0, 255, 255);
  color3slider = createSlider(0, 255, 0);
  strokslider = createSlider(0, 255, 0);
  backslider = createSlider(0, 255, 200);

  color1slider.position(windowWidth / 4, windowHeight / 4  + 650);
  color2slider.position(windowWidth / 4 + 170, windowHeight / 4 + 650);
  color3slider.position(windowWidth / 4 + 340, windowHeight / 4 + 650);
  strokslider.position(windowWidth / 4 + 510, windowHeight / 4 + 650);
  backslider.position(windowWidth / 4 + 680, windowHeight / 4 + 650);

  color1slider.style('width', '80px');
  color2slider.style('width', '80px');
  color3slider.style('width', '80px');
  strokslider.style('width', '80px');
  backslider.style('width', '80px');

  colorChange = createCheckbox('Texture toggle!', false);
  colorChange.changed(myCheckedEvent);
  colorChange.position(windowWidth / 4 + 830, windowHeight / 4 + 650);

  document.getElementById("defaultOpen").click();
 
}

function draw() {

  if (showModel == true) {

    canvas.show();

    background(backval, backval, backval, 255);

    if (zParam == true) {

      cam.move(posYAmount, posXAmount, zoomedZAmount / 10);
    } else if (zParam == false) {

      cam.move(posYAmount, posXAmount, 0);
    }


    posXAmount = 0;
    posYAmount = 0;
    zoomedZAmount = 0;

    rotateX(rotXAmount);
    rotateY(rotYAmount);

    if (winMouseX > windowWidth / 4) {
      if (winMouseX < windowWidth - windowWidth / 4) {
        if (winMouseY > windowHeight / 4 + 145) {
          if (winMouseY < windowHeight - windowHeight / 4 + 145) {

            zParam = true;

            if (mouseIsPressed) {

              if (mouseButton == LEFT) {
                rotXAmount -= movedY / 200;
                rotYAmount -= movedX / 200;
              } 

              if (mouseButton == CENTER) {
                posXAmount -= movedY;
                posYAmount -= movedX;
              }
            }
          } else { 
            zParam = false;
          }
        } else { 
          zParam = false;
        }
      } else { 
        zParam = false;
      }
    } else { 
      zParam = false;
    }



    model(ed);

    color1val = color1slider.value();
    color2val = color2slider.value();
    color3val = color3slider.value();
    strokval = strokslider.value();
    backval = backslider.value();

    color1slider.show();
    color2slider.show();
    color3slider.show();
    strokslider.show();
    backslider.show();
    colorChange.show();


    if (normalMaterialVar == 1) {

      normalMaterial();
    } else if (normalMaterialVar == 0) {

      stroke(strokval);

      emissiveMaterial(color1val, color2val, color3val, 100);
    }
  } else if (showModel == false) {

    color1slider.hide();
    color2slider.hide();
    color3slider.hide();
    strokslider.hide();
    backslider.hide();
    colorChange.hide();

    canvas.hide();
  }
}

function windowResized() {

  resizeCanvas(windowWidth / 2, windowHeight / 2);
  canvas.position(windowWidth/ 4, windowHeight / 4);
}

function selectCat() {
  var a = document.getElementById("categories").selectedIndex;
  var b = document.getElementById("categories").options;
  //console.log("Index: " + b[a].index + " is " + b[a].text);

  var c = document.getElementById("subCategories").selectedIndex;
  var d = document.getElementById("subCategories").options;

  if (b[a].text == "All") {

    for (let j = 0; j < subCategory.length; j++) {

      subCategoryList[j].disabled = false;

      subCategoryList.selectedIndex = subCategoryList[0].index;
    }
  } else {

    for (let j = 0; j < subCategory.length; j++) {
      var attribute = subCategory[j].getString('id');

      if (attribute == b[a].text) {

        if (subCategory[j].getContent() == subCategoryList[j].text) {


          subCategoryList[j].disabled = false;
          subCategoryList.selectedIndex = subCategoryList[j].index;
        } else {
        }
      } else {

        subCategoryList[j].disabled = true;
      }
    }
  }
}

function myCheckedEvent() {
  if (this.checked()) {
    normalMaterialVar = 1;
  } else {
    normalMaterialVar = 0;
  }
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  zoomedZAmount = event.delta;
  //uncomment to block page scrolling
  if (showModel == true) {
    return false;
  } else {
  }
  
  if(aboutNoScroll == true){
    return false;
  } else {
    
  }
}

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default 
  /*//var i, tabcontent, tablinks;
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
   tabcontent[i].style.display = "none";
   
   }*/

  tabcontent = document.getElementsByClassName("home");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tabcontent = document.getElementsByClassName("inspector");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tabcontent = document.getElementsByClassName("stash");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tabcontent = document.getElementsByClassName("about");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }


  if (pageName == "Model Inspector") {

    showModel = true;
  } else {

    showModel = false;
  }
  
  if(pageName == "About"){
   
    aboutNoScroll = true;
    
  } else {
   
    aboutNoScroll = false;
    
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("myTopnav");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }


  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}


function setColor() {
  var r_hex = parseInt(r.value, 10).toString(16), 
    g_hex = parseInt(g.value, 10).toString(16), 
    b_hex = parseInt(b.value, 10).toString(16), 
    hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
  body.style.backgroundColor = hex; 
  hex_out.value = hex;
}

function pad(n) {
  return (n.length<2) ? "0"+n : n;
}

window.onscroll = function() {myFunction();};

// Get the header
var header = document.getElementById("myTopnav");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.getElementById("FTIJPIlogo").src = "ftijpilogo_cut.jpg";
    document.getElementById("headerBackground").style.height = "225px";
  } else {
    header.classList.remove("sticky");
    document.getElementById("FTIJPIlogo").src = "ftijpilogo.jpg";
    document.getElementById("headerBackground").style.height = "350px";
  }
 
}

function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


function createHome(){
  let mainDiv = null;
  let my_div = null;
  let pagination = null;
let row = null;
let column = null;
let card = null;
let postImage = null;
let container = null;
let opNameHere = null;
let titleHere = null;
let descHere = null;
let modelButton = null;
let modelButtonContainer = null;
let stashButton = null;
let stashButtonContainer = null;
let downloadButton = null;
let downloadButtonContainer = null;
let sq = null;
var imageName = ["post.jpg", "post2.jpg", "post3.jpg", "post.jpg", "post2.jpg", "post3.jpg", "post.jpg", "post2.jpg", "post3.jpg", "post.jpg", "post2.jpg", "post3.jpg"];
let noOfResults = 12;

  // create a new div element
  // and give it some content
  mainDiv = document.createElement('div');
  mainDiv.setAttribute('id', 'Home');
  mainDiv.setAttribute('class', 'home');
  
  toolbar = document.getElementById("toolbar");
  mainDiv.appendChild(toolbar);
  
  row = document.createElement('div');
  row.setAttribute('class', 'row');
  
  mainDiv.appendChild(row);

  for(i = 0; i < noOfResults; i++){
    
    column = document.createElement('div');
    column.setAttribute('class', 'Column');
    mainDiv.appendChild(column);
    
    row.appendChild(column);
    
    card = document.createElement('div');
    card.setAttribute('class', 'Card');
    
    column.appendChild(card);
    
    postImage = document.createElement('img');
    postImage.setAttribute('src', imageName[i]);
    postImage.setAttribute('alt', 'First post');
    postImage.setAttribute('style', 'width: 100%');
    
    container = document.createElement('div');
    container.setAttribute('class', 'container');
    
    opNameHere = document.createElement('h2');
    opNameHere.setAttribute('id', 'opName');
    
    titleHere = document.createElement('p');
    titleHere.setAttribute('class', 'title');
    titleHere.setAttribute('id', 'postTitle');
    
    descHere = document.createElement('p');
    descHere.setAttribute('id', 'postDesc');
    
    modelButtonContainer = document.createElement('p');
    modelButton = document.createElement('button');
    modelButton.innerHTML = "Model Inspector";
    modelButton.setAttribute('onclick','openPage(\'Model Inspector\')');
    modelButton.setAttribute('class','button');
    modelButtonContainer.appendChild(modelButton);
    
     stashButtonContainer = document.createElement('p');
     stashButton = document.createElement('button');
    stashButton.innerHTML = "Stash it";
    stashButton.setAttribute('onclick','openPage(\'Stash\')');
    stashButton.setAttribute('class','button');
    stashButtonContainer.appendChild(stashButton);
    
     downloadButtonContainer = document.createElement('p');
     downloadButton = document.createElement('button');
    downloadButton.innerHTML = "Download";
    downloadButton.setAttribute('class','button');
    downloadButtonContainer.appendChild(downloadButton);
    
    card.appendChild(postImage);
    card.appendChild(container);
    container.appendChild(opNameHere);
    container.appendChild(titleHere);
    container.appendChild(descHere);
    container.appendChild(modelButtonContainer);
    container.appendChild(stashButtonContainer);
    container.appendChild(downloadButtonContainer);
    
  }
  

  pagination = document.getElementById("pagination");
  
  mainDiv.appendChild(pagination);
  
  // add the newly created element and it's content into the DOM
  my_div = document.getElementById("div1");
  document.body.insertBefore(mainDiv, my_div); 
  
}