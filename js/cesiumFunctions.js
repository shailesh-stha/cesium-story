// Define function to display GeoJSON file
export function addGeoJsonDataSource(
  viewer,
  dataSourceUrl,
  extrudedHeight,
  polygonColor
) {
  return Cesium.GeoJsonDataSource.load(dataSourceUrl).then(function (
    dataSource
  ) {
    viewer.dataSources.add(dataSource);
    var entities = dataSource.entities.values;
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var polygon = entity.polygon;
      if (polygon) {
        polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.extrudedHeight = extrudedHeight;
        polygon.extrudedHeightReference =
          Cesium.HeightReference.RELATIVE_TO_GROUND;
        polygon.material =
          Cesium.Color.fromCssColorString(polygonColor).withAlpha(0.2);
      }
    }
    return dataSource;
  });
}

// Load LOD2 buildings into viewer
export async function loadLod2Buildings(viewer) {
  const tileset = await Cesium.Cesium3DTileset.fromUrl(
    "https://web3d.basemap.de/cesium/buildings-floor/root.json"
  );
  // Define custom styles
  const cityStyle = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${surface} === 'wall'", "color('#f2f2f2')"],
        ["${surface} === 'roof'", "color('#ff5c4d')"],
        ["${surface} === 'bridge'", "color('#999999')"],
      ],
    },
  });
  tileset.style = cityStyle;
  // Add the tileset to the scene
  viewer.scene.primitives.add(tileset);
}

// Trees
export const treeUrl = {
  treeLowPoly: "./data/3d_model/tree_poly.glb",
  treewithBed: "./data/3d_model/tree_poly_with_bed.glb",
  treeWithoutBed: "./data/3d_model/tree_poly_without_bed.glb",
};
export const addTrees = (viewer, trees, treeType) => {
  trees.features.forEach((feature) => {
    const position = Cesium.Cartesian3.fromDegrees(
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1]
    );
    viewer.entities.add({
      name: treeUrl[treeType],
      position: position,
      model: {
        uri: treeUrl[treeType],
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        scale: 1,
      },
    });
  });
};

export const setEntitiesVisibility = (viewer, name, visible) => {
  viewer.entities.values.forEach((entity) => {
    if (entity.name === name) {
      entity.show = visible;
    }
  });
};

export const toggleVisibility = (entity, show) => {
  if (entity) {
    entity.show = show;
  }
};