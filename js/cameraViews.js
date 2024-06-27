export function setCameraView(viewer, dataSourceVisibility, destination, orientation) {
    for (const [dataSource, visibility] of Object.entries(dataSourceVisibility)) {
      dataSource.show = visibility;
    }
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...destination),
      orientation: {
        heading: Cesium.Math.toRadians(orientation.heading),
        pitch: Cesium.Math.toRadians(orientation.pitch),
        roll: orientation.roll,
      },
    });
  }
  
  export const cameraViews = {
    view1: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: true,
        dataSource_aoi_child_ii: true,
        dataSource_buildings: false,
      },
      destination: [9.2260296, 47.617526094, 5216.312936],
      orientation: {
        heading: 323.0077053,
        pitch: -33.34587869,
        roll: 0.002471124,
      },
    },
    view2: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: false,
        dataSource_aoi_child_ii: true,
        dataSource_buildings: true,
      },
      destination: [9.1860554, 47.654164996, 1335.63201586],
      orientation: {
        heading: 317.1461271312,
        pitch: -35.7001158181,
        roll: 0.0,
      },
    },
    view3_1: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: false,
        dataSource_aoi_child_ii: false,
        dataSource_buildings: true,
      },
      destination: [9.175094957, 47.65932849, 577.129118408],
      orientation: {
        heading: 277.1502153,
        pitch: -42.7021187399,
        roll: 0.0,
      },
    },
    view3_2: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: false,
        dataSource_aoi_child_ii: false,
        dataSource_buildings: true,
      },
      destination: [9.175094957, 47.65932849, 577.129118408],
      orientation: {
        heading: 277.1502153,
        pitch: -42.7021187399,
        roll: 0.0,
      },
    },
    view4: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: false,
        dataSource_aoi_child_ii: false,
        dataSource_buildings: true,
      },
      destination: [9.178558714, 47.660707968, 573.70736867],
      orientation: {
        heading: 262.470633429,
        pitch: -38.0362514439,
        roll: 0.0,
      },
    },
    view5: {
      dataSourceVisibility: {
        dataSource_aoi_child_i: false,
        dataSource_aoi_child_ii: false,
        dataSource_buildings: true,
      },
      destination: [9.17458559106, 47.66100593136, 603.499105],
      orientation: {
        heading: 336.38809296,
        pitch: -53.770967772,
        roll: 0.0,
      },
    },
  };
  
  // Attach the functions to the global window object for easy access
  window.setCameraView = setCameraView;
  window.cameraViews = cameraViews;
  