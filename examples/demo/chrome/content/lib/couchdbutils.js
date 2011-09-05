var couch = require('./couch');

function Map()
{
  // members
  this.keyArray = new Array(); // Keys
  this.valArray = new Array(); // Values
}

Map.prototype.put = function(key, val)
{
  var elementIndex = this.indexOf( key );

  if( elementIndex == (-1) ) {
    this.keyArray.push( key );
    this.valArray.push( val );
  } else 
    this.valArray[ elementIndex ] = val;
}

Map.prototype.get = function (key)
{
  var result = null;
  var elementIndex = this.indexOf( key );

  if( elementIndex != (-1) )
   result = this.valArray[ elementIndex ];

  return result;
}

Map.prototype.indexOf = function(key)
{
    var result = (-1);
    for( var i = 0; i < this.keyArray.length; i++ ) {
        if( this.keyArray[ i ] == key )
        {
            result = i;
            break;
        }
    }
    return result;
}

exports.CouchDBAdministration = function(aWindow)
{
  xuljet.Component.call(this, aWindow);
  this.localesPackageName = 'couchdbutils';
  
  this.originalComponent = undefined;
  this.loginInfo = undefined;
}
xuljet.inherits(exports.CouchDBAdministration, xuljet.Component);

exports.CouchDBAdministration.prototype.render = function(xul)
{
  if (this.loginInfo)
  {
    with (xul)
    {
      vbox({flex: 1},
        toolbox(toolbar({align: 'center'},
          button({label: this.str('CouchDBAdministration.back'), oncommand: function() {
            if (this.originalComponent)
              this.originalComponent.replace(this)
          }}), 
          toolbarseparator(),
          label(this.lstr('CouchDBAdministration.database')+' '+this.loginInfo.database), 
          label({class: 'text-link', value: this.str('CouchDBAdministration.create'), onclick: function() {
            if (this.loginInfo.database)
            {
              (new couch.db(this.loginInfo.database)).createDb();
              this.browser.src = this.loginInfo.server + '/_utils/';
              this.browser.reload();
            }
          }}), 
          label({class: 'text-link', value: this.str('CouchDBAdministration.initialize'), onclick: function() {
            if (this.loginInfo.database)
            {
              this.loginInfo.setupViews(new couch.db(this.loginInfo.database));
              this.browser.src = this.loginInfo.server + '/_utils/';
              this.browser.reload();
            }
          }})        
        )), 
        browser({bind: 'browser', flex: 1, type: 'content-primary', src: this.loginInfo.server + '/_utils/'})
      )
    }
  }
}


exports.CouchDBLogin = function(aWindow, setupViews)
{
  xuljet.Component.call(this, aWindow);
  this.localesPackageName = 'couchdbutils';
  
  this.onSuccess = undefined;  
  this.loginInfo = {
    server: xuljet.config.get('CouchDBLogin.server', 'http://localhost:5984'), 
    database: xuljet.config.get('CouchDBLogin.database', ''),
    user: xuljet.config.get('CouchDBLogin.user', ''),
    password: '',
    setupViews: setupViews
  }
  this.availableDatabases = [];
  this.tryLogin(function() {
      this.availableDatabases = couch.db.allDbs();
    }, false);
  
}
xuljet.inherits(exports.CouchDBLogin, xuljet.Component);

exports.CouchDBLogin.prototype.renderDatabasesList = function(xul)
{
  xul.formmenulist({flex: 1, editable: true, returncommand: this.ID('login'), tooltiptext: this.str('CouchDBLogin.dbListTooltip')}, this.availableDatabases, this, 'loginInfo.database');
}


exports.CouchDBLogin.prototype.render = function(xul)
{
  var hstyle = {align: 'center', flex: 1};
  var labelstyle = {style: 'width:6em'};
 
  with (xul)
  {
    commandset(
      command({id: this.ID('login'), oncommand: function() {
        this.processForm(this.ID('form'));
        this.saveUsedValues();
        this.login()
      }}),
      command({id: this.ID('changeServer'), oncommand: function() {
        this.processForm(this.ID('form'));
        this.tryLogin(function() {
            this.availableDatabases = couch.db.allDbs();
          }, false);
        this.refreshSection('dbListSection', this.renderDatabasesList)
      }})
      
    ),
    
    
    hbox({pack: 'center', align: 'center', flex: 1},
      insertSVGFile(xuljet.imagesURI + 'couchdb-logo.svg'),
      vbox({style: 'margin-left: 20px'}, 
        form({id: this.ID('form')},
          hbox(hstyle, 
            label(labelstyle, this.lstr('CouchDBLogin.server')),
            textbox({flex: 1, link: [this, 'loginInfo.server'], returncommand: this.ID('changeServer')})),  
          hbox(hstyle, 
            label(labelstyle, this.lstr('CouchDBLogin.database')),
            section({id: 'dbListSection'}, insert(this.renderDatabasesList))),  
          hbox(hstyle, 
            label(labelstyle, this.lstr('CouchDBLogin.user')),
            textbox({flex: 1, link: [this, 'loginInfo.user'], returncommand: this.ID('login')})),  
          hbox(hstyle, 
            label(labelstyle, this.lstr('CouchDBLogin.password')),
            textbox({type: 'password', flex: 1, link: [this, 'loginInfo.password'], returncommand: this.ID('login')})), 
          hbox({pack: 'center', style: 'margin-top: 10px'}, 
            button({label: this.str('CouchDBLogin.login'), command: this.ID('login')}),
            button({label: this.str('CouchDBLogin.administer'), oncommand: function() {
              this.processForm(this.ID('form'));  
              this.saveUsedValues();
              this.administer()
            }})) 
    )))}  
}

exports.CouchDBLogin.prototype.saveUsedValues = function()
{
  xuljet.config.set('CouchDBLogin.server', this.loginInfo.server), 
  xuljet.config.set('CouchDBLogin.database', this.loginInfo.database),
  xuljet.config.set('CouchDBLogin.user', this.loginInfo.user),
  xuljet.config.save();  
}

exports.CouchDBLogin.prototype.tryLogin = function(success, useAlert)
{
  try {
    couch.db.urlPrefix = this.loginInfo.server;

    var result;
    if (this.loginInfo.user == '')
      result = {ok: true}
    else
      result = couch.db.login(this.loginInfo.user, this.loginInfo.password);
 
    if (result.ok)
    {
      result = couch.db.allDbs();
      if (result)
      {
        if (success)
          success.call(this);
        return true;
      } return false;
    }
    
    if (!useAlert)
      return false;

    if (result.error)
      alert(result.error)
    else
      alert('unknown error')

    return false
  } catch (e) {
    this.alert(e)
  }
  return false
}

exports.CouchDBLogin.prototype.login = function()
{
  this.tryLogin(function() {
      if (this.onSuccess)
          this.onSuccess.call(this, this.loginInfo);
    }, true)
}
  
exports.CouchDBLogin.prototype.administer = function()
{
  this.tryLogin(function() {
      var administration = new exports.CouchDBAdministration(window);    
      administration.loginInfo = this.loginInfo;
      administration.originalComponent = this;
      administration.replace(this);
      return
    }, true)
}  

exports.CouchDBLazyList = function(aWindow, aDbInfo, aColumnsInfo)
{
  xuljet.Component.call(this, aWindow);

  this.dbInfo = aDbInfo;
  this.columnsInfo = aColumnsInfo;
  this.columns = [];
  
  this.onselect = '';
  
  this.refresh();
};   
xuljet.inherits(exports.CouchDBLazyList, xuljet.Component);

exports.CouchDBLazyList.prototype.refresh = function(index)
{
  if (this.treebox)
  {
    this.treebox.rowCountChanged(this.view.rowCount, -this.view.rowCount);
  }
  
  this.pageSize = 200;
  this.cache = new Map();
  
  var opts = {reduce: true};
  if (this.dbInfo.options)
    xuljet.extend(opts, this.dbInfo.options)
  
  self = this;
  
  var res = this.dbInfo.database.view(this.dbInfo.view, opts);
  var rowCount = res.rows == 0 ? 0 : res.rows[0].value;
  
  this.view = {
    rowCount: rowCount,
    getCellText: function(row,column){ return self.request(row, column) },  
    getCellValue: function(row,column){ return self.requestValue(row) },  
    setTree: function(aTreeBox){ self.treebox = aTreeBox; },  
    isContainer: function(row){ return false; },  
    isSeparator: function(row){ return false; },  
    isSorted: function(){ return false; },  
    getLevel: function(row){ return 0; },  
    getImageSrc: function(row,col){ return null; },  
    getRowProperties: function(row,props){},  
    getCellProperties: function(row,col,props){},  
    getColumnProperties: function(colid,col,props){}  
  }
  
  if (this.treebox)
  {
    this.treebox.rowCountChanged(0, this.view.rowCount);
  }
}

exports.CouchDBLazyList.prototype.query = function(startIndex)
{
  var opts = {reduce: false, limit: this.pageSize, skip: startIndex};
  if (this.dbInfo.options)
    xuljet.extend(opts, this.dbInfo.options)
  
  return this.dbInfo.database.view(this.dbInfo.view, opts);
}

exports.CouchDBLazyList.prototype.requestDoc = function(index)
{
  var doc = this.cache.get(index)
  if (doc) return doc;
  
  var startIndex = (Math.floor(index / this.pageSize)*this.pageSize);
  var rows = this.query(startIndex).rows;
  for (var i=0; i<rows.length; i++)
    this.cache.put(startIndex + i, rows[i]);
  
  return this.cache.get(index)
}

exports.CouchDBLazyList.prototype.detect = function(collection, iterator)
{
  var len = collection.length;
  for (var i = 0; i < len; i++)
  {
    if (iterator(collection[i]))
      return collection[i];
  }
  return undefined;
}

exports.CouchDBLazyList.prototype.columnInfo = function(column)
{
  var id = column.element.getAttribute('id');
  return this.detect(this.columns, function(each) { return each.id == id });
}

exports.CouchDBLazyList.prototype.request = function(row, column)
{
  var info = this.columnInfo(column)
  if (!info) return '';
  
  var doc = this.requestDoc(row);
  
  if (typeof info.label == 'function')
  return info.label(doc)
  
  return doc[info.label];
}

exports.CouchDBLazyList.prototype.requestValue = function(row)
{
  var info = this.columns[0];
  
  var doc = this.requestDoc(row);
  
  if (typeof info.value == 'function')
  return info.value(doc)
  
  return doc[info.value];
}

exports.CouchDBLazyList.prototype.selectedValue = function()
{
  var index = this.tree.currentIndex;
  return this.requestValue(index);
}

exports.CouchDBLazyList.prototype.render = function(xul)
{
  with (xul)
  {
    tree({bind: 'tree', id: 'my-tree', flex: 1, onselect: this.onselect},
      treecols(
      collect(this.columnsInfo, function(_xul, column, index) {
         column.id = xuljet.id();
         this.columns[index] = column;
         _xul.treecol({id: column.id, flex: 1, label: column.name}) })),
    treechildren())
  }
}


exports.CouchDBLazyList.prototype.clearCache = function(xul)
{
  this.cache = new Map()
}


exports.CouchDBLazyList.prototype.finishRendering = function()
{  
  this.tree.view = this.view;  
} 