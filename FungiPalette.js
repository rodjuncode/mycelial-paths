function FungiPalette(colors,baseColor) {
    this.colors = colors;
    this.baseColor = baseColor;

    this.get = function(index) {
        console.log(index + " : " + this.colors[index % this.colors.length]);
        return this.colors[index % this.colors.length];

    }

    this.getBaseColor = function() {
        return baseColor;
    }

    this.size = function() {
        return this.colors.length;
    }

    this.add = function(color) {
        this.colors.push(color);
    }

    this.random = function() {
        return this.colors[floor(random(this.colors.length-1))];
    }

}