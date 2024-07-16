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
loadLod2Buildings(viewer);

// Celtis: Stepna, Quercus: Mark, Acer: Aug
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Acer') }, 'treeWithoutBed');
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Quercus') }, 'treeWithoutBed');
addTrees(viewer, { ...trees, features: trees.features.filter(feature => feature.properties.T_spec === 'Celtis') }, 'treeWithoutBed');
// setEntitiesVisibility(viewer, treeUrl.treeGlb, false);

// Load files
const geoJsonUrl = {
  aoi_parent: "./data/geojson/aoi_parent.geojson",
  aoi_child_i: "./data/geojson/aoi_child_i.geojson",
  aoi_child_ii: "./data/geojson/aoi_child_ii.geojson",
};

let dataSource_aoi_parent, dataSource_aoi_child_i, dataSource_aoi_child_ii;
Promise.all([
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_parent, 128 * 16, "rgba(0, 0, 255)").then((ds) => (dataSource_aoi_parent = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_child_i, 128 * 8, "rgba(0, 255, 0)").then((ds) => (dataSource_aoi_child_i = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl.aoi_child_ii, 128 * 2, "rgba(255, 0, 0)").then((ds) => (dataSource_aoi_child_ii = ds)),
]).then(() => {
  setCameraView;
});

function toggleEntities(action) {
  switch (action) {
    case 'showAll':
      dataSource_aoi_parent.show = true;
      dataSource_aoi_child_i.show = true;
      dataSource_aoi_child_ii.show = true;
      setEntitiesVisibility(viewer, treeUrl.treeGlb, false);
      break;
    case 'hideAllButII':
      dataSource_aoi_parent.show = false;
      dataSource_aoi_child_i.show = false;
      dataSource_aoi_child_ii.show = true;
      setEntitiesVisibility(viewer, treeUrl.treeGlb, true);
      break;
    case 'hideAll':
      dataSource_aoi_parent.show = false;
      dataSource_aoi_child_i.show = false;
      dataSource_aoi_child_ii.show = false;
      setEntitiesVisibility(viewer, treeUrl.treeGlb, true);
      break;
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