var xuljet = require('lib/xuljet');

exports.Grids = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.data = [
  {name: 'Name', sex: 'Sex', color: 'Color', desc: 'Description'},
  {name: 'Pearl', sex: 'Female', color: 'Gray', desc: 'Frumpy'},
  {name: 'Aramis', sex: 'Male', color: 'Black', desc: 'Cute'},
  {name: 'Yakima', sex: 'Male', color: 'Holstein', desc: 'Handsome'},
  {name: 'Cosmo', sex: 'Female', color: 'White', desc: 'Round'},
  {name: 'Fergus', sex: 'Male', color: 'Black', desc: 'Long'},
  {name: 'Clint', sex: 'Male', color: 'Black', desc: 'Young'},
  {name: 'Tribble', sex: 'Female', color: 'Orange', desc: 'Frumpy'},
  {name: 'Zippy', sex: 'Male', color: 'Orange', desc: 'Playful'}
  ]}
xuljet.inherits(exports.Grids, xuljet.Component);

  
exports.Grids.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Grids'),
    groupbox(
    caption({label: 'data in the rows'}),
        
    grid(
      columns(
      column({flex: 1}),
      column({flex: 1}),
      column({flex: 1}),
      column({flex: 1})),
      rows(
      collect(this.data, function(_xul, item, index) {
        if (index == 0)
        {
        _xul.row(
          button({label: item.name}), 
          button({label: item.sex}), 
          button({label: item.color}), 
          button({label: item.desc}))
        } else {
        _xul.row(
          label({value: item.name}), 
          label({value: item.sex}), 
          label({value: item.color}), 
          label({value: item.desc}))
        }})))),

    groupbox(
    caption({label: 'data in the columns'}),
    grid(
      rows(
      row(),
      row(),
      row(),
      row()),
      columns(
      collect(this.data, function(_xul, item, index) {
        if (index == 0)
        {
        _xul.column({flex: 1},
          button({label: item.name}), 
          button({label: item.sex}), 
          button({label: item.color}), 
          button({label: item.desc}))
        } else {
        _xul.column({flex: 1},
          label({value: item.name}), 
          label({value: item.sex}), 
          label({value: item.color}), 
          label({value: item.desc}))
        }}))))
  )
  }
}

