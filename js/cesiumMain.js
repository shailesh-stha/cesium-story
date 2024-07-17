import { myAccessToken, cesiumViewerOptionsGoogle3dTiles } from "./cesiumConfig.js";
import { cesiumCameraViews } from "./cameraSettings.js";
import { addGeoJsonDataSource, loadLod2Buildings, treeUrl, addTrees, setEntitiesVisibility } from "./cesiumFunctions.js";
import { trees } from "./treeCoords.js";

Cesium.Ion.defaultAccessToken = myAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumMapContainer", cesiumViewerOptionsGoogle3dTiles);

function setCameraView(view) {
  viewer.camera.flyTo(cesiumCameraViews[view]);
}

// Initialize camera view
viewer.camera.setView(cesiumCameraViews.view1);
// Call functions
const load2Buildings = loadLod2Buildings(viewer);

// Celtis: Stepna, Quercus: Mark, Acer: Aug
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Acer') }, 'treeWithoutBed');
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Quercus') }, 'treeWithoutBed');
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Celtis') }, 'treeWithoutBed');
setEntitiesVisibility(viewer, treeUrl.treeWithoutBed, false);

// Load files
const geoJsonUrl = {
  aoi_parent: "./data/geojson/aoi_parent.geojson",
  aoi_child_i: "./data/geojson/aoi_child_i.geojson",
  aoi_child_ii: "./data/geojson/aoi_child_ii.geojson",
  uhi: "./data/geojson/uhi.geojson",
};

let dataSource_aoi_parent, dataSource_aoi_child_i, dataSource_aoi_child_ii, dataSource_uhi;
Promise.all([
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_parent, 128 * 16, "rgba(0, 0, 255)").then((ds) => (dataSource_aoi_parent = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_child_i, 128 * 8, "rgba(0, 255, 0)").then((ds) => (dataSource_aoi_child_i = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_child_ii, 128 * 2, "rgba(255, 0, 0)").then((ds) => (dataSource_aoi_child_ii = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl.uhi, 32 * 2, "rgba(255, 255, 0)").then((ds) => (dataSource_uhi = ds)),
]).then(() => {
  dataSource_uhi.show = false;
  setCameraView;
})
// add image to cesium
const layers = viewer.scene.imageryLayers;
const baseTemperature = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl(
    "./data/img/_base.png",
    {
      rectangle: Cesium.Rectangle.fromDegrees(
        9.171829841387,
        47.65887332060,
        9.1786643808,
        47.66349054756
      ),
    }
  )
);
layers.add(baseTemperature);
const testTemperature = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl(
    "./data/img/_test.png",
    {
      rectangle: Cesium.Rectangle.fromDegrees(
        9.171829841387,
        47.65887332060,
        9.1786643808,
        47.66349054756
      ),
    }
  )
);
layers.add(testTemperature);

baseTemperature.show = false;
baseTemperature.alpha = 0.75;
testTemperature.show = false;
testTemperature.alpha = 0.75;

function toggleEntities(action) {
  switch (action) {
    case 'showAOIs':
      dataSource_aoi_parent.show = true;
      dataSource_aoi_child_i.show = true;
      dataSource_aoi_child_ii.show = true;
      dataSource_uhi.show = false;
      setEntitiesVisibility(viewer, treeUrl.treeWithoutBed, false);
      baseTemperature.show = false;
      break;
    case 'showOnlyII':
      dataSource_aoi_parent.show = false;
      dataSource_aoi_child_i.show = false;
      dataSource_aoi_child_ii.show = true;
      dataSource_uhi.show = false;
      setEntitiesVisibility(viewer, treeUrl.treeWithoutBed, true);
      baseTemperature.show = false;
      break;
    case 'showUHIElements':
      dataSource_aoi_parent.show = false;
      dataSource_aoi_child_i.show = false;
      dataSource_aoi_child_ii.show = false;
      dataSource_uhi.show = false;
      setEntitiesVisibility(viewer, treeUrl.treeWithoutBed, true);
      baseTemperature.show = true;
      baseTemperature.alpha = 0.5;
      break;
    case 'showUHIandOrbit':
      dataSource_aoi_parent.show = false;
      dataSource_aoi_child_i.show = false;
      dataSource_aoi_child_ii.show = false;
      dataSource_uhi.show = true;
      setEntitiesVisibility(viewer, treeUrl.treeWithoutBed, true);
      baseTemperature.show = false;
      baseTemperature.alpha = 0.5;
      // Orbit this point
      viewer.clock.onTick.addEventListener(function (clock) {
        viewer.scene.camera.rotateRight(0);
      });
    default:
      console.error('Invalid action: ' + action);
  }
}

window.setCameraView = setCameraView;
window.toggleEntities = toggleEntities;

// Get camera info
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function() {
  var longitude = Cesium.Math.toDegrees(viewer.camera.positionCartographic.longitude);
  var latitude = Cesium.Math.toDegrees(viewer.camera.positionCartographic.latitude);
  var height = viewer.camera.positionCartographic.height;
  var heading = Cesium.Math.toDegrees(viewer.camera.heading);
  var pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
  var roll = Cesium.Math.toDegrees(viewer.camera.roll);
  var output = `destination: Cesium.Cartesian3.fromDegrees(${longitude}, ${latitude}, ${height}),
    orientation: {
      heading: Cesium.Math.toRadians(${heading}),
      pitch: Cesium.Math.toRadians(${pitch}),
      roll: 0,
    },`;
  console.log(output);
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);