function Nutrient(position) {
    this.position = position;
    this.eaten = false;

    this.show = function(where) {
        if (where == null) {
            where = parent;
        }
        where.noStroke();
        where.ellipse(this.position.x,this.position.y,5,5);
    }

}