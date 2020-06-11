function Hypha(position,parent,direction,color) {
    this.position = position;
    this.parent = parent;
    this.direction = direction;
    this.originalDirection = this.direction.copy();
    this.count = 0;
    this.color = color;

    this.reset = function() {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    this.show = function() {
        if (this.parent != null) {
            push();
            stroke(this.color);
            strokeWeight(0.3);
            line(this.position.x,this.position.y,this.parent.position.x,this.parent.position.y);
            pop();
        }
    }

    this.next = function() {
        let newPosition = p5.Vector.add(this.position,this.direction);
        let nextHypha = new Hypha(newPosition,this,this.direction.copy(),this.color);
        return nextHypha;
    }
}