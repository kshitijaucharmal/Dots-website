class Dot{
    constructor(){
        this.size = 4;
        this.speed = 0.8;
        this.lifetime = 5 * 60;
        this.ctr = 0;
        this.fitness = 0;

        this.pos = createVector(width/2, height - 20);
        this.vel = createVector();
        this.acc = createVector();

        this.genes = [];
        for(let i = 0; i < this.lifetime; i++){
            this.genes[i] = createVector(int(random(-2, 2)), int(random(-2, 2))).mult(this.speed);
        }

        this.dead = false;
    }

    show(){
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    }

    update(){
        this.acc = this.genes[this.ctr++];
        this.vel.add(this.acc);
        this.vel.limit(10);
        this.pos.add(this.vel);

        // Check if dead
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > width){
            this.dead = true;
        }
        if (this.ctr >= this.lifetime){
            this.dead = true;
        }
    }

    reset(){
        // Actual resetting
        this.pos = createVector(width/2, height - 20);
        this.vel = createVector();
        this.acc = createVector();
        this.ctr = 0;
        this.fitness = 0; // Don't need this cause directly assigning in calculate_fitness
        
        this.dead = false;
    }

    calculate_fitness(target){
        let x = target.x - this.pos.x;
        let y = target.y - this.pos.y;
        let res = Math.sqrt(x*x + y*y);
        this.fitness = res;
    }

    mutate(){
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < mutation_rate){
                this.genes[i] = createVector(int(random(-2, 2)), int(random(-2, 2))).mult(this.speed);
            }
        }
    }

    clone(){
        let clone = new Dot();
        clone.genes = this.genes.slice();
        return clone;
    }

    crossover(partner){
        let child = null;
        if(random(1) < 0.5){
            child = this.clone();
        }
        else{
            child = partner.clone();
        }
        return child;
    }

}
