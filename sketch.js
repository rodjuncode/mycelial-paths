let m1;
let m2;
let m3;
let mycelia = []
let nutrients = [];
let nutrientsQty1 = 1500;
let nutrientsQty2 = 25;
let nutrientRadius = 50;
let maxDistance = 100;
let minDistance = 10;

function setup() {
    createCanvas(500,500);
    
    // organize the nutrients map
    for (let i = 0; i < nutrientsQty1; i++) {
        let p = createVector(random(100,400), random(100,400));
        if (p5.Vector.dist(createVector(width/2,height/2),p) < nutrientRadius) {
            nutrients.push(new Nutrient(p));
        }
    }

    for (let i = 0; i < nutrientsQty2; i++) {
         let p = createVector(random(100,400), random(100,400));
         nutrients.push(new Nutrient(p));
     }

    let m = new Mycelia(createVector(width/2,height/2),nutrients,color(0));
    mycelia.push(m);
    for (let i = 1; i < 3; i++) {
        let m = new Mycelia(createVector(width/2,height/2),nutrients,color(random(100)));
        mycelia.push(m);
    }

    // m1 = new Mycelia(createVector(width/2,height/2),nutrients,color(random(220)));
    // m2 = new Mycelia(createVector(width/2,height/2),nutrients,color(200));
    // m3 = new Mycelia(createVector(width/2,height/2),nutrients,color(150));
    
}

function draw() {
    background(color(62,50,75));
    background(255);

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].show();
    }

    for (let i = 0; i < mycelia.length; i++) {
        mycelia[i].show();
        mycelia[i].grow();
    }

    // m1.show();
    // m2.show();
    // m3.show();
    // m1.grow();
    // m2.grow();
    // m3.grow();
 
}