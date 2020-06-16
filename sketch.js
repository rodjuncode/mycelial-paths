let cam;

let p;
let poseNet;
let pose;

let segmentation;
let mask;
let bodyPix;
const bodyPixOptions = {
    outputStride: 16, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5 
}

let mycelia = []
let nutrients = [];
let nutrientsQty1 = 100000;
let nutrientsQty2 = 0;
let nutrientsQtyMouse = 500;
let nutrientsRadiusMouse = 50;
let nutrientRadius = 80;
let maxDistance = 10;
let minDistance = 5;

let palette;

let myceliaQty = 1;

let c = 0;
let center;
let baseColor;

let max = 100;

let nutrientsMask;

function preload() {
	bodyPix = ml5.bodyPix(bodyPixOptions);
}

function setup() {
    createCanvas(600,360);
    colorMode(HSB,360,100,100);

    palette = new FungiPalette([[191, 42, 25],
                                [167, 14, 25],
                                [45, 16, 29],
                                [32, 35, 36],
                                [27, 47, 44],
                                [26, 56, 51],
                                [25, 62, 58],
                                [24, 67, 65],                            
                                [24, 71, 72],                    
                            ],  [196, 70, 26]);

    palette = new FungiPalette([[57, 63, 100],
        [55, 66, 100],
        [53, 69, 100],
        [51, 73, 100],
        [49, 76, 100],
        [47, 76, 100],
        [45, 76, 100],
        [42, 75, 99],                            
        [41, 77, 99], 
        [40, 80, 99]                   
    ],  [120, 4, 21]);



	// cam = createCapture(VIDEO);
	// cam.size(width, height);
    // cam.hide();
    
	// // poseNet = ml5.poseNet(cam);
	// // poseNet.on('pose', gotPoses);    

    center = createVector(0,0);
    culture(center);

    // createSimplePalette();
    // bodyPix.segmentWithParts(cam, gotSegmentation, bodyPixOptions);

    

    nutrientsMask = createGraphics(width,height);


}

function draw() {

    background(palette.getBaseColor());

    //image(cam,0,0);

    //image(nutrientsMask,0,0);

    translate(0, 0);

    for (let i = 0; i < myceliaQty; i++) {
        for (let j = 0; j < nutrients[i].length; j++) {
            nutrients[i][j].show(nutrientsMask);
        }
    }


    translate(width/2,height/2);

	// if (pose) {
	// 	translate(pose.nose.x, pose.leftEye.y);
	// }

    // if (segmentation != null) {
    //     image(segmentation.partMask,0,0,width,height);
    //     //image(segmentation.backgroundMask,0,0,width,height);
        

    // }
    

    //if (c < 50) {
        for (let i = 0; i < mycelia.length; i++) {
            mycelia[i].show();
            mycelia[i].grow();
        }
    // } else {
    //     center = createVector(0,0);
    //     //center = createVector(width/2,height/2);
    //     //center = createVector(width/2,height/2);
    //     culture(center);        
    //     c = 0;
    // }

    // c++;
    //console.log(mycelia[0].hyphae.length);

}

function culture(where) {
    // organize the nutrients map
    nutrients = [];
    for (let j = 0; j < myceliaQty; j++) {
        let newNutrients = [];
        for (let i = 0; i < nutrientsQty1; i++) {
            let p = createVector(random(-width,width), random(-height,height));
            if (p5.Vector.dist(where,p) < nutrientRadius) {
                newNutrients.push(new Nutrient(p));
            }
        }
        for (let i = 0; i < nutrientsQty2; i++) {
            let p = createVector(random(-width,width), random(-height,height));
            if (p5.Vector.dist(where,p) < nutrientRadius*6) {
                newNutrients.push(new Nutrient(p));
            }
        }
        nutrients.push(newNutrients);
    }
    mycelia = [];
    // creating multiple mycelia
    let m = new Mycelia(where,nutrients[0],8,palette);
    mycelia.push(m);
    for (let i = 1; i < myceliaQty; i++) {
        let m = new Mycelia(where,nutrients[i],9,pallete);
        mycelia.push(m);
    }
}

function gotPoses(poses) {
	if (poses.length > 0) {
		pose = poses[0].pose;
	}
}   

function gotSegmentation(err, result) {
    if (err) {
        console.log(err)
        return
    }
    
    segmentation = result;

    //image(segmentation.partMask,0,0,width,height);

    //mask = segmentation.partMask;
    //mask = segmentation.personMask;
    //mask = segmentation.backgroundMask
    bodyPix.segmentWithParts(cam, gotSegmentation, bodyPixOptions);
}


function createSimplePalette() {
    bodyPixOptions.palette = bodyPix.config.palette;
    Object.keys(bodyPixOptions.palette).forEach(part => {
        let r, g, b;
        if (part == "leftFace" || part == "rightFace") {
            r = floor(random(255));
            g = floor(random(255));
            b = floor(random(255));
        } else {
            r = 62;
            g = 50;
            b = 75;

        }            
        bodyPixOptions.palette[part].color = [r, g, b]
        
    });
}

function mouseClicked() {

    // 1 dot
    // let n = new Nutrient(createVector(mouseX-width/2, mouseY-height/2));
    // nutrients[0].push(n);
    // console.log(n);

    // 1 cluster
    let where = createVector(mouseX-width/2,mouseY-height/2);
    for (let i = 0; i < nutrientsQtyMouse; i++) {
         let p = createVector(random(mouseX-width/2-nutrientsRadiusMouse,mouseX-width/2+nutrientsRadiusMouse), random(mouseY-height/2-nutrientsRadiusMouse,mouseY-height/2+nutrientsRadiusMouse));
    //     if (p5.Vector.dist(where,p) < nutrientRadius) {
             nutrients[0].push(new Nutrient(p));
    //     }
    }

    // let where = createVector(mouseX,mouseY);
    // nutrientsMask.ellipse(where.x, where.y, 100,100);

}



// TODOs:
//[1] organize code
//[2] improve palette
//[3] integrate with webcam