function Nutrient(position) {
    this.position = position;
    this.eaten = false;

    this.show = function() {
        ellipse(this.position.x,this.position.y,5,5);
    }

}