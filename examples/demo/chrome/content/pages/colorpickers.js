var xuljet = require('lib/xuljet');

exports.Colorpickers = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
}
xuljet.inherits(exports.Colorpickers, xuljet.Component);

exports.Colorpickers.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Colorpickers'),
    hbox(
    groupbox(
      label('default colorpicker'),
      colorpicker({onselect: function(colorPicker){
      this['desc1'].value = colorPicker.color
      }}),
      description({bind: 'desc1'}, '(no input yet)')),
    groupbox(
      label('button type'),
      colorpicker({
      type: 'button',
      paletteName: 'standard',
      onselect: function(colorPicker){
        this['desc2'].value = colorPicker.color
      }}),
      description({bind: 'desc2'}, '(no input yet)'))
    )
  )  
  }
}



