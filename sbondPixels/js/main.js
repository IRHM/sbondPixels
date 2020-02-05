// Create element
var pxlBox = document.createElement("SPAN");

//pxlBox.setAttribute("id", "pxlBox");

// Style element
var pxlBoxS = pxlBox.style;

pxlBoxS.position = "fixed";
pxlBoxS.zIndex = "9999999999";
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

// Listen for message when to enable/disable px bx
browser.runtime.onMessage.addListener((message) => {
	if(message.enabled === 1){
		console.log(message);
		pxlBoxS.display = "";
	} 
	else if(message.enabled === 0){
		console.log(message);
		pxlBoxS.display = "none";
	}
	else{
		onError("Message not understood");
	}
});

function onError(e){
  console.error(e);
}

// Append element to end of body
document.body.appendChild(pxlBox);