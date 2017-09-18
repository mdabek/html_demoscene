function addShadowCubesToScene(scene, cubes) {
	for (var i = 0; i < cubes.length; i++) {
		scene.add(cubes[i]);
	}
}

function logOpacity(max, factor) {
	return Math.log(factor*Math.E)/max;
}

function generateShadowCubes(origin, color){
    var count = 20;
	var factor = 1/count;
    var cubes = [];
    
    for (var i = 0; i < count; i++) {
		var mat = new THREE.MeshBasicMaterial( { 'color':color } );
		
		mat.transparent = true;
		
		mat.opacity = 1 - logOpacity(4, i+1);
		
		if (mat.opacity < 0) {
			console.error("Opacity too small");
		}
		
		var size = 1 + 2*logOpacity(4, i+1);//2*factor*i;
		
        cubes.push(new THREE.Mesh(new THREE.BoxGeometry( size, size, size ), 
                                  mat));

        cubes[i].position.x = origin.x - factor*i;
        cubes[i].position.y = origin.y;
        cubes[i].position.z = origin.z;
    }

    return cubes;
}

function calculateCameraPosition(camera, camslide, camRadius) {
	
	camera.position.x += camslide;
	
	if (camRadius == Math.floor(Math.abs(camera.position.x)) || camera.position.x == 0) {
		camslide *= -1;
	}
	console.log(camera.position.x, camslide, camRadius);
	camera.position.z = Math.sqrt(camRadius*camRadius - camera.position.x*camera.position.x);
	return camslide;
}

function readjustRandomShadowcube(cube, xfactor, yfactor) {
	randX = (Math.random() - 0.5)*xfactor;
	randZ = (Math.random() - 0.5)*yfactor;
	
	for (var i = 0; i < cube.length; i++) {
        cube[i].position.x = randX;// - 0.05*i;
        cube[i].position.y = 8;
        cube[i].position.z = randZ;
	}
}

function generateRandomShadowCubes(xfactor, yfactor) {
	randX = (Math.random() - 0.5)*xfactor;
	randZ = (Math.random() - 0.5)*yfactor;
	
	return generateShadowCubes(new THREE.Vector3(randX, 10-5*randZ, randZ), 0x00DDFF);
}