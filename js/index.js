import { myAccessToken } from "./cesiumConfig.js";
import { trees } from "./coordinates.js";

Cesium.Ion.defaultAccessToken = myAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumContainer", {
  // globe: false, // false for Google Maps API
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false, // Disable animation controls
  timeline: false, // Disable timeline controls
  geocoder: false, // Disable the search box
  homeButton: false, // Enable or disable home button
  sceneModePicker: false, // Enable or disable scene mode picker
  baseLayerPicker: false, // Enable or disable base layer picker
  navigationHelpButton: false, // Enable or disable navigation help button
  infoBox: false, // Enable or disable info box
  selectionIndicator: false, // Enable or disable selection indicator
  creditContainer: document.createElement("div"), // Hide Cesium Ion logo
});

// try {
//   const tileset = await Cesium.createGooglePhotorealistic3DTileset();
//   viewer.scene.primitives.add(tileset);
// } catch (error) {
//   console.log(`Failed to load tileset: ${error}`);
// }

// Directly set the camera at the given longitude, latitude, and height.
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    9.2260296,
    47.617526094,
    5216.312936
  ),
  orientation: {
    heading: Cesium.Math.toRadians(323.0077053),
    pitch: Cesium.Math.toRadians(-33.34587869),
    roll: 0.0,
  },
});

// load trees into the viewer
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

trees.features.forEach((feature) => {
  createModel(
    viewer,
    url.treeGlb,
    feature.geometry.coordinates[0],
    feature.geometry.coordinates[1]
  );
});

// Define function to display GeoJSON file
function addGeoJsonDataSource(
  viewer,
  dataSourceUrl,
  extrudedHeight,
  polygonColor
) {
  // Load the GeoJSON file
  return Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function (
    dataSource
  ) {
    // Add the GeoJSON data to the viewer
    viewer.dataSources.add(dataSource);
    // Get the entities from the data source
    var entities = dataSource.entities.values;
    // Loop through the entities and set the extruded height and polygon color
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var polygon = entity.polygon;
      if (polygon) {
        polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.extrudedHeight = extrudedHeight; // Set extruded height
        polygon.extrudedHeightReference =
          Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material =
          Cesium.Color.fromCssColorString(polygonColor).withAlpha(0.4); // Set polygon color
      }
    }
    return dataSource;
  });
}

// Define function to display GeoJSON buildings data source
function addGeoJsonBuildingsDataSource(viewer, dataSourceUrl, polygonColor) {
  // Load the GeoJSON file
  return Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function (
    dataSource
  ) {
    // Add the GeoJSON data to the viewer
    viewer.dataSources.add(dataSource);
    // Get the entities from the data source
    var entities = dataSource.entities.values;
    // Loop through the entities and set the extruded height and polygon color
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var polygon = entity.polygon;
      if (polygon) {
        polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.extrudedHeight = entity.properties.B_hoeh.getValue(); // Set extruded height
        polygon.extrudedHeightReference =
          Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material =
          Cesium.Color.fromCssColorString(polygonColor).withAlpha(1); // Set polygon color
      }
    }
    return dataSource;
  });
}

// Load files
var geoJsonUrl_aoi_child_i = "data/geojson/aoi_child_i.geojson";
var geoJsonUrl_aoi_child_ii = "data/geojson/aoi_child_ii.geojson";
var geoJsonUrl_buildings = "data/geojson/buildings_clipped.geojson";

let dataSource_aoi_child_i, dataSource_aoi_child_ii, dataSource_buildings;

Promise.all([
  addGeoJsonDataSource(
    viewer,
    geoJsonUrl_aoi_child_i,
    256 * 8,
    "rgba(255, 0, 0)"
  ).then((ds) => (dataSource_aoi_child_i = ds)),
  addGeoJsonDataSource(
    viewer,
    geoJsonUrl_aoi_child_ii,
    256 * 1,
    "rgba(0, 255, 0)"
  ).then((ds) => (dataSource_aoi_child_ii = ds)),
  addGeoJsonBuildingsDataSource(
    viewer,
    geoJsonUrl_buildings,
    "rgba(150, 150, 200)"
  ).then((ds) => (dataSource_buildings = ds)),
]).then(() => {
  setCameraView1(); // Set initial camera view once data sources are loaded
});

// Function to set the first camera view
function setCameraView1() {
  dataSource_aoi_child_i.show = true;
  dataSource_aoi_child_ii.show = true;
  dataSource_buildings.show = false;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      9.2260296,
      47.617526094,
      5216.312936
    ),
    orientation: {
      heading: Cesium.Math.toRadians(323.0077053),
      pitch: Cesium.Math.toRadians(-33.34587869),
      roll: 0.002471124,
    },
  });
}

// Function to set the second camera view
function setCameraView2() {
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
function setCameraView3_1() {
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

// Function to set the third camera view
function setCameraView3_2() {
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
window.setCameraView3_1 = setCameraView3_1;
window.setCameraView4 = setCameraView4;
window.setCameraView5 = setCameraView5;
