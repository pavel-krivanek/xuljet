var xuljet = require('lib/xuljet');

exports.Cropping = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.text = 'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
}
xuljet.inherits(exports.Cropping, xuljet.Component);

exports.Cropping.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({style: 'overflow: auto; width: 40em'}, 
    xul.HTML().h1('Cropping'),
    groupbox(
    caption({label: 'start'}),
    label ({style: 'width: 40em', crop: 'start', value: this.text})
    ),
    groupbox(
    caption({label: 'center'}),
    label ({style: 'width: 40em', crop: 'center', value: this.text})
    ),
    groupbox(
    caption({label: 'end'}),
    label ({style: 'width: 40em', crop: 'end', value: this.text})
    )
  )
  }
}



  