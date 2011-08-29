var xuljet = require('lib/xuljet');

exports.Images = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
}
xuljet.inherits(exports.Images, xuljet.Component);
  
exports.Images.prototype.renderSvg = function(xul)
{
  var onOver = function(){this['description'].value = 'mouse is over'};
  var onOut = function(){this['description'].value = 'mouse is out'};

  with (xul.SVG())
  {
    svg({width: '120px', height: '120px', version: "1.1"}, 
      circle({r: 50, cx: 60, cy: 60, style: 'stroke: red; fill: none; stroke-width: 20',
      onmouseover: onOver, onmouseout: onOut }),
      line({x1: 33, y1: 93, x2: 93, y2: 23, style: 'stroke: red; stroke-width: 20',
      onmouseover: onOver, onmouseout: onOut }))
  }
  xul.description({bind: 'description'}, 'Try to move cursor inside')
},

exports.Images.prototype.renderHtml = function(xul)
{
  with (xul.HTML())
  {
  div({style: 'text-align: center; color: red; border: 1px solid red'}, 
    h1('XULJet'))
  }
},

exports.Images.prototype.render = function(xul)
{
  var img = xuljet.imagesURI+'xuljet.png';

  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Images'),
    groupbox(
    caption({label: 'image'}),
    hbox({pack: 'center', align: 'center'}, 
      image({src: img}),
      image({src: img, style: 'width: 63px; height: 44px'}))),
    groupbox({align: 'center'},
    caption({label: 'embedded svg'}),
    insert(this.renderSvg)),
    groupbox(
    caption({label: 'embedded html'}),
    insert(this.renderHtml))
  )
  }
}



