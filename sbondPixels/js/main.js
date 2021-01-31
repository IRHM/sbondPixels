function onError(e) {
  console.error(e);
}

// Create element
var pxlBox = document.createElement("SPAN");

// Style element
pxlBox.style.cssText = `
  display: none !important;
  position: fixed !important;
  z-index: 9999999999 !important;
  top: 5px !important;
  left: 5px !important;
  background-color: black;
  color: white !important;
  border: 1px solid white;
  font-family: sans-serif !important;
  font-size: 16px !important;
  letter-spacing: normal !important;
  line-height: 1 !important;
  padding: 4px !important;
`;

function showPxBx(show) {
  if (show) {
    pxlBox.style.display = "";
    pxlBox.textContent = getRes();
    enabled = 1;
  } else {
    pxlBox.style.display = "none";
    enabled = 0;
  }
}

// Get window dimensions
function getRes() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  return windowWidth + " x " + windowHeight;
}

// Listen for when to enable/disable px bx
browser.storage.onChanged.addListener(function (data) {
  if (data.settings.newValue.enabled) {
    // Enable
    showPxBx(1);
  } else {
    // Disable
    showPxBx(0);
  }
});

// Re-set res on resize
window.addEventListener("resize", function (event) {
  if (enabled) {
    showPxBx(1);
  } else {
    showPxBx(0);
  }
});

// Set default display for px bx
browser.storage.local.get().then(function (data) {
  enabled = data.settings.enabled;
  if (enabled) {
    // Enable
    showPxBx(1);
  } else {
    // Disable
    showPxBx(0);
  }
});

// Append element to end of body
document.body.appendChild(pxlBox);
