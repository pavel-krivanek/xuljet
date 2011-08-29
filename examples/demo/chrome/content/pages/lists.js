var xuljet = require('lib/xuljet');

exports.Lists = function(aWindow)
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
  ]
}
xuljet.inherits(exports.Lists, xuljet.Component);

exports.Lists.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Lists'),
    groupbox(
    caption({label: 'states'}),
    listbox({rows: 5}, 
      listitem({label: 'Normal'}),
      listitem({label: 'Selected', selected: true}),
      listitem({label: 'Disabled', disabled: true}),
      listitem({label: 'Normal', type: 'checkbox' }),
      listitem({label: 'Normal', type: 'checkbox', checked: true }))),
    groupbox(
    caption({label: 'states'}),
    listbox({rows: 5}, 
      listitem({label: 'Pearl'}),      
      listitem({label: 'Aramis'}),      
      listitem({label: 'Yakima'}),      
      listitem({label: 'Tribble'}),      
      listitem({label: 'Cosmo'}))),
    groupbox({flex: 1}, 
    caption({label:'with multiple selection'}),
    listbox({bind: 'list', rows: 5, seltype: 'multiple', flex: 1},
      listitem({label: 'Pearl'}),      
      listitem({label: 'Aramis'}),      
      listitem({label: 'Yakima'}),      
      listitem({label: 'Tribble'}),      
      listitem({label: 'Cosmo'})),
    hbox({align: 'center'},
      button({label: 'Select All', oncommand: function(){
      this['list'].selectAll()}}),
      button({label: 'Clear All', oncommand: function(){
      this['list'].selectItem(-1)}}))),
      
    groupbox({flex: 1}, 
    caption({label: 'with multiple columns and a scrollbar'}),
    listbox({rows: 5},
      listcols(
      listcol({flex: 1}),
      splitter({class: 'tree-splitter'}),
      listcol({flex: 1}),
      splitter({class: 'tree-splitter'}),
      listcol({flex: 1}),
      splitter({class: 'tree-splitter'}),
      listcol({flex: 1})),
      collect(this.data, function(_xul, item, index) {
      if (index == 0)
      {
        _xul.listhead(
        listheader({label: item.name}), 
        listheader({label: item.sex}), 
        listheader({label: item.color}), 
        listheader({label: item.desc}))
        } else {
        _xul.listitem(
        label({value: item.name}), 
        label({value: item.sex}), 
        label({value: item.color}), 
        label({value: item.desc}))
      }}))))        
  }
}


