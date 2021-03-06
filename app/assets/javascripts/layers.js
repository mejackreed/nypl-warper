

//function used with osm mapnik tiles
function osm_getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}
//use with
function get_tilesathome_osm_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit)
    {
        return null;
    }
    else
    {
        x = ((x % limit) + limit) % limit;
        var path = z + "/" + x + "/" + y + "." + this.type;
        var url = this.url;
        url="http://tah.openstreetmap.org/Tiles/tile/"
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    }
}

var osma = new OpenLayers.Layer.TMS(
    "Osmarender",
    ["http://a.tah.openstreetmap.org/Tiles/tile/", "http://b.tah.openstreetmap.org/Tiles/tile/", "http://c.tah.openstreetmap.org/Tiles/tile/"],
    {
        type:'png',
        getURL: get_tilesathome_osm_url,
        displayOutsideMaxExtent: true
    }, {
        'buffer':1
    } );



var mapnik = new OpenLayers.Layer.OSM("OSM Mapnik", ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", 
  "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"],{
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
    numZoomLevels: 20,
    attribution: '&copy <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});


var jpl_wms = new OpenLayers.Layer.WMS("NASA Landsat 7", "http://t1.hypercube.telascience.org/cgi-bin/landsat7", {
    layers: "landsat7"
});

var oamlayer = new OpenLayers.Layer.WMS( "OpenAerialMap",
   "http://openaerialmap.org/wms/",
   {layers: "world"}, { gutter: 15, buffer:0});

if(typeof(G_SATELLITE_MAP) !== 'undefined'){
  var googleSat = new OpenLayers.Layer.Google( "Google Satellite", {type: G_SATELLITE_MAP, 'sphericalMercator': true});
  var googleMaps = new OpenLayers.Layer.Google( "Google Streets", { 'sphericalMercator': true});
  var googleHybrid = new OpenLayers.Layer.Google("Google Hybrid", {type: G_HYBRID_MAP, 'sphericalMercator': true});
}


   var nyc = new OpenLayers.Layer.TMS("New York City (zoom in)", 
     "http://tile1.maps.nypl.org/nyc_tiles/",
     { type: 'png',
       getURL: osm_getTileURL,
       transitionEffect: 'resize',
       displayOutsideMaxExtent: true,
       wrapDateLine: true,
       numZoomLevels: 20
     });
     
     var ortho = new OpenLayers.Layer.WMS( "USGS Aerial Photos (2006)",
    ["http://tile1.maps.nypl.org/tilecache",
     "http://tile2.maps.nypl.org/tilecache",
     "http://tile3.maps.nypl.org/tilecache",
     "http://tile4.maps.nypl.org/tilecache" ],
    {layers: 'ortho', sphericalMercator: true, numZoomLevels: 23} );
    
    
var ny_2014 = new OpenLayers.Layer.OSM("NYC 2014",
        [
          "http://${s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
          "http://${s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
          "http://${s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png"
        ],
        {
          transitionEffect: 'resize',
          displayOutsideMaxExtent: true,
          wrapDateLine: true,
          numZoomLevels: 22,
          attribution: 'Map via <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://mapbox.com">Mapbox</a>'
        }
);
            
