// Create element
var pxlBox = document.createElement("SPAN");

// Style element
var pxlBoxS = pxlBox.style;

pxlBoxS.position = "fixed";
pxlBoxS.top = "5px";
pxlBoxS.left = "5px";
pxlBoxS.backgroundColor = "black";
pxlBoxS.color = "white";
pxlBoxS.padding = "2px 5px";

// Get and set window dimensions

function getRes(){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  return windowWidth + ' x ' + windowHeight;
}

// Re-set res on resize
window.addEventListener("resize", function(event){
  pxlBox.innerHTML = getRes();
});

// Set res for first time
pxlBox.innerHTML = getRes();

// Append element to end of body
document.body.appendChild(pxlBox);