"use strict";

const objects = {
    possibleObjects: ["flower", "tree", "grass"],

    loadedObjects: {
        flowerObject: null,
        grassObject: null,
        stone01Object: null,
        rocks1Object: null,
        rocks2Object: null,
        rocks3Object: null,
        rocks4Object: null,
    },

    createFlower: function createFlower(posX, posY, posZ) {
        const petalColors = [
            0xeb4034,   // red
            0xebdf34,   // yellow
            0x3474eb,   // blue
            0xb134eb,   // purple
            0xeb347a    // pink
        ];

        let flower = this.loadedObjects.flowerObject.clone();

        const petalMaterial = new THREE.MeshPhongMaterial({color: petalColors[helper.randomIntFromInterval(0, petalColors.length - 1)], side: THREE.DoubleSide});
        const stemMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});

        flower.children[0].position.z = -1.1;
        flower.children[0].rotation.x = Math.PI / 2;
        flower.children[0].rotation.y = helper.randomFloatFromInterval(0, 2 * Math.PI);
        flower.children[0].scale.set(2, 1, 2);
        flower.children[0].material = petalMaterial;
        flower.children[0].castShadow = true;
        flower.children[0].receiveShadow = true;

        flower.children[1].rotation.x = Math.PI / 2;
        flower.children[0].rotation.y = helper.randomFloatFromInterval(0, 2 * Math.PI);
        flower.children[1].scale.set(1.5, 0.1, 1.5);
        flower.children[1].material = stemMaterial;
        flower.children[1].castShadow = true;
        flower.children[1].receiveShadow = true;

        const seedsGeometry = new THREE.SphereGeometry(0.035, 8, 4);
        const seedsMaterial = new THREE.MeshPhongMaterial({color: 0xffff00});
        const seeds = new THREE.Mesh(seedsGeometry, seedsMaterial);
        seeds.position.set(0, 0, 0.22);
        flower.add(seeds);

        flower.position.set(posX, posY, posZ);
        flower.scale.set(0.0001, 0.0001, 0.0001);

        return {
            object3D: flower, 
            material: petalMaterial, 
            originalColor: petalMaterial.color.clone(), 
            lifeTime: helper.randomIntFromInterval(20, 40), 
            isGrowing: true, 
            isDying: false, 
            isDead: false
        };
    },

    createTree: function createTree(posX, posY, posZ) {
        // Create trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 16);
        const trunkTexture = new THREE.TextureLoader().load("../assets/textures/bark/Bark_06_height.png");
        const trunkNormalMap = new THREE.TextureLoader().load("../assets/textures/bark/Bark_06_normal.jpg");
        const trunkMaterial = new THREE.MeshPhongMaterial({color: 0xcc6600, map: trunkTexture, normalMap: trunkNormalMap});
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

        trunk.position.set(0, 0, 1);
        trunk.rotation.x = Math.PI / 2;

        trunk.castShadow = true;
        trunk.receiveShadow = true;

        // Create leafs
        let leavesGeometry = new THREE.SphereGeometry(0.7, 32, 16);
        const leavesTexture = new THREE.TextureLoader().load("../assets/textures/leaves/Hedge_001_Height.png");
        leavesTexture.wrapS = THREE.RepeatWrapping;
        leavesTexture.wrapT = THREE.RepeatWrapping;
        leavesTexture.repeat.set(2, 2);
        const leavesNormalMap = new THREE.TextureLoader().load("../assets/textures/leaves/Hedge_001_Normal.jpg");
        leavesNormalMap.wrapS = THREE.RepeatWrapping;
        leavesNormalMap.wrapT = THREE.RepeatWrapping;
        leavesNormalMap.repeat.set(2, 2);
        const leavesMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, map: leavesTexture, normalMap: leavesNormalMap});

        const leaves1 = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves1.rotation.x = Math.PI / 2;
        leaves1.position.set(0, 0, 1.75);
        leaves1.castShadow = true;
        leaves1.receiveShadow = true;
        
        leavesGeometry = new THREE.SphereGeometry(0.5, 32, 16);
        const leaves2 = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves2.rotation.x = Math.PI / 2;
        leaves2.position.set(0, 0.5, 1.5);
        leaves2.castShadow = true;
        leaves2.receiveShadow = true;
        
        leavesGeometry = new THREE.SphereGeometry(0.5, 32, 16);
        const leaves3 = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves3.rotation.x = Math.PI / 2;
        leaves3.position.set(0.5, 0.1, 1.7);
        leaves3.castShadow = true;
        leaves3.receiveShadow = true;
        
        let leaves = new THREE.Group();
        leaves.add(leaves1);
        leaves.add(leaves2);
        leaves.add(leaves3);

        leaves.rotation.z = helper.randomFloatFromInterval(0, 2 * Math.PI);

        let tree = new THREE.Group();
        tree.add(trunk);
        tree.add(leaves);

        tree.position.set(posX, posY, posZ);
        tree.scale.set(0.0001, 0.0001, 0.0001);

        return {
            object3D: tree, 
            material: leavesMaterial, 
            originalColor: leavesMaterial.color.clone(), 
            lifeTime: helper.randomIntFromInterval(20, 40), 
            isGrowing: true, 
            isDying: false, 
            isDead: false
        };
    },

    createGrass: function createGrass(posX, posY, posZ) {
        let grass = this.loadedObjects.grassObject.clone();

        const grassMaterial = new THREE.MeshPhongMaterial({color: 0x66e37d});

        grass.children[0].rotation.x = Math.PI / 2;
        grass.children[0].rotation.y = helper.randomFloatFromInterval(0, 2 * Math.PI);
        grass.children[0].scale.set(0.125, 0.125, 0.125);
        grass.children[0].material = grassMaterial;
        grass.children[0].castShadow = true;
        grass.children[0].receiveShadow = true;

        grass.position.set(posX, posY, posZ);
        grass.scale.set(0.0001, 0.0001, 0.0001);

        return {
            object3D: grass, 
            material: grassMaterial, 
            originalColor: grassMaterial.color.clone(), 
            lifeTime: helper.randomIntFromInterval(20, 40), 
            isGrowing: true, 
            isDying: false, 
            isDead: false
        };
    },

    createStone01: function createStone01(posX, posY, posZ) {
        let stone = this.loadedObjects.stone01Object.clone();

        const stone01Texture = new THREE.TextureLoader().load("assets/textures/stones/stone01.jpg");
        const stone01Material = new THREE.MeshPhongMaterial({map: stone01Texture});

        stone.material = stone01Material;
        stone.castShadow = true;
        stone.receiveShadow = true;

        stone.position.set(posX, posY, posZ);

        return stone;
    },

    createRock1: function createRock1(posX, posY, posZ) {
        let rock = this.loadedObjects.rocks1Object.clone();

        const rocksTexture = new THREE.TextureLoader().load("assets/textures/stones/rocks1Color.png");
        const rocksNormalMap = new THREE.TextureLoader().load("assets/textures/stones/rocks1Normal.png");
        const rocksMaterial = new THREE.MeshPhongMaterial({map: rocksTexture, normalMap: rocksNormalMap});

        rock.material = rocksMaterial;
        rock.castShadow = true;
        rock.receiveShadow = true;

        rock.position.set(posX, posY, posZ);
        rock.scale.set(0.5, 0.5, 0.5);

        return rock;
    },

    createRock2: function createRock2(posX, posY, posZ) {
        let rock = this.loadedObjects.rocks2Object.clone();

        const rocksTexture = new THREE.TextureLoader().load("assets/textures/stones/rocks1Color.png");
        const rocksNormalMap = new THREE.TextureLoader().load("assets/textures/stones/rocks1Normal.png");
        const rocksMaterial = new THREE.MeshPhongMaterial({map: rocksTexture, normalMap: rocksNormalMap});

        rock.material = rocksMaterial;
        rock.castShadow = true;
        rock.receiveShadow = true;

        rock.position.set(posX, posY, posZ);
        rock.scale.set(0.5, 0.5, 0.5);

        return rock;
    },

    createRock3: function createRock3(posX, posY, posZ) {
        let rock = this.loadedObjects.rocks3Object.clone();

        const rocksTexture = new THREE.TextureLoader().load("assets/textures/stones/rocks1Color.png");
        const rocksNormalMap = new THREE.TextureLoader().load("assets/textures/stones/rocks1Normal.png");
        const rocksMaterial = new THREE.MeshPhongMaterial({map: rocksTexture, normalMap: rocksNormalMap});

        rock.material = rocksMaterial;
        rock.castShadow = true;
        rock.receiveShadow = true;

        rock.position.set(posX, posY, posZ);
        rock.scale.set(0.5, 0.5, 0.5);

        return rock;
    },

    createRock4: function createRock4(posX, posY, posZ) {
        let rock = this.loadedObjects.rocks4Object.clone();

        const rocksTexture = new THREE.TextureLoader().load("assets/textures/stones/rocks1Color.png");
        const rocksNormalMap = new THREE.TextureLoader().load("assets/textures/stones/rocks1Normal.png");
        const rocksMaterial = new THREE.MeshPhongMaterial({map: rocksTexture, normalMap: rocksNormalMap});

        rock.material = rocksMaterial;
        rock.castShadow = true;
        rock.receiveShadow = true;

        rock.position.set(posX, posY, posZ);
        rock.scale.set(0.5, 0.5, 0.5);

        return rock;
    },

    createRandomObject: function createRandomObject(posX, posY, posZ) {
        const i = helper.randomIntFromInterval(0, this.possibleObjects.length - 1);
        switch(this.possibleObjects[i]) {
            case "flower":
                return this.createFlower(posX, posY, posZ);
            case "tree":
                return this.createTree(posX, posY, posZ);
            case "grass":
                return this.createGrass(posX, posY, posZ);
        }
    },

    createSpotLight: function createSpotLight(color, intensity, angle, penumbra) {
        const spotLight = new THREE.SpotLight(color, intensity);

        spotLight.angle = angle;
        spotLight.penumbra = penumbra;
        spotLight.distance = 15;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        
        return spotLight;
    },

    createTorus: function createTorus(color, radius, tubeRadius, radialSegments, tubularSegments) {
        const torusGeometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
        
        const groundTexture = new THREE.TextureLoader().load("assets/textures/ground/Ground_Grass_001_COLOR.jpg");
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(40, 25);

        const groundNormalMap = new THREE.TextureLoader().load("assets/textures/ground/Ground_Grass_001_NORM.jpg");
        groundNormalMap.wrapS = THREE.RepeatWrapping;
        groundNormalMap.wrapT = THREE.RepeatWrapping;
        groundNormalMap.repeat.set(40, 25);

        const torusMaterial = new THREE.MeshPhongMaterial({map: groundTexture, normalMap: groundNormalMap});
        
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);

        torus.receiveShadow = true;

        return torus;
    },

    createLamp: function createLamp(color, radiusTop, radiusBottom, height, radialSegments) {
        const lampGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        const lampMaterial = new THREE.MeshPhongMaterial({color: color});
        const lamp = new THREE.Mesh(lampGeometry, lampMaterial);

        return lamp;
    }
};
