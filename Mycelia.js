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
    while(!found_nutrient) {
        for (let i = 0; i < this.nutrients.length; i++) {
            let d = p5.Vector.dist(current.position, this.nutrients[i].position);
            if (d < maxDistance) {
                found_nutrient = true;
            }
        }
        if (!found_nutrient) {
            let h = current.next();
            current = h;
            this.hyphae.push(current);

        }
    }        

    this.grow = function() {
        
        for (let i = 0; i < this.nutrients.length; i++) {
            let nutrient = this.nutrients[i]
            let closestHypha = null; 
            let record = maxDistance;
            for (let j = 0; j < this.hyphae.length; j++) {
                let hypha = this.hyphae[j];
                let d = p5.Vector.dist(nutrient.position, hypha.position);
                if (d < minDistance) { // mycelia found a nutrient
                    nutrient.eaten = true;
                    closestHypha = null;
                    break;
                } else if (d < record) {
                    closestHypha = hypha;
                    record = d;
                }
            }
            if (closestHypha != null) { // there is a hypha close enough to a nutrient
                // steering
                let newDirection = p5.Vector.sub(nutrient.position,closestHypha.position).normalize(); // original
                //let newDirection = p5.Vector.sub(nutrient.position,closestHypha.position);
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
                    hypha.direction.div(hypha.count+1);
                    this.hyphae.push(hypha.next());
                    hypha.reset();
                }
                // hypha.reset(); I've put here, for some reason
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
        fill(255);
        //ellipse(this.spore.position.x,this.spore.position.y,5,5);
        pop();
    }

}