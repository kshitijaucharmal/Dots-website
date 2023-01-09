class Population{
    constructor(pop_len){
        this.pop_len = pop_len;
        this.population = [];
        this.target = createVector(width/2, 20);

        // Initialize population
        for(let i = 0; i < this.pop_len; i++){
            this.population[i] = new Dot();
        }
    }

    update(){
        // Update if not dead
        this.population.forEach(dot => {
            if (!dot.dead) dot.update(this.target);
        });
    }

    reset(){
        // Calculate fitness values
        this.population.forEach(dot => {
            dot.calculate_fitness(this.target);
        });

        // Sort based on fitness (closest to target at start)
        this.sort();

        // Crossover (Just cloning right now)
        for(let i = 0; i < this.pop_len; i++){
            let parent1 = this.population[int(random(0, this.pop_len / 5))];
            let parent2 = this.population[int(random(0, this.pop_len / 5))];

            this.population[i] = parent1.crossover(parent2);
        }

        // Mutate to introduce some randomness
        this.mutate();
        
        // Reset Every Dot
        this.population.forEach(dot => {
            dot.reset();
        });
    }

    collide(walls){
        // Collision with walls
        this.population.forEach(dot => {
            walls.forEach(wall => {
                if (wall.collide(dot)){
                    dot.dead = true;
                }
            });
        });
    }

    show(){
        // Show Target
        push();
        stroke(255, 0, 0);
        strokeWeight(4);
        noFill();
        circle(this.target.x, this.target.y, 16);
        pop();

        // Show Population
        this.population.forEach(dot => {
            dot.show();
        });
    }

    allDead(){
        let ad = true;
        this.population.forEach(dot => {
            if (!dot.dead){
                ad = false;
            }
        });
        return ad;
    }

    sort(){
        for(let i = 0; i < this.pop_len; i++){
            for(let j = i; j < this.pop_len; j++){
                if (this.population[i].fitness > this.population[j].fitness){
                    let temp = this.population[i];
                    this.population[i] = this.population[j];
                    this.population[j] = temp;
                }
            }
        }
    }

    crossover(){
        for(let i = 0; i < this.population.length; i++){
            let parent1 = this.population[int(random(0, this.pop_len / 2))];
            let parent2 = this.population[int(random(0, this.pop_len / 2))];

            let child = parent1.crossover(parent2);
            this.population[i] = child;
        }
    }

    mutate(mr){
        this.population.forEach(dot => {
            dot.mutate();
        })
    }
}
