# SVG-Agile

#### Adding multitouch support for interactive manipulation of SVG objects and groups of Objects

## Implementation
All svg objects that support the transform property may be manipulated with this library. For example group (*g*), path (*path*) and rectangle (*rect*) elements. **NOTE** Does not support transformation of the entire SVG element.

## Features
Minified library is currently at 1.9kB. Adds event listeners for touch, drag, pinch and transform. These events are triggered by the [hammerjs](http://eightmedia.github.io/hammer.js/) library.

#### Current
- Drag support with mouse and touch
- Pinch support for zoom
- support of multiple active groups
- JavaScript API to manipulate *'agile'* elements

#### Planned
- Support for zooming with mousewheel
- key-press zoom and pan support
- temporarily disable
- touch rotation

# Usage
- Add [hammerhead.js](https://raw.githubusercontent.com/CrowdHailer/HammerHead/master/hammerhead.js) and [hammerhead.css](https://raw.githubusercontent.com/CrowdHailer/HammerHead/master/hammerhead.css) to your project directory
- Include *hammer.min.js* and *hammerhead.js* in you html
- Include *hammerhead.css* (This disables native scrolling and can effect other areas of your site)
- Optionally include *hammer.fakemultitouch.js* and/or *hammer.showtouches.js*
- Activate with the following script passing the SVG's id
```js
Hammer.plugins.fakeMultitouch(); // If including fake multitouch
Hammer.plugins.showTouches();    // If including show touches
viewer = new Viewer(svgIdString); // For each active object
```

# Credits
Built on top of [Hammerjs](http://eightmedia.github.io/hammer.js/)