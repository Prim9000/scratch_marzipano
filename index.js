var Marzipano = require('./marzipano');

var panoElement = document.getElementById('pano');
var viewerOpts = {
  controls: {
    mouseViewMode: 'drag'    // drag|qtvr
  }
};

var viewer = new Marzipano.Viewer(panoElement, viewerOpts)


// limits the view to a maximum fov of 120°
//limits the view to a minimum fov for a maximum face resolution of 1024x1024

var levels = [
    { tileSize: 512, size: 512 },
    { tileSize: 512, size: 1024 }
  ];
  
  var geometry = new Marzipano.CubeGeometry(levels);
  var source = Marzipano.ImageUrlSource.fromString("tiles/{z}/{f}/{y}/{x}.jpg");
  var view = new Marzipano.RectilinearView();
  
  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view
  });

  var levels = [
    { tileSize: 256, size: 256, fallbackOnly: true },
    { tileSize: 512, size: 512 },
    { tileSize: 512, size: 1024 }
  ];
  
  var geometry = new Marzipano.CubeGeometry(levels);
  
  var source = Marzipano.ImageUrlSource.fromString("tiles/{z}/{f}/{y}/{x}.jpg", {
    cubeMapPreviewUrl: "tiles/preview.jpg"
  });
  
  var initialView = {
    yaw: 90 * Math.PI/180,
    pitch: -30 * Math.PI/180,
    fov: 90 * Math.PI/180
  };
  
  var limiter = Marzipano.RectilinearView.limit.traditional(1024, 120*Math.PI/180);
  
  var view = new Marzipano.RectilinearView(initialView, limiter);
  
  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });

  scene.switchTo({
    transitionDuration: 1000
  });

  var destinationViewParameters = {
    yaw: 10 * Math.PI/180,
    pitch: 15 * Math.PI/180,
    fov: 60 * Math.PI/180
  };
  
  var options = {
    transitionDuration: 2000
  }
  
  scene.lookTo(destinationViewParameters, options);


  var scene = viewer.scene(); // get the current scene
var view = scene.view();    // get the scene's view


// Get the view values

var yaw = view.yaw();
var pitch = view.pitch();
var fov = view.fov();      // fov is horizontal
var vfov = view.vfov();
var hfov = view.hfov();    // same as view.fov()


// Change the values

view.setYaw(45 * Math.PI/180);
view.setPitch(30 * Math.PI/180);
view.setFov(60 * Math.PI/180);

view.setParameters({
  yaw: 45 * Math.PI/180,
  pitch: 30 * Math.PI/180,
  fov: 60 * Math.PI/180
});


// Offset the values by some amount

view.offsetYaw(10 * Math.PI/180);
view.offsetPitch(10 * Math.PI/180);
view.offsetFov(10 * Math.PI/180);


var autorotate = Marzipano.autorotate({
    yawSpeed: 0.1,         // Yaw rotation speed
    targetPitch: 0,        // Pitch value to converge to
    targetFov: Math.PI/2   // Fov value to converge to
  });
  
  // Autorotate will start after 3s of idle time
  viewer.setIdleMovement(3000, autorotate);  
  // Disable idle movement
  viewer.setIdleMovement(Infinity);
  
  // Start autorotation immediately
  viewer.startMovement(autorotate); 
  // Stop any ongoing automatic movement
  viewer.stopMovement();

  var element = document.getElementById('spot');
var position = { yaw: Math.PI/4, pitch, Math.PI/8 };
scene.hotspotContainer().createHotspot(element, position)


var imgHotspot = document.createElement('img');
imgHotspot.src = 'img/hotspot.png';
imgHotspot.classList.add('hotspot');
imgHotspot.addEventListener('click', function() {
  switchScene(findSceneById(hotspot.target));
});

var position = { yaw: Math.PI/4, pitch: Math.PI/8 };

marzipanoScene.hotspotContainer().createHotspot(imgHotspot, position);