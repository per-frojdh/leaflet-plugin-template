import L from 'leaflet';
import squareGrid from '@turf/square-grid';

L.MyPlugin = L.Layer.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);
    console.log("initialize");

  },
  onAdd: function(map) {
    this._featureCollection = squareGrid(
      this.options.extent,
      this.options.cellWidth,
      this.options.units
    );

    this._layer = new L.GeoJSON(this._featureCollection);
    this._addPropertiesToLayers();

    this._layer.eachLayer(function(layer) {
      layer.on('click', function() {
        if (!this.isToggled) {
          layer.setStyle({
            fillColor: 'orange'
          })
        } else {
          layer.setStyle({
            fillColor: 'blue'
          })
        }

        this.isToggled = !this.isToggled;

      })
    })

    this._layer.addTo(map);
  },
  _addPropertiesToLayers: function() {
    this._layer.eachLayer(function(layer) {
      layer.isToggled = false;
    });
  }
})

