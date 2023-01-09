class Wall{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show(){
        push();
        strokeWeight(4);
        stroke(255);
        noFill();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    collide(dot){
        if (dot.pos.x > this.x && dot.pos.x < this.x + this.w && dot.pos.y > this.y && dot.pos.y < this.y + this.h){
            return true;
        }
        return false;
    }
}
