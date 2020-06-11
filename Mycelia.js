function Mycelia(position,nutrients,color) {
    this.position = position;
    this.nutrients = nutrients;
    this.hyphae = [];
    this.color = color;
    
    // set the spore
    this.spore = new Hypha(position,null,createVector(random(-1,1),random(-1,1)).normalize(),this.color);
    this.hyphae.push(this.spore);

    // starts the culture
    let current = this.spore;
    let found_nutrient = false;
    let t = 0;
    while(!found_nutrient) {
        for (let i = 0; i < this.nutrients.length; i++) {
            let d = p5.Vector.dist(current.position, this.nutrients[i].position);
            if (d < maxDistance) {
                found_nutrient = true;
                break;
            }
        }
        if (!found_nutrient) {
            let h = current.next();
            current = h;
            this.hyphae.push(h);

        }
        t++;
    }        

    this.grow = function() {
        
        for (let i = 0; i < this.nutrients.length; i++) {
            let nutrient = this.nutrients[i]
            let closestHypha = null; 
            let record = 10000;
            for (let j = 0; j < this.hyphae.length; j++) {
                let hypha = this.hyphae[j];
                let d = p5.Vector.dist(nutrient.position, hypha.position);
                if (d < minDistance) { // mycelia found a nutrient
                    nutrient.eaten = true;
                    break;
                } else if (d > maxDistance) {
                    // do nothing! This is weird, need to check it out later
                } else if (d < record) {
                    closestHypha = hypha;
                    record = d;
                }
            }
            if (closestHypha != null) { // there is a hypha close enough to a nutrient
                console.log(closestHypha);
                let newDirection = p5.Vector.sub(nutrient.position,closestHypha.position).normalize();
                closestHypha.direction.add(newDirection);
                closestHypha.count++;
            }

            for (let i = this.nutrients.length-1; i >= 0; i--) {
                if (this.nutrients[i].eaten) {
                    this.nutrients.splice(i,1);
                }
            }

            for (let i = this.hyphae.length-1; i >= 0; i--) {
                let hypha = this.hyphae[i];
                if (hypha.count > 0) {
                    hypha.direction.div(hypha.count);
                    let newHypha = hypha.next();
                    this.hyphae.push(newHypha);
                }
                hypha.reset();
            }

        }
    }

    this.show = function() {
        for (let i = 1; i < this.hyphae.length; i++) {
            push();
            fill(this.color);
            this.hyphae[i].show();
            pop();
        }
        push();
        noStroke();
        fill(225);
        //ellipse(this.spore.position.x,this.spore.position.y,40,40);
        pop();
    }

}