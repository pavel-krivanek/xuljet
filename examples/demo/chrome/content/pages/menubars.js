var xuljet = require('lib/xuljet');

exports.Menubars = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.img = xuljet.imagesURI+'button.png';
}
xuljet.inherits(exports.Menubars, xuljet.Component);

exports.Menubars.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Toolbars, Menubars and Statusbars'),
    groupbox(
    toolbar(
      label({value: 'This is toolbar'}),
      toolbarseparator(),
      toolbarbutton({label: 'Button', accesskey: 'B'}),
      toolbarbutton({label: 'Check', type: 'checkbox'}),
      toolbarbutton({label: 'Disabled', disabled: true}),
      toolbarbutton({label: 'Image', image: this.img})),
    toolbar(
      label({value: 'This is toolbar'}),
      toolbarseparator(),
      menu({label: 'Radio', accesskey: 'R'},
      menupopup(
        menuitem({type: 'radio', name: 'radio', label: 'Radio 1'}),
        menuitem({type: 'radio', name: 'radio', label: 'Radio 2'}),
        menuitem({type: 'radio', name: 'radio', label: 'Radio 3'}))),
      menu({label: 'Checkbox', accesskey: 'C'},
      menupopup(
        menuitem({type: 'checkbox', label: 'Checkbox 1'}),
        menuitem({type: 'checkbox', label: 'Checkbox 2'}),
        menuitem({type: 'checkbox', label: 'Checkbox 3'}))),
      menu({label: 'Cascading', accesskey: 'a'},
      menupopup(
        menu({label: 'More'},
        menupopup(
          menuitem({label: 'A'}),
          menuitem({label: 'B'}),
          menuitem({label: 'C'}),
          menuseparator(),
          menu({label: 'More'},
          menupopup(
            menuitem({label: '1'}),
            menuitem({label: '2'}),
            menuitem({label: '3'}))))),
        menuseparator(),
        menuitem({label: 'X'}),
        menuitem({label: 'Y'}),
        menuitem({label: 'Z'}))),
      menu({label: 'Images', accesskey: 'I'},
      menupopup(
        menuitem({id: 'bookmark', label: 'Left', class: 'menuitem-iconic', image: this.img}),
        menuitem({label: 'Right', dir: 'reverse', class: 'menuitem-iconic', image: this.img}),
        menuitem({label: 'None'}))),
      spacer({flex: 1}),
      menu({label: 'Help', accesskey: 'H'},
      menupopup(
        menuitem({label: 'This is help'}))))),
    
    statusbar(
      statusbarpanel({label: 'This is a statusbarpanel'}),
      statusbarpanel({label: 'As is this'}),
      statusbarpanel({label: 'And also this', flex: 1}),
      statusbarpanel({label: 'Click Me!', onclick: function(){
      this.alert('Ouch')
    }}))
  )
  }
}
