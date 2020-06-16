function Hypha(position,parent,direction,color,palette) {
    this.position = position;
    this.parent = parent;
    this.direction = direction;
    this.originalDirection = this.direction.copy();
    this.count = 0;
    this.color = color;
    this.palette = palette;
    this.length = 5;

    this.reset = function() {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    this.show = function() {
        if (this.parent != null) {
            push();
            stroke(this.palette.get(this.color));
            strokeWeight(2);
            line(this.position.x,this.position.y,this.parent.position.x,this.parent.position.y);
            pop();
        }
    }

    this.next = function() {
        let nextDirection = p5.Vector.mult(this.direction,this.length);
        let newPosition = p5.Vector.add(this.position,nextDirection);
        // let newColor = [
        //     this.color[0]+5 < 360 ? this.color[0]+2 : 0,
        //     100,
        //     100,
        //     this.color[3]];
        let newColor = this.color + 1;
        let nextHypha = new Hypha(newPosition,this,this.direction.copy(),newColor,this.palette);
        return nextHypha;
    }
}