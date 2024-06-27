// Define function to display GeoJSON file
export function addGeoJsonDataSource(
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
          Cesium.Color.fromCssColorString(polygonColor).withAlpha(0.2); // Set polygon color
      }
    }
    return dataSource;
  });
}

// Define function to display GeoJSON buildings data source
export function addGeoJsonBuildingsDataSource(viewer, dataSourceUrl, polygonColor) {
  // Load the GeoJSON file
  return Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function (dataSource) {
    // Add the GeoJSON data to the viewer
    viewer.dataSources.add(dataSource);
    // Get the entities from the data source
    var entities = dataSource.entities.values;
    // Loop through the entities and set the extruded height, polygon color, and outline color
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var polygon = entity.polygon;
      if (polygon) {
        var extrudedHeight = entity.properties.B_hoeh.getValue();
        
        polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.extrudedHeight = extrudedHeight; // Set extruded height
        polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material = Cesium.Color.fromCssColorString(polygonColor).withAlpha(1); // Set polygon color
        polygon.outline = true; // Enable outline
        polygon.outlineColor = Cesium.Color.BLACK; // Set outline color to black
      }
    }
    return dataSource;
  });
}
