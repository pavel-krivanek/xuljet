var xuljet = require('lib/xuljet')

exports.Buttons = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  
  this.img = xuljet.imagesURI+'folder_yellow_open.png';
}
xuljet.inherits(exports.Buttons, xuljet.Component);

exports.Buttons.prototype.renderButtonsTab = function(xul)
{
  // this example shows how to use sections do modify a window content
  
  var setSection = xuljet.bind(function(aString) {
    this.refreshSection(this.ID("input"), function(xul) {xul.description(aString)})}, this);
  
  with (xul)
  {
  groupbox(
    caption({label: 'These buttons tab oddly'}),
    hbox(
    button({flex: 1, label: 6, tabindex: 6, oncommand: function(){setSection('6')}}),
    button({flex: 1, label: 5, tabindex: 5, oncommand: function(){setSection('5')}}),
    button({flex: 1, label: 4, tabindex: 4, oncommand: function(){setSection('4')}}),
    button({flex: 1, label: 3, tabindex: 3, oncommand: function(){setSection('3')}}),
    button({flex: 1, label: 2, tabindex: 2, oncommand: function(){setSection('2')}}),
    button({flex: 1, label: 1, tabindex: 1, oncommand: function(){setSection('1')}})),
    hbox({pack: 'center'},
    section({id: this.ID("input")}, 
      description('(no input yet)'))))
  }
}

exports.Buttons.prototype.renderButtonsAccess = function(xul)
{
  // similar example but without sections
   
  with (xul)
  {
  groupbox(
    caption({label: 'These buttons have access keys'}),
    hbox(
    button({flex: 1, label: 'Animal', accesskey: 'A', oncommand: function(){this['currentAnimal'].value='Animal'}}),
    button({flex: 1, label: 'Bear', accesskey: 'B', oncommand: function(){this['currentAnimal'].value='Bear'}}),
    button({flex: 1, label: 'Cat', accesskey: 'C', oncommand: function(){this['currentAnimal'].value='Cat'}}),
    button({flex: 1, label: 'Dog', accesskey: 'D', oncommand: function(){this['currentAnimal'].value='Dog'}}),
    button({flex: 1, label: 'Deer', accesskey: 'E', oncommand: function(){this['currentAnimal'].value='Deer'}}),
    button({flex: 1, label: 'Fish', accesskey: 'F', oncommand: function(){this['currentAnimal'].value='Fish'}}) ),
    hbox({pack: 'center'},
    description({bind: 'currentAnimal'}, '(no input yet)')))
  }
}
    
exports.Buttons.prototype.renderButtonsStates = function(xul)
{    
  with (xul)
  {
  groupbox(
    caption({label: 'These buttons have different button states'}),
    hbox(
    button({flex: 1, label: 'Default', default: true, oncommand: function(){this['currentState'].value='Default'}}),
    button({flex: 1, label: 'Checked', checked: true, oncommand: function(){this['currentState'].value='Checked'}}),
    button({flex: 1, label: 'Normal', oncommand: function(){this['currentState'].value='Normal'}}),
    button({flex: 1, label: 'Disabled', disabled: true, oncommand: function(){this['currentState'].value='Disabled'}}) ),
    hbox({pack: 'center'},
    description({bind: 'currentState'}, '(no input yet)')))
  }
}

exports.Buttons.prototype.renderMenuButtons = function(xul)
{  
  with (xul)
  {
  groupbox(
    caption({label: 'These are menubuttons'}),
    hbox(
    button({flex: 1, label: 'Menu', type: 'menu'},
      menupopup(
      menuitem({label: 'Option 1', oncommand: function(){this['currentOption'].value='Option 1'}}),
      menuitem({label: 'Option 2', oncommand: function(){this['currentOption'].value='Option 2'}}),
      menuitem({label: 'Option 3', oncommand: function(){this['currentOption'].value='Option 3'}}),
      menuitem({label: 'Option 4', oncommand: function(){this['currentOption'].value='Option 4'}}))),
    toolbarbutton({flex: 1, label: 'MenuButton', type: 'menu-button'},
      menupopup(
      menuitem({label: 'Option A', oncommand: function(){this['currentOption'].value='Option A'}}),
      menuitem({label: 'Option B', oncommand: function(){this['currentOption'].value='Option B'}}),
      menuitem({label: 'Option C', oncommand: function(){this['currentOption'].value='Option C'}}),
      menuitem({label: 'Option D', oncommand: function(){this['currentOption'].value='Option D'}})))),
    hbox({pack: 'center'},
    description({bind: 'currentOption'}, '(no input yet)')))
  }
}

exports.Buttons.prototype.renderButtonsLabeling = function(xul)
{  
  with (xul)
  {
  groupbox(
    caption({label: 'These buttons show different labeling'}),
    hbox({pack: 'center'}, 
    vbox(
      button({flex: 1, label: 'No image', 
      oncommand: function(){this['labeling'].value='A button with a label only'}}),
      button({flex: 1, label: 'Left', image: this.img, 
      oncommand: function(){this['labeling'].value='A button with both an image and a label'}}),
      button({flex: 1, label: 'Right', image: this.img, dir: 'reverse',
      oncommand: function(){this['labeling'].value='A button with the image to the right of the label'}})
    ),
    vbox(
      button({label: 'Above', image: this.img, orient: 'vertical', dir: 'forward',
      oncommand: function(){this['labeling'].value='A button with the image above the label'}}),
      button({label: 'Below', image: this.img, orient: 'vertical', dir: 'reverse', 
      oncommand: function(){this['labeling'].value='A button with the image below the label'}})
    ),
    vbox(
      button({flex: 1,
      oncommand: function(){this['labeling'].value='A button with neither image nor label'}}),
      button({image: this.img,
      oncommand: function(){this['labeling'].value='A button with an image only'}}),
      button({ oncommand: function(){this['labeling'].value='A button with a multi-line, wrapped label'}},
      label({width: 50}, 'Wrapped Label'))
    )),
    hbox({pack: 'center'},
    description({bind: 'labeling'}, '(no input yet)')))
  }
}
  
exports.Buttons.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Buttons'),
    insert(this.renderButtonsTab),
    insert(this.renderButtonsAccess),
    hbox(
    insert(this.renderButtonsStates),
    insert(this.renderMenuButtons)
    ),
    insert(this.renderButtonsLabeling)
  )
  }
}

