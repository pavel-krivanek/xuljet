var xuljet = require('lib/xuljet');

exports.Checkboxes = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.img = xuljet.imagesURI+'folder_yellow_open.png';
}
xuljet.inherits(exports.Checkboxes, xuljet.Component);

  
exports.Checkboxes.prototype.renderButtonsTab = function(xul)
{
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'tabbing'}),
    vbox(
    checkbox({flex: 1, label: 6, tabindex: 6, oncommand: function(){this['descTab'].value='6'}}),
    checkbox({flex: 1, label: 5, tabindex: 5, oncommand: function(){this['descTab'].value='5'}}),
    checkbox({flex: 1, label: 4, tabindex: 4, oncommand: function(){this['descTab'].value='4'}}),
    checkbox({flex: 1, label: 3, tabindex: 3, oncommand: function(){this['descTab'].value='3'}}),
    checkbox({flex: 1, label: 2, tabindex: 2, oncommand: function(){this['descTab'].value='2'}}),
    checkbox({flex: 1, label: 1, tabindex: 1, oncommand: function(){this['descTab'].value='1'}}),
    separator({flex: 1}),     
    description({bind: 'descTab'}, '(no input yet)')))
  }
}

exports.Checkboxes.prototype.renderButtonsAccess = function(xul)
{
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'access keys'}),
    vbox(
    checkbox({flex: 1, label: 'Animal', accesskey: 'A', oncommand: function(){this['descAccess'].value='Animal'}}),
    checkbox({flex: 1, label: 'Bear', accesskey: 'B', oncommand: function(){this['descAccess'].value='Bear'}}),
    checkbox({flex: 1, label: 'Cat', accesskey: 'C', oncommand: function(){this['descAccess'].value='Cat'}}),
    checkbox({flex: 1, label: 'Dog', accesskey: 'D', oncommand: function(){this['descAccess'].value='Dog'}}),
    checkbox({flex: 1, label: 'Deer', accesskey: 'E', oncommand: function(){this['descAccess'].value='Deer'}}),
    checkbox({flex: 1, label: 'Fish', accesskey: 'F', oncommand: function(){this['descAccess'].value='Fish'}}),
    separator({flex: 1}),     
    description({bind: 'descAccess'}, '(no input yet)')))
  }
}
  
exports.Checkboxes.prototype.renderButtonsStates = function(xul)
{  
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'These buttons have different button states'}),
    vbox(
    checkbox({flex: 1, label: 'Default', default: true, oncommand: function(){this['descStates'].value='Default'}}),
    checkbox({flex: 1, label: 'Checked', checked: true, oncommand: function(){this['descStates'].value='Checked'}}),
    checkbox({flex: 1, label: 'Normal', oncommand: function(){this['descStates'].value='Normal'}}),
    checkbox({flex: 1, label: 'Disabled', disabled: true, oncommand: function(){this['descStates'].value='Disabled'}}),
    separator({flex: 1}),     
    description({bind: 'descStates'}, '(no input yet)')))
  }
}  

exports.Checkboxes.prototype.renderButtonsOrientation = function(xul)
{  
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'orientation'}),
    vbox(
    checkbox({label: 'Left', oncommand: function(){this['descOrientation'].value='A checkbox to the left of the label'}}),
    checkbox({label: 'Right', dir: 'reverse', oncommand: function(){this['descOrientation'].value='A checkbox to the left of the label'}}),
    checkbox({label: 'Above', orient: 'vertical', dir: 'forward', oncommand: function(){this['descOrientation'].value='A checkbox above the label'}}),
    checkbox({label: 'Below', orient: 'vertical', dir: 'reverse', oncommand: function(){this['descOrientation'].value='A checkbox below the label'}}),
    separator({flex: 1}),     
    description({bind: 'descOrientation'}, '(no input yet)')))
  }
},  

exports.Checkboxes.prototype.renderButtonsImages = function(xul)
{    
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'images'}),
    vbox(
    checkbox({label: 'Left', src: this.img, oncommand: function(){this['descImages'].value='A checkbox to the left of the label'}}),
    checkbox({label: 'Right', src: this.img, dir: 'reverse', oncommand: function(){this['descImages'].value='A checkbox to the left of the label'}}),
    checkbox({label: 'Above', src: this.img, orient: 'vertical', dir: 'forward', oncommand: function(){this['descImages'].value='A checkbox above the label'}}),
    checkbox({label: 'Below', src: this.img, orient: 'vertical', dir: 'reverse', oncommand: function(){this['descImages'].value='A checkbox below the label'}}),
    separator({flex: 1}),     
    description({bind: 'descImages'}, '(no input yet)')))
  }
},  

exports.Checkboxes.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Checkboxes'),
    hbox(
    insert(this.renderButtonsTab),
    insert(this.renderButtonsAccess),
    insert(this.renderButtonsStates)),
    hbox(
    insert(this.renderButtonsOrientation),
    insert(this.renderButtonsImages)
    )
  )
  }
}

