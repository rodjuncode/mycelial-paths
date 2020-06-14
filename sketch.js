let mycelia = []
let nutrients = [];
let nutrientsQty1 = 200000;
let nutrientsQty2 = 500;
let nutrientRadius = 30;
let maxDistance = 200;
let minDistance = 2;

let myceliaQty = 1;

let c = 0;
let center;

let max = 100;

function setup() {
    createCanvas(600,360);
    center = createVector(0,0);
    culture(center);
}

function draw() {
    background(color(62,50,75));
    translate(mouseX,mouseY);
    
    // for (let i = 0; i < myceliaQty; i++) {
    //     for (let j = 0; j < nutrients[i].length; j++) {
    //         nutrients[i][j].show();
    //     }
    // }

    if (c < 50) {
        for (let i = 0; i < mycelia.length; i++) {
            mycelia[i].show();
            mycelia[i].grow();
        }
    } else {
        //cursor.add(createVector(5,0));
        center = createVector(0,0);
        //center = createVector(width/2,height/2);
        //center = createVector(width/2,height/2);
        culture(center);        
        c = 0;
    }

    c++;

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
    let m = new Mycelia(where,nutrients[0],color(255));
    mycelia.push(m);
    for (let i = 1; i < myceliaQty; i++) {
        let m = new Mycelia(where,nutrients[i],color(random(220,255)));
        mycelia.push(m);
    }
}