import { myAccessToken } from "./cesiumConfig.js";
import { trees } from "./coordinates.js";
import { addGeoJsonDataSource, addGeoJsonBuildingsDataSource } from "./cesiumFunctions.js";
import { setCameraView, cameraViews } from "./cameraViews.js";

Cesium.Ion.defaultAccessToken = myAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false, 
  timeline: false, 
  geocoder: false, 
  homeButton: false, 
  sceneModePicker: false, 
  baseLayerPicker: false, 
  navigationHelpButton: false, 
  infoBox: false, 
  selectionIndicator: false, 
  creditContainer: document.createElement("div"), 
});

// Directly set the camera at the given longitude, latitude, and height.
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    9.22501849,
    47.623252188,
    9000.0,
  ),
  orientation: {
    heading: Cesium.Math.toRadians(320.3845946),
    pitch: Cesium.Math.toRadians(-50.12191625),
    roll: 0.0,
  },
});

// Load files
var geoJsonUrl_aoi_parent = "data/geojson/aoi_parent.geojson";
var geoJsonUrl_aoi_child_i = "data/geojson/aoi_child_i.geojson";
var geoJsonUrl_aoi_child_ii = "data/geojson/aoi_child_ii.geojson";
var geoJsonUrl_buildings = "data/geojson/buildings_clipped.geojson";
let dataSource_aoi_parent, dataSource_aoi_child_i, dataSource_aoi_child_ii, dataSource_buildings;

const url = {
  treeGlb: "./data/3d_model/tree_poly.glb",
};

const createModel = (viewer, url, x, y) => {
  const position = Cesium.Cartesian3.fromDegrees(x, y);
  viewer.entities.add({
    name: url,
    position: position,
    model: {
      uri: url,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
  });
};

const addTrees = (viewer, trees) => {
  trees.features.forEach((feature) => {
    createModel(
      viewer,
      url.treeGlb,
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1]
    );
  });
  return Promise.resolve(); // To ensure compatibility with Promise.all
};

Promise.all([
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_parent, 256 * 16, "rgba(0, 0, 255)").then((ds) => (dataSource_aoi_parent = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_i, 256 * 8, "rgba(0, 255, 0)").then((ds) => (dataSource_aoi_child_i = ds)),
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, 256 * 1, "rgba(255, 0, 0)").then((ds) => (dataSource_aoi_child_ii = ds)),
  addGeoJsonBuildingsDataSource(viewer,geoJsonUrl_buildings, "rgba(240, 240, 230)").then((ds) => (dataSource_buildings = ds)),
  addTrees(viewer, trees)
]).then(() => {
  setCameraView1();
});

// Function to set the first camera view
function setCameraView1() {
  dataSource_aoi_parent.show = true;
  dataSource_aoi_child_i.show = true;
  dataSource_aoi_child_ii.show = true;
  dataSource_buildings.show = false;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.22501849,
      47.623252188,
      9000.0,
    ),
    orientation: {
      heading: Cesium.Math.toRadians(320.3845946),
      pitch: Cesium.Math.toRadians(-50.12191625),
      roll: 0.0,
    },
  });
}

// Function to set the second camera view
function setCameraView2() {
  dataSource_aoi_parent.show = false;
  dataSource_aoi_child_i.show = false;
  dataSource_aoi_child_ii.show = true;
  dataSource_buildings.show = true;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.1860554,
      47.654164996,
      1335.63201586
    ),
    orientation: {
      heading: Cesium.Math.toRadians(317.1461271312),
      pitch: Cesium.Math.toRadians(-35.7001158181),
      roll: 0.0,
    },
  });
}

// Function to set the third camera view
function setCameraView3() {
  dataSource_aoi_parent.show = false;
  dataSource_aoi_child_i.show = false;
  dataSource_aoi_child_ii.show = false;
  dataSource_buildings.show = true;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.175094957,
      47.65932849,
      577.129118408
    ),
    orientation: {
      heading: Cesium.Math.toRadians(277.1502153),
      pitch: Cesium.Math.toRadians(-42.7021187399),
      roll: 0.0,
    },
  });
}

// Function to set the fourth camera view
function setCameraView4() {
  dataSource_aoi_parent.show = false;
  dataSource_aoi_child_i.show = false;
  dataSource_aoi_child_ii.show = false;
  dataSource_buildings.show = true;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.178558714,
      47.660707968,
      573.70736867
    ),
    orientation: {
      heading: Cesium.Math.toRadians(262.470633429),
      pitch: Cesium.Math.toRadians(-38.0362514439),
      roll: 0.0,
    },
  });
}

// Function to set the third camera view
function setCameraView5() {
  dataSource_aoi_parent.show = false;
  dataSource_aoi_child_i.show = false;
  dataSource_aoi_child_ii.show = false;
  dataSource_buildings.show = true;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.17458559106,
      47.66100593136,
      603.499105
    ),
    orientation: {
      heading: Cesium.Math.toRadians(336.38809296),
      pitch: Cesium.Math.toRadians(-53.770967772),
      roll: 0.0,
    },
  });
}

// Attach the functions to the global window object
window.setCameraView1 = setCameraView1;
window.setCameraView2 = setCameraView2;
window.setCameraView3 = setCameraView3;
window.setCameraView4 = setCameraView4;
window.setCameraView5 = setCameraView5;

// Function to log the camera's current position and orientation
function logCameraPosition() {
  const camera = viewer.camera;
  const position = camera.positionCartographic;
  const heading = Cesium.Math.toDegrees(camera.heading);
  const pitch = Cesium.Math.toDegrees(camera.pitch);
  const roll = Cesium.Math.toDegrees(camera.roll);

  console.log(`Position: (${Cesium.Math.toDegrees(position.longitude)}, ${Cesium.Math.toDegrees(position.latitude)}, ${position.height})`);
  console.log(`Heading: ${heading}`);
  console.log(`Pitch: ${pitch}`);
  console.log(`Roll: ${roll}`);
}

// Event listener for camera changes
viewer.camera.changed.addEventListener(logCameraPosition);