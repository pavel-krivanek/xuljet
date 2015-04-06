<table border='0'><tr><td><img src='http://xuljet.googlecode.com/files/xuljet-middle.jpg' /></td><td>
XULJet is a JavaScript framework that helps to create platform independent desktop applications directly in JavaScript.<br>
<br>
It uses Mozilla XULRunner for rendering of GUI components.<br>
<br>
XULJet has component-based architecture inspired by <a href='http://www.seaside.st'>Seaside</a> and XUL DSL canvas similar to <a href='http://edspencer.github.com/jaml/'>Jaml</a>.<br>
<br>
For basic information about XULRunner applications structure and distribution see <a href='https://developer.mozilla.org/en/getting_started_with_xulrunner'>this documentation</a>
</td></tr></table>

## Features ##
  * component-based architecture that increases reuseability of the code
> ![![](http://xuljet.googlecode.com/files/embedding_small.png)](http://xuljet.googlecode.com/files/embedding.png)
  * readable description of GUI directly in JavaScript, no need of external XML files
> ![http://xuljet.googlecode.com/files/canvas.png](http://xuljet.googlecode.com/files/canvas.png)
  * easy access to XUL elements using bindings to component properties
> ![http://xuljet.googlecode.com/files/binding-screenshot.png](http://xuljet.googlecode.com/files/binding-screenshot.png)
  * simple embedding of HTML and SVG
  * forms (they have no direct support in XUL)
  * simple generation of printed reports
  * CommonJS module system
  * native CouchDB support without origin limitations
  * MIT license

[![](https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=9RRMXHNEBK2EY&lc=CZ&item_number=xuljet%2ddonation&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

## Hello World! example ##

  * load xuljet module
  * create a subclass of xuljet.Component named Main with one instance variable
  * specify what this component should render.
  * set an instance of your component class as the root component of the main application window

For more complex examples see http://code.google.com/p/xuljet/source/browse/#hg/examples/demo/chrome/content/pages

<table border='0'><tr><td>
<pre><code>var xuljet = require('lib/xuljet');<br>
<br>
var Main = function(aWindow)<br>
{<br>
  xuljet.Component.call(this, aWindow);<br>
  this.message = "Hello World!";<br>
}<br>
xuljet.inherits(Main, xuljet.Component);<br>
<br>
Main.prototype.render = function(xul)<br>
{<br>
  with (xul)<br>
  {<br>
    vbox({flex: 1}, <br>
      toolbox(<br>
        menubar(<br>
          menu({label: "File", accesskey: "f"},<br>
            menupopup(<br>
              menuitem({label: "Close", oncommand: "window.close()"}))))), <br>
      vbox({align: "center", pack: "center", flex: 1}, <br>
        description({bind: "desc"}, "Press the button"),<br>
        button({label: "OK", oncommand: function() {<br>
          this["desc"].value = this.message}})),<br>
      statusbar(<br>
        statusbarpanel({flex: 1, label: 'Ready...'})))<br>
  }<br>
}<br>
<br>
function main()<br>
{<br>
  var rootComponent = new Main(window);<br>
  window.setTitle("XULJet");<br>
  rootComponent.beMainWindowComponent();<br>
}<br>
</code></pre>
</td><td>
<img src='http://xuljet.googlecode.com/files/helloworld.png' />

<img src='http://xuljet.googlecode.com/files/helloworld_linux.png' />
</td></tr></table>
## Forms ##
XUL has no direct way how to create forms (it has no FORM tag). So you have to process each input element separately. XULJet provides a form pseudo-tag and a way how to link an object to a from element. It works even for complex elements like listboxes with multiple selection.
```
form({id: "myForm"},
  textbox({link: [this.data, 'name']}),
  textbox({link: [this.data, 'surname']}),
  button({label: "Submit", oncommand: function() {
    this.processForm("myForm")
  }}))
```
## Printing ##
XULJet provides a simple way how to dynamically generate printed reports. They can combine HTML and SVG content. XULRunner has rich possibilitis to set printing options.
```
var html = new xuljet.HTMLCanvas();
with (html)
{
  h1("Printed page");
  p("Lorem ipsum dolor sit amet, consectetur adipisicing elit...");
}
with (html.SVG())
{
  svg({width: "120px", height: "120px"}, 
    circle({r: 50, cx: 60, cy: 60, style: "stroke: red; fill: none; stroke-width: 20" }),
    line({x1: 33, y1: 93, x2: 93, y2: 23, style: "stroke: red; stroke-width: 20"}))
}
this.print(html)					
```
## Screenshots ##
### easy-to-use forms ###
![http://xuljet.googlecode.com/files/screenshot_002.png](http://xuljet.googlecode.com/files/screenshot_002.png)
![http://xuljet.googlecode.com/files/screenshot_001.png](http://xuljet.googlecode.com/files/screenshot_001.png)
### embedded components, images, SVG and HTML ###
![http://xuljet.googlecode.com/files/screenshot_003.png](http://xuljet.googlecode.com/files/screenshot_003.png)
### CouchDB support ###
![http://xuljet.googlecode.com/files/couchdb.png](http://xuljet.googlecode.com/files/couchdb.png)