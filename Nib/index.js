var self = require("sdk/self");
const { MenuButton } = require('./lib/menu-button');
const { DropDownView } = require('./src/dropdownView');
const { FooterView } = require('./src/footerView');
var ss = require("sdk/simple-storage");
var utils = require('sdk/window/utils');

let dropDownView = null;
let footerView = null;
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

function getURL() {
  return utils.getMostRecentBrowserWindow().content.location.href;
}

exports.dummy = dummy;

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var btn = MenuButton({
  id: 'my-menu-button',
  label: 'My menu-button',
  button_label: 'Add reference',
  dropdown_label: 'Manage projects and references',
  icon: {
    "16": "./icon/icon-16.png",
    "32": "./icon/icon-32.png",
    "64": "./icon/icon-64.png"
  },
  onClick: handleClick
});


dropDownView = new DropDownView(btn);
footerView = new FooterView(btn);
// set up our messaging
// it largely is a thin layer to the functions
dropDownView.panel.port.on('getURL', function () {

});
dropDownView.panel.port.on("addReferenceRequest", function(ref) {
  console.log(ref);
});

dropDownView.panel.port.on("removeReferenceRequest", function(ref) {
  console.log(ref);
});

dropDownView.panel.port.on('getURLRequest', function() {
  var browserWindow = utils.getMostRecentBrowserWindow();
  dropDownView.panel.port.emit('getURLResponse', browserWindow.content.location.href);
});

dropDownView.panel.port.on("checkIfReferenceRequest", function(ref) {
  console.log(ref);
  dropDownView.panel.port.emit('checkIfReferenceResponse', 'okay! resposne from index.js');
});


function addReference(reference) {
  console.log(reference);
}

function removeReference(reference) {
  console.log(reference);
}

dropdown_open = false;
footer_open = false;
open_count = 0;

function handleClick(state, isMenu) {
  if (isMenu) {
    if (!footer_open) {
      open_count += 1;
      footerView.panel.port.emit('wakeUp', open_count);
    }
    footer_open = !footer_open;
    footerView.show();
  } else {
    if (!dropdown_open) {
      open_count += 1;
      dropDownView.panel.port.emit('wakeUp', open_count);
    }
    dropdown_open = !dropdown_open;
    dropDownView.show();
  }
}
