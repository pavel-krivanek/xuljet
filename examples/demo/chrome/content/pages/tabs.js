var xuljet = require('lib/xuljet');

exports.Tabs = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
}
xuljet.inherits(exports.Tabs, xuljet.Component);


exports.Tabs.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Tabs'),
    groupbox(
    description('This is the standard tabbox'),
    groupbox(
      tabbox({flex: 1},
      tabs(
        tab({label: 'Default'}),
        tab({label: 'Tab'}),
        tab({label: 'Orientation'})),
      tabpanels({flex: 1},
        label({value: 'Default'}),
        label({value: 'Tab'}),
        label({value: 'Orientation'}))))),

    groupbox(
    description('This one has been turned on its head so that the tabs are on the bottom. I had to fiddle with the styles to make this look decent.'),
    groupbox(
      tabbox({flex: 1},
      tabpanels({flex: 1, style: 'border-bottom: 0px solid'},
        label({value: 'Default'}),
        label({value: 'on the'}),
        label({value: 'bottom'})),
      tabs({flex: 1, class: 'tabs-bottom'},
        tab({label: 'Default', class: 'tab-bottom'}),
        tab({label: 'on the', class: 'tab-bottom'}),
        tab({label: 'bottom', class: 'tab-bottom'}))))),
    
    groupbox(
    description('And here are a couple with the tabs on the side.  They work, but they\'ll need a bunch of style changes to make them look reasonable.'),
    groupbox(
      hbox(
      tabbox({flex: 1, orient: 'horizontal'},
        tabs({orient: 'vertical', class: 'tabs-left'},
        tab({label: 'Tabs', class: 'tabs-left'}),
        tab({label: 'on the', class: 'tabs-left'}),
        tab({label: 'left', class: 'tabs-left'})),
        tabpanels({flex: 1},
        label({value: 'Tabs'}),
        label({value: 'on the'}),
        label({value: 'left'}))),
      spacer({flex: 1}),
      tabbox({flex: 1, orient: 'horizontal', dir: 'reverse'},
        tabs({orient: 'vertical', class: 'tabs-right'},
        tab({label: 'Tabs'}),
        tab({label: 'on the'}),
        tab({label: 'right'})),
        tabpanels({flex: 1},
        label({value: 'Tabs'}),
        label({value: 'on the'}),
        label({value: 'right'})))
        )))
  )
  }
}


