"use strict";

var ol = require('openlayers');
var $ = require('jquery');
var viewer = require('../viewer');
var tile = require('./tile');

var xyz = function xyz(layerOptions) {
  var xyzDefault = {
    layerType: 'tile',
    featureinfoLayer: undefined
  };
  var sourceDefault = {};
  var xyzOptions = $.extend(xyzDefault, layerOptions);
  xyzOptions.sourceName = xyzOptions.id;
  var sourceOptions = $.extend(sourceDefault, viewer.getMapSource()[layerOptions.source]);
  sourceOptions.attributions = xyzOptions.attribution;
  sourceOptions.projection = viewer.getProjectionCode() || 'EPSG:3857';
  sourceOptions.tileGrid = viewer.getTileGrid();
  if(xyzOptions.layerURL){
    sourceOptions.url += xyzOptions.layerURL;
  }
  else {
    var format = sourceOptions.sourceName.split('.')[1],
      url = sourceOptions.sourceName.split('.')[0] + '/{z}/{x}/{y}.';
    url += format;
    sourceOptions.url = url;
  }
  var xyzSource = createSource(sourceOptions);
  return tile(xyzOptions, xyzSource);
}

function createSource(options) {
  options.crossOrigin = 'anonymous';
  return new ol.source.XYZ(options);
}

module.exports = xyz;
