var xuljet = require('lib/xuljet');

exports.Radiobuttons = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.img = xuljet.imagesURI+'folder_yellow_open.png';
}
xuljet.inherits(exports.Radiobuttons, xuljet.Component);

exports.Radiobuttons.prototype.renderButtonsStates = function(xul)
{    
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'These buttons have different button states'}),
    radiogroup({flex: 1},
    radio({flex: 1, label: 'Default', default: true, oncommand: function(){this['descStates'].value='Default'}}),
    radio({flex: 1, label: 'Checked', checked: true, oncommand: function(){this['descStates'].value='Checked'}}),
    radio({flex: 1, label: 'Normal', oncommand: function(){this['descStates'].value='Normal'}}),
    radio({flex: 1, label: 'Disabled', disabled: true, oncommand: function(){this['descStates'].value='Disabled'}}),
    separator({flex: 1}),     
    description({bind: 'descStates'}, '(no input yet)')))
  }
}

exports.Radiobuttons.prototype.renderButtonsAccess = function(xul)
{
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'access keys'}),
    radiogroup({flex: 1},
    radio({flex: 1, label: 'Animal', accesskey: 'A', oncommand: function(){this['descAccess'].value='Animal'}}),
    radio({flex: 1, label: 'Bear', accesskey: 'B', oncommand: function(){this['descAccess'].value='Bear'}}),
    radio({flex: 1, label: 'Cat', accesskey: 'C', oncommand: function(){this['descAccess'].value='Cat'}}),
    radio({flex: 1, label: 'Dog', accesskey: 'D', oncommand: function(){this['descAccess'].value='Dog'}}),
    radio({flex: 1, label: 'Deer', accesskey: 'E', oncommand: function(){this['descAccess'].value='Deer'}}),
    radio({flex: 1, label: 'Fish', accesskey: 'F', oncommand: function(){this['descAccess'].value='Fish'}}),
    separator({flex: 1}),     
    description({bind: 'descAccess'}, '(no input yet)')))
  }
}
  
exports.Radiobuttons.prototype.renderButtonsOrientation = function(xul)
{  
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'orientation'}),
    radiogroup({flex: 1},
    radio({label: 'Left', oncommand: function(){this['descOrientation'].value='A checkbox to the left of the label'}}),
    radio({label: 'Right', dir: 'reverse', oncommand: function(){this['descOrientation'].value='A checkbox to the left of the label'}}),
    radio({label: 'Above', orient: 'vertical', dir: 'forward', oncommand: function(){this['descOrientation'].value='A checkbox above the label'}}),
    radio({label: 'Below', orient: 'vertical', dir: 'reverse', oncommand: function(){this['descOrientation'].value='A checkbox below the label'}}),
    separator({flex: 1}),     
    description({bind: 'descOrientation'}, '(no input yet)')))
  }
}

exports.Radiobuttons.prototype.renderButtonsImages = function(xul)
{    
  with (xul)
  {
  groupbox({flex: 1},
    caption({label: 'images'}),
    radiogroup({flex: 1},
    radio({label: 'Left', src: this.img, oncommand: function(){this['descImages'].value='A checkbox to the left of the label'}}),
    radio({label: 'Right', src: this.img, dir: 'reverse', oncommand: function(){this['descImages'].value='A checkbox to the left of the label'}}),
    radio({label: 'Above', src: this.img, orient: 'vertical', dir: 'forward', oncommand: function(){this['descImages'].value='A checkbox above the label'}}),
    radio({labColorpickersel: 'Below', src: this.img, orient: 'vertical', dir: 'reverse', oncommand: function(){this['descImages'].value='A checkbox below the label'}}),
    radio({src: this.img, orient: 'vertical', dir: 'reverse', oncommand: function(){this['descImages'].value='A radiobutton with no label'}}),
    radio({src: this.img, orient: 'vertical', dir: 'reverse', oncommand: function(){this['descImages'].value='Another radiobutton with no label'}}),
    separator({flex: 1}),     
    description({bind: 'descImages'}, '(no input yet)')))
  }
}

exports.Radiobuttons.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Radiobuttons'),
    hbox(
    insert(this.renderButtonsStates),
    insert(this.renderButtonsAccess)),
    hbox(
    insert(this.renderButtonsOrientation),
    insert(this.renderButtonsImages)
    )
  )
  }
}

