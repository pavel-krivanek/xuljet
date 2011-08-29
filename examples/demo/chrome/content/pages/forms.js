var xuljet = require('lib/xuljet');

exports.Forms = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  
  this.collection = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
  this.types = ['type 1', 'type 2', 'type 3'];
  this.genders = ['male', 'female'];
  this.data = {
	name: 'some name',
	surname: '',
	number1: 1, 
	number2: 12, 
	scale: 42, 
	password: '',
	rememberMe: true,
	color: '#FF0000',
	date: new Date(),
	items: [this.collection[2], this.collection[3]], 
	type: this.types[1], 
	gender: [this.genders[1]],
  }
}
xuljet.inherits(exports.Forms, xuljet.Component);

exports.Forms.prototype.renderResults = function(xul)
{
  with (xul)
  {    
	listbox({flex: 1},
	  listhead(
	  listheader({label: 'property'}),
	  listheader({label: 'value'})),
	  listcols(
	  listcol(),
	  listcol({flex: 1})),
	  listitem(
	  listcell({label: 'name'}),
	  listcell({label:  this.data.name})),
	  listitem(
	  listcell({label: 'surname'}),
	  listcell({label:  this.data.surname})),
	  listitem(
	  listcell({label: 'number 1'}),
	  listcell({label:  this.data.number1})),
	  listitem(
	  listcell({label: 'number 2'}),
	  listcell({label:  this.data.number2})),
	  listitem(
	  listcell({label: 'scale'}),
	  listcell({label:  this.data.scale})),
	  listitem(
	  listcell({label: 'password'}),
	  listcell({label:  this.data.password})),
	  listitem(
	  listcell({label: 'remember me'}),
	  listcell({label:  this.data.rememberMe})),
	  listitem(
	  listcell({label: 'color'}),
	  listcell({label:  this.data.color})),
	  listitem(
	  listcell({label: 'date'}),
	  listcell({label:  this.data.date.toLocaleDateString()})),
	  listitem(
	  listcell({label: 'items'}),
	  listcell({label:  this.data.items})),
	  listitem(
	  listcell({label: 'type'}),
	  listcell({label:  this.data.type})),
	  listitem(
	  listcell({label: 'gender'}),
	  listcell({label:  this.data.gender}))
	)
  }
}
  
exports.Forms.prototype.render = function(xul)
{
  with (xul)
  {
  vbox({flex: 1, style: 'overflow: auto'}, 
    xul.HTML().h1('Forms'),
    hbox({flex: 1},
    vbox( 
      groupbox(
      form({id: this.ID("form")}, 
        
        hbox({align: 'center'},
        label({style: 'width:10em'}, 'name:'),
        textbox({link: [this.data, 'name']})), 

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'surname:'),
        textbox({link: [this.data, 'surname'], emptytext: 'empty'})),
          
        hbox({align: 'center'},
        label({style: 'width:10em'}, 'number 1:'),
        textbox({link: [this.data, 'number1'], type: 'number'})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'number 2:'),
        textbox({link: [this.data, 'number2'], type: 'number', hidespinbuttons: true, min: 10, max: 20})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'scale:'),
        scale({link: [this.data, 'scale'], min: 1, max: 100})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'password:'),
        textbox({link: [this.data, 'password'], type: 'password'})),
        
        hbox({align: 'center'},
        label({style: 'width:10em'}, ''),
        checkbox({link: [this.data, 'rememberMe'], label: 'remember me'})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'color'),
        colorpicker({link: [this.data, 'color'], type: 'button'})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'date'),
        datepicker({link: [this.data, 'date'], type: 'popup', firstdayofweek: xuljet.firstDayOfWeek()})),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'items'),
        formlistbox({seltype: 'multiple', rows: 6}, this.collection, this.data, 'items')),
          
        hbox({align: 'center'},
        label({style: 'width:10em'}, 'type'),
        formmenulist({}, this.types, this.data, 'type')),

        hbox({align: 'center'},
        label({style: 'width:10em'}, 'gender'),
        formradiogroup({}, this.genders, this.data, 'gender')),
        
        hbox({pack: 'center'}, 
        button({label: 'Submit', style: 'width:10em', oncommand: function(){
          this.processForm(this.ID("form"));
          this.refreshSection(this.ID("result"), this.renderResults)
        }}))
      )
      )),
      section({id: this.ID("result")},
      insert(this.renderResults)
      )
    ))
  }
}



