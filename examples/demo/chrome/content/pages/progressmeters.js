var xuljet = require('lib/xuljet');

exports.Progressmeters = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.img = xuljet.imagesURI+'button.png';
}
xuljet.inherits(exports.Progressmeters, xuljet.Component);

exports.Progressmeters.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Progressmeters'),
    hbox(
    groupbox(
      caption({label: 'determined'}),
      progressmeter({bind: 'progressmeter', mode: 'determined', value: 0}),
      button({label: 'Hit me to advance', oncommand: function(){
      var progressmeter = this['progressmeter'];
      var progress = parseInt(progressmeter.value) + 10;
      progressmeter.value = progress }})),
    groupbox(
      caption({label: 'undetermined'}),
      progressmeter({mode: 'undetermined'}))))
  }
}


