function Hypha(position,parent,direction,color) {
    this.position = position;
    this.parent = parent;
    this.direction = direction;
    this.originalDirection = this.direction.copy();
    this.count = 0;
    this.color = color;
    this.length = 1;

    this.reset = function() {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    this.show = function() {
        if (this.parent != null) {
            push();
            stroke(this.color);
            strokeWeight(0.5);
            line(this.position.x,this.position.y,this.parent.position.x,this.parent.position.y);
            pop();
        }
    }

    this.next = function() {
        let nextDirection = p5.Vector.mult(this.direction,this.length);
        //let newPosition = p5.Vector.add(this.position,this.direction); // original
        let newPosition = p5.Vector.add(this.position,nextDirection);
        //newPosition.mult(0.5);
        let nextHypha = new Hypha(newPosition,this,this.direction.copy(),this.color);
        return nextHypha;
    }
}