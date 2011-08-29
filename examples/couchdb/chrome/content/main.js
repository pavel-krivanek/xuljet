var xuljet = require('lib/xuljet'),    couch = require('lib/couch'),    couchdbutils = require('lib/couchdbutils');    var str = xuljet.str;var lstr = xuljet.lstr;// in development mode recreate views everytimeconst DEVEL = true;var addresses = {};// data objectsaddresses.Address = function(){  this.company = '';  this.department = '';  this.name = '';  this.street = '';  this.city = '';  this.zip = '';  this.state = '';  this.note = '';  this.sendings = '';}addresses.Sending = function(){  this.date = '';  this.postage = 0;}// define CouchDB viewsaddresses.setupViews = function(database){  // viewLib is a set of auxiliary functions. The viewLib is converted  // to string and attached to the view definition.    var viewLib = {    minLength: 3,        safe: function(aString)    {      if (!aString) return '';      return aString;    },        trim: function(aString)    {      if (!aString) return '';      return aString.replace(/^\s*/, '').replace(/\s*$/, '');    },    commaSeparated: function(aCollection)    {      var l = aCollection.length;      var result = '';      if (l>0) result = result + aCollection[0].toString();      for (var i=1; i<l; i++)      {        var each = aCollection[i];        if (each && each.toString().length > 0)           result = result + ', ' + each.toString();      }      return result;    },          longName: function(doc)    {      return viewLib.commaSeparated([      viewLib.trim(doc.company),      viewLib.trim(doc.department),       viewLib.trim(doc.name)      ])      return result;    },         fullTextString: function(doc)    {      var txt = viewLib.safe(doc.company)         + viewLib.safe(doc.department)         + viewLib.safe(doc.name)         + viewLib.safe(doc.street)        + viewLib.safe(doc.city)          + viewLib.safe(doc.zip)         + viewLib.safe(doc.state)         + viewLib.safe(doc.note);      return txt.replace(/[\s!.,;/-]+/g,'').toLowerCase();    },    }  function src(aClosure)  {    return aClosure.toSource().replace('import(viewLib);', 'var viewLib = ' + viewLib.toSource() + ';')  }  var designDoc = database.open('_design/views')  if (designDoc)  database.deleteDoc(designDoc)  var designDoc = {    _id:'_design/views', // turn off couch.js id escaping?    language: 'javascript',    views: {      longName: {        // the reduce (count        map: src(function(doc) {          import(viewLib);          emit(viewLib.longName(doc), {longName: viewLib.longName(doc), id: doc._id})         }),        reduce: '_count'},      fullText: {        // this is very simple implementation          map: src(function(doc) {          import(viewLib);                  var txt = viewLib.fullTextString(doc);          for (var i = 0; i < txt.length-(viewLib.minLength-1); i++)          emit(txt.slice(i), {longName: viewLib.longName(doc), id: doc._id});        }),        reduce: '_count'      },      sendings: {map: src(function(doc) {          import(viewLib);        doc.sendings.forEach(function(each) {          emit(each.date, {id: doc._id, name: viewLib.longName(doc), postage: each.postage})})        })},      envelopes: {map: src(function(doc) {        doc.sendings.forEach(function(each) {          emit(doc._id, each)})        })},    }  };   database.save(designDoc)}addresses.dateString = function(date){  return date.getDate().toString() + '.' + (date.getMonth()+1).toString() + '.' + date.getFullYear().toString()}  addresses.Main = function(aWindow){  xuljet.Component.call(this, aWindow);   this.current = new addresses.Address();  this.currentDate = new Date().toLocaleDateString();  this.envelopes = addresses.db.view('views/sendings', {key: this.currentDate}).rows;  this.companyEnvelopes = [];    var dbInfo = {    database: addresses.db,    view: 'views/longName',  }  var columnsInfo = [{    name: str('address'),     label: function(doc) {return doc.value.longName},     value: function(doc) {return doc.value.id}  }]    this.treeView = new couchdbutils.CouchDBLazyList(aWindow, dbInfo, columnsInfo);  this.treeView.onselect = xuljet.bind(function() {      this.current =  addresses.db.open(this.treeView.selectedValue())      this.refreshCompany();    }, this);}xuljet.inherits(addresses.Main, xuljet.Component);addresses.Main.prototype.children = function(){  return [this.treeView]}addresses.Main.prototype.refreshEnvelopes = function(){  this.envelopes = addresses.db.view('views/sendings', {key: this.currentDate}).rows;  this.refreshSection(this.ID('envelopesSection'), this.renderEnvelopes);}addresses.Main.prototype.refreshCompanyEnvelopes = function(){  this.companyEnvelopes = this.current._id ? addresses.db.view('views/envelopes', {key: this.current._id}).rows : [];  this.refreshSection(this.ID('companyEnvelopesSection'), this.renderCompanyEnvelopes);}addresses.Main.prototype.refreshCompany = function(){  this.reloadForm(this.ID('form'));  this.refreshCompanyEnvelopes();  this.printButton.disabled = this.deleteButton.disabled = this.saveButton.disabled = (this.current._id == undefined);}addresses.Main.prototype.unbindCurrent = function (){  delete this.current._id;  delete this.current._rev;  delete this.current._deleted;}addresses.Main.prototype.renderEnvelopes = function(xul){    var menuId = xuljet.id();  with (xul)  {    popupset(      popup({id: this.ID('listOfEnvelopesContextMenu')},        menuitem({label: str('context.modify'), oncommand: function() {            //xuljet.selectedListItem(this.listOfEnvelopes)            alert('not implemented');          }}),        menuitem({label: str('context.remove'), oncommand: function() {             alert('not implemented');          }})));        list({      bind: 'listOfEnvelopes', flex: 1},       this.envelopes,       [{label: str('name'), property: 'value.name'}, {label: str('postage'), property: 'value.postage'}],       function(item) {inspect(item.value)},       this.ID('listOfEnvelopesContextMenu'))  }  }addresses.Main.prototype.renderCompanyEnvelopes = function(xul){   with (xul)  {    popupset(      popup({id: this.ID('comapnyEnvelopesContextMenu')},        menuitem({label: str('context.modify'), oncommand: function() {            alert('not implemented');          }}),        menuitem({label: str('context.remove'), oncommand: function() {            alert('not implemented');          }})));        list({      bind: 'listOfCompanyEnvelopes', flex: 1},       this.companyEnvelopes,       [{label: str('date'), property: 'value.date'}, {label: str('postage'), property: 'value.postage'}],       function(item) {inspect(item.value)},       this.ID('comapnyEnvelopesContextMenu'))  }}addresses.Main.prototype.refreshList = function() {  var val = this.searchTextBox.value;  val = val.replace(/[\s!.,;]+/g,'').toLowerCase();  if (val.length >= 3)  {    this.treeView.clearCache();    this.treeView.dbInfo.view = 'views/fullText';    this.treeView.dbInfo.options = {startkey: val, endkey: val+'\u9999'};    this.treeView.refresh();  } else {    this.treeView.clearCache();    this.treeView.dbInfo.view = 'views/longName';    this.treeView.dbInfo.options = {};    this.treeView.refresh();  }}addresses.Main.prototype.renderPostage = function(xul){  // register only one closure for all popup items  var setValue = this.$C(function(self) {this.postageTextBox.value = self.getAttribute('xuljet:value')});  with (xul)   {    hbox({align: 'stretch'},    textbox({bind: 'postageTextBox', type: 'number', decimalplaces: 2, value: 10, style: 'margin-right: 0px; width:6em'}),      caption({align: 'center', maxwidth: '10px', label: '▼',  style: 'margin-left: 0px; width:2em', onclick: function() {      this.postagePopup.openPopup(this.postageTextBox)    }})//  dropmarker({popup: this.ID('postagePopup')})  )  popupset(    menupopup({bind: 'postagePopup' , position: 'after_start' },      menuitem({label: str('postage.dontSave'), 'xuljet:value': 0.00, oncommand: setValue}),      menuseparator(),      menuitem({label: str('postage.inland10'), 'xuljet:value': 10.00, oncommand: setValue}),      menuitem({label: str('postage.inland14'), 'xuljet:value': 14.00, oncommand: setValue}),      menuitem({label: str('postage.inland26'), 'xuljet:value': 26.00, oncommand: setValue}),      menuitem({label: str('postage.inland34'), 'xuljet:value': 34.00, oncommand: setValue}),      menuseparator(),      menuitem({label: str('postage.outland20'), 'xuljet:value': 20.00, oncommand: setValue}),      menuitem({label: str('postage.outland26'), 'xuljet:value': 26.00, oncommand: setValue})))  } }addresses.Main.prototype.safeParagraph = function(aCanvas, value){  if (value && value.length > 0)    aCanvas.p(value)}addresses.Main.prototype.printEnvelop = function() {  this.processForm(this.ID('form'));    if (this.postageTextBox.value > 0)  {    this.current.sendings.push({postage: this.postageTextBox.value, date: addresses.dateString(new Date()) });    addresses.db.save(this.current);    this.refreshCompany();    this.refreshList();    this.refreshEnvelopes();  }     var html = new xuljet.HTMLCanvas();  with (html)  {    style('p {font-family: \'helvetica, impact, sans-serif\'; font-size: 12pt; margin: 0px}')    p(this.current.company)    p(this.current.department)    p(this.current.name)    p(this.current.street)    p(this.current.city)    p(this.current.zip)    p(this.current.state)  }  var modifySettings = function(printSettings)  {    printSettings.paperName = 'iso_dl';    printSettings.paperWidth = 110;    printSettings.paperHeight = 220;    printSettings.orientation = 1;    printSettings.headerStrCenter = '';    printSettings.headerStrLeft = '';    printSettings.headerStrRight = '';    printSettings.footerStrCenter = '';    printSettings.footerStrLeft = '';    printSettings.footerStrRight = '';    printSettings.orientation = 1;    printSettings.marginLeft = 4.6;    printSettings.marginTop = 2.1;    printSettings.marginRight = 0.3;    printSettings.marginBottom = 0.1;  }    this.print(html, modifySettings)       }addresses.Main.prototype.render = function(xul){  var hstyle = {align: 'center', flex: 1};  var labelstyle = {style: 'width:6em'};  with (xul)  {  vbox({flex: 1},    hbox({flex: 1},      vbox({flex: 1},      groupbox(        caption({label: str('address')}),        form({id: this.ID('form')},          hbox(hstyle,          label(labelstyle, lstr('company')),          textbox({flex: 1, link: [this, 'current.company']})),            hbox(hstyle,          label(labelstyle, lstr('departure')),          textbox({flex: 1, link: [this, 'current.department']})),            hbox(hstyle,           label(labelstyle, lstr('name')),          textbox({flex: 1, link: [this, 'current.name']})),            hbox(hstyle,          label(labelstyle, lstr('street')),          textbox({flex: 1, link: [this, 'current.street']})),            hbox(hstyle,          label(labelstyle, lstr('city')),          textbox({flex: 1, link: [this, 'current.city']})),            hbox(hstyle,          label(labelstyle, lstr('zip')),          textbox({flex: 1, link: [this, 'current.zip']})),            hbox(hstyle,          label(labelstyle, lstr('state')),          textbox({flex: 1, link: [this, 'current.state']})),            hbox(hstyle,          label(labelstyle, lstr('note')),          textbox({flex: 1, link: [this, 'current.note']})))),    hbox(      button({bind: 'saveButton', disabled: (this.current._id == undefined), flex: 1, label: str('save'), oncommand: function() {        this.processForm(this.ID('form'));        addresses.db.save(this.current);        this.refreshCompany();        this.refreshList();      }}),      button({flex: 1, label: str('saveAsNew'), oncommand: function() {        this.processForm(this.ID('form'));        this.unbindCurrent();        this.current.sendings = [];        addresses.db.save(this.current);        this.refreshCompany();        this.refreshList();      }}),      button({bind: 'deleteButton', disabled: (this.current._id == undefined), flex: 1, label: str('remove'), oncommand: function() {        addresses.db.deleteDoc(this.current);        this.current.sendings = [];        this.unbindCurrent();        this.refreshCompany();        this.refreshList();      }}),          spacer({flex: 1}),      insert(this.renderPostage),        button({bind: 'printButton', disabled: (this.current._id == undefined), flex: 1, label: str('print'), oncommand: this.printEnvelop})     ),    tabbox({flex: 1},    tabs(tab({label: str('forDate')}), tab({label: str('forAddress')})),     tabpanels({flex: 1},      tabpanel({flex:1, orient: 'vertical'},       hbox({align: 'center', pack: 'end'},        label({pack: 'middle'}, lstr('date')),         datepicker({type: 'popup', firstdayofweek: xuljet.firstDayOfWeek(), onchange: function(datepicker) {        this.currentDate = addresses.dateString(datepicker.dateValue);        this.refreshEnvelopes();        }})),        section({id: this.ID('envelopesSection')},             insert(this.renderEnvelopes))),      tabpanel({flex:1},         section({id: this.ID('companyEnvelopesSection')},             insert(this.renderCompanyEnvelopes)))    ))),    vbox({flex: 1},        groupbox({flex: 1},        caption({label: str('availableAddresses')}),      hbox(      textbox({bind: 'searchTextBox', type: 'search',  emptytext: str('searchText'), searchbutton: true, flex: 1, oncommand: this.refreshList})      ),          this.treeView.rendered() ))),  statusbar(          statusbarpanel({bind: 'status', flex: 1, label: str('statusbar.ready')}))    )  }}function main(){  window.setTitle(str('applicationTitle'));  var loginComponent = new couchdbutils.CouchDBLogin(window, addresses.setupViews);  loginComponent.onSuccess = function(loginInfo) {    addresses.db = new couch.db(loginInfo.database);    if (DEVEL)       addresses.setupViews(addresses.db)    var mainComponent = new addresses.Main(window);        mainComponent.replace(loginComponent);  }  loginComponent.beMainWindowComponent();}