// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NzhhZmYxMy00YmU0LTRlYmQtYjQ3OC0xMTQyZmZkMGRkYTIiLCJpZCI6ODY3OTgsImlhdCI6MTcwODY5OTUzN30.ZB4aGsttOsZVWvPH1oiOMp2tuxP4G4QYAISb6lG7zs0';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false, // Disable animation controls
  timeline: false,  // Disable timeline controls
  geocoder: false,  // Disable the search box
  homeButton: true, // Enable or disable home button
  sceneModePicker: false, // Enable or disable scene mode picker
  baseLayerPicker: false, // Enable or disable base layer picker
  navigationHelpButton: false, // Enable or disable navigation help button
  infoBox: false, // Enable or disable info box
  selectionIndicator: false, // Enable or disable selection indicator
  creditContainer: document.createElement('div') // Hide Cesium Ion logo
});

// Directly set the camera at the given longitude, latitude, and height.
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(9.2260296, 47.617526094, 5216.312936),
  orientation: {
    heading: Cesium.Math.toRadians(323.0077053),
    pitch: Cesium.Math.toRadians(-33.34587869),
    roll: 0.002471124
  }
});

// Load files
var geoJsonUrl_aoi_child_i = 'data/geojson/aoi_child_i.geojson';
var geoJsonUrl_aoi_child_ii = 'data/geojson/aoi_child_ii.geojson';
var geoJsonUrl_buildings = 'data/geojson/buildings_clipped.geojson';

// Define function to display gejosn file
function addGeoJsonDataSource(viewer, dataSourceUrl, extrudedHeight, polygonColor) {
  // Load the GeoJSON file
  Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function(dataSource) {
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
        polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material = Cesium.Color.fromCssColorString(polygonColor).withAlpha(0.4); // Set polygon color
      }
    }
  });
}

// Define function to display gejosn file
function addGeoJsonBuildingsDataSource(viewer, dataSourceUrl, extrudedHeight, polygonColor) {
  // Load the GeoJSON file
  Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function(dataSource) {
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
        polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material = Cesium.Color.fromCssColorString(polygonColor).withAlpha(1); // Set polygon color
      }
    }
  });
}

addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_i, heightValue=256*8, colorValue='rgba(255, 0, 0, 0.4)');
addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, heightValue=256*1, colorValue='rgba(0, 255, 0, 0.4)');
addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');


// Function to set the first camera view
function setCameraView1() {
  viewer.dataSources.removeAll();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(9.2260296, 47.617526094, 5216.312936),
    orientation: {
      heading: Cesium.Math.toRadians(323.0077053),
      pitch: Cesium.Math.toRadians(-33.34587869),
      roll: 0.002471124
    },
    // complete: function(){
    //   addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_i, heightValue=256*8, colorValue='rgba(255, 0, 0, 0.4)');
    //   addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, heightValue=256*1, colorValue='rgba(0, 255, 0, 0.4)');
    // }
  });
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_i, heightValue=256*8, colorValue='rgba(255, 0, 0, 0.4)');
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, heightValue=256*1, colorValue='rgba(0, 255, 0, 0.4)');
  addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');
}

// Function to set the second camera view
function setCameraView2() {
  viewer.dataSources.removeAll();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(9.18792885, 47.65296196, 1421.47700275),
    orientation: {
      heading: Cesium.Math.toRadians(317.14612725),
      pitch: Cesium.Math.toRadians(-35.70011564),
      roll: 0.0
    },
    // complete: function(){
      // addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, heightValue=256*1, colorValue='rgba(0, 255, 0, 0.4)');
    // }
  });
  addGeoJsonDataSource(viewer, geoJsonUrl_aoi_child_ii, heightValue=256*1, colorValue='rgba(0, 255, 0, 0.4)');
  addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');
}

// Function to set camera view
function setCameraView3() {
  viewer.dataSources.removeAll();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(9.175094957, 47.65932849, 577.129118408),
    orientation: {
      heading: Cesium.Math.toRadians(277.1502153),
      pitch: Cesium.Math.toRadians(-42.7021187399),
      roll: 0.0000048538
    }
  });
  addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');
}

// Function to set camera view
function setCameraView4() {
  viewer.dataSources.removeAll();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(9.177822677, 47.66052656, 577.129118408),
    orientation: {
      heading: Cesium.Math.toRadians(264.0737670),
      pitch: Cesium.Math.toRadians(-39.20111778),
      roll: 0.00022738
    }
  });
  addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');
}

// Function to set camera view
function setCameraView5() {
  viewer.dataSources.removeAll();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(9.1739598, 47.66092487675, 584.36335433),
    orientation: {
      heading: Cesium.Math.toRadians(347.00998265),
      pitch: Cesium.Math.toRadians(-43.86954199),
      roll: 0.00022738
    }
  });
  addGeoJsonBuildingsDataSource(viewer, geoJsonUrl_buildings, heightValue=10, colorValue='rgba(150, 150, 200)');
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