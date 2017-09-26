import L from 'leaflet';

/**
 * Depending on which L plugin you choose to extend, different life-cycle methods will be available.
 * This particular example only showcases a small part of what happens to a layer when added.
 *
 * To find appropriate methods to override, look at the leaflet source code for the particular class.
 */
L.MyPlugin = L.Layer.extend({
  options: {
    // Default options should go here.
  },
  initialize: function (options) {
    // First part of the lifecycle, merge the options-parameter into this.options
    L.Util.setOptions(this, options);
    console.log('Successfully initialized')
  },
  onAdd: function(map) {
    // Add the layer to the map.
  }
})

export function myPlugin(options) {
  return new L.MyPlugin(options)
}

