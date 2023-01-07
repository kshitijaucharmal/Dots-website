
let generation = 1;
let walls = [];
let population;
let mutation_rate = 0.01;

function setup(){
    // Create canvas
    createCanvas(400, 400);

    walls[0] = new Wall(50, 50, 20, 300);
    walls[1] = new Wall(width-70, 50, 20, 300);
    walls[2] = new Wall(100, 200, 200, 20);

    population = new Population(100);
}

function draw(){
    background(51);

    // Show Walls
    walls.forEach(wall => {
        wall.show();
    })

    // Update and show
    population.update();
    population.show();

    // If All Dead
    if (population.allDead()){
        generation ++;
        population.reset();
    }

    // Collision
    population.collide(walls);

    // Generation Text
    push();
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255, 50);
    text("Generation : " + generation, width/2, 40);
    pop();

}
