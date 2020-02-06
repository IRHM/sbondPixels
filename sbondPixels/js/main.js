function onError(e){
  console.error(e);
}

// Create element
var pxlBox = document.createElement("SPAN");

// Style element
var pxlBoxS = pxlBox.style;

pxlBoxS.display = "none";
pxlBoxS.position = "fixed";
pxlBoxS.zIndex = "9999999999";
pxlBoxS.top = "5px";
pxlBoxS.left = "5px";
pxlBoxS.backgroundColor = "black";
pxlBoxS.color = "white";
pxlBoxS.padding = "2px 5px";

function showPxBx(show){
	if(show){
		pxlBoxS.display = "";
		pxlBox.textContent = getRes();
		enabled = 1;
	}
	else{
		pxlBoxS.display = "none";
		enabled = 0;
	}
}

// Get window dimensions
function getRes(){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  return windowWidth + ' x ' + windowHeight;
}

// Listen for when to enable/disable px bx
browser.storage.onChanged.addListener(function(data){
	if(data.settings.newValue.enabled){
		// Enable
		showPxBx(1);
	}
	else{
		// Disable
		showPxBx(0);
	}
});

// Re-set res on resize
window.addEventListener("resize", function(event){
	if(enabled){
		showPxBx(1);
	}
	else{
		showPxBx(0);
	}
});

// Set default display for px bx
browser.storage.local.get().then(function(data){
  enabled = data.settings.enabled;
	if(enabled){
		// Enable
		showPxBx(1);
	}
	else{
		// Disable
		showPxBx(0);
	}
});

// Append element to end of body
document.body.appendChild(pxlBox);