// pop-up elemants
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popTitle = document.getElementById('popTitle');
var popStory = document.getElementById('popStory');

// Layer for pop up
var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
 closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
}


// set NZTM projection extent so OL can determine zoom level 0 extents.
// Define NZTM projection
proj4.defs("EPSG:2193","+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

// Register projection with OpenLayers
ol.proj.proj4.register(proj4);

// Create new OpenLayers projection
var proj2193 = new ol.proj.Projection({
	code: 'EPSG:2193',
	units: 'm',
	extent: [827933.23, 3729820.29, 3195373.59, 7039943.58]
});

// NZTM tile matrix origin, resolution and matrixId definitions. See the LDS tile set definition document for more information
var origin = [-1000000, 10000000];
var resolutions = [
    8960,
    4480,
    2240,
    1120,
    560,
    280,
    140,
    70,
    28,
    14,
    7,
    2.8,
    1.4,
    0.7,
    0.28,
    0.14,
    0.07
  ];

var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


// Tile Services Map
var urlTemplate =
"http://xycarto.tangata.whenua.tiles.s3-ap-southeast-2.amazonaws.com/tangataWhenua-rasterTiles/20210516/{z}/{x}/{y}.png";

// Set raster layer
var layer = new ol.layer.Tile({
  maxZoom: 12,
  source: new ol.source.XYZ({
    url: urlTemplate,
    projection: proj2193,
    tileGrid: new ol.tilegrid.TileGrid({
      origin: origin,
      resolutions: resolutions,
      matrixIds: matrixIds,
      extent: [827933.23, 3729820.29, 3195373.59, 7039943.58],
      tileSize: [512, 512],
    })
  })
});

/*var getText = function(features) {
  var text = features[0].getProperties().name;
  return text;
};*/

var fill = new ol.style.Fill({
  color: '#000000'
});
var stroke = new ol.style.Stroke({
  color: '#000000',
  width: 0
});

var style = new ol.style.Style({
    image: new ol.style.Circle({
      fill: fill,
      stroke: stroke,
      radius: 3
    }),
    fill: fill,
    stroke: stroke,
    text: new ol.style.Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      placement: 'point',
      fill: new ol.style.Fill({color: '#fff'}),
      stroke: new ol.style.Stroke({color: '#000', width: 2}),
      textAlign: 'left',
      textBaseline: 'bottom',
      offsetX: 3,
      offsetY: -3,
    }), 
});

var styleFunction = function(feature) {
  style.getText().setText(feature.get('name'));
  return style;
}

var placesource = new ol.source.VectorTile({
  cacheSize: 0,
  overlaps: true,
  tilePixelRatio: 1, // oversampling when > 1
  tileGrid: new ol.tilegrid.TileGrid({ 
    origin: [-1000000, 10000000],
    maxZoom: 12,
    tileSize: 4096,
    extent: [827933.23, 3729820.29, 3195373.59, 7039943.58],
    resolutions: resolutions,
  }),
  extent: [827933.23, 3729820.29, 3195373.59, 7039943.58],
  format: new ol.format.MVT(),
  projection: ol.proj.get('EPSG:2193'),
  url: "https://xycarto.github.io/tangata-whenua-poc/tangataWhenua-vectorTiles/tangataWhenua-vectorTiles/20210516/{z}/{x}/{y}.pbf"
});

//https://xycarto.github.io/tangata-whenua-poc/

var vectorMap = new ol.layer.VectorTile({
  declutter: true,
  source: placesource,
  renderMode: 'vector',
  zIndex: 10,
  style: styleFunction,
  renderBuffer: 127,
  
})

// Add base map to HTML map container
var map = new ol.Map({
  target: 'map',
  layers: [layer, vectorMap],
  scale: resolutions,
  view: new ol.View({
    center: ol.proj.transform(
      [173.8,-35.0],
      "EPSG:4326",
      "EPSG:2193"
    ),
    //extent: [174.0,-37.0,176.0,-33.0],
    //zoom: 7,
    //minZoom: 4,
    //maxZoom: 12,
    projection: proj2193,
    //resolutions: resolutions,
    resolution: 140,
    minResolution: 1.4,
    maxResolution: 560,
    constrainResolution: true,
  })
});

map.on("moveend", function() {
  var zoom = map.getView().getZoom();
  console.log(zoom);
});


// Add overlay for Popup window
map.addOverlay(overlay);

// Get JSON for vector tile styles and apply styling to vector tiles
/*fetch('./styleText.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(vectorMap, glStyle, 'placenames_poc.placenames_poc');
  });
});*/

//Select Features
map.on('click', showInfo);

function showInfo(evt) {
  var coordinate = evt.coordinate;
  console.log(coordinate);
  
  var features = map.getFeaturesAtPixel(evt.pixel);

  if (!features.length) {
    content = {};
    overlay.changed();
    return;
  }

  console.log(features[0].getProperties().name);
  var title = features[0].getProperties().name;
  var story = features[0].getProperties().desc_text;
  popTitle.innerHTML = title + '<hr>';
  popStory.innerHTML = story;

  overlay.setPosition(coordinate);
};