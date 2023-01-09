
let generation = 1;
let walls = [];
let population;
let mutation_rate = 0.01;
let drawing = false;

let startPos;
let endPos;

function setup(){
    // Create canvas
    createCanvas(400, 400);

    population = new Population(500);
    startPos = createVector(0, 0);
    endPos = createVector(0, 0);
}

function draw(){
    background(11);

    // Show Walls
    walls.forEach(wall => {
        wall.show();
    })

    // Draw Walls
    if(drawing){
        push();
        strokeWeight(4);
        stroke(255);
        noFill();
        rect(mouseX, mouseY, startPos.x - mouseX, startPos.y - mouseY);
        pop();
    }

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

    // Help Text
    push();
    text("Tap Once to start drawing, tap again to stop", )
}

function mousePressed(){
    drawing = !drawing;
    if (drawing){
        startPos.set(mouseX, mouseY);
    }else{
        endPos.set(mouseX - startPos.x, mouseY - startPos.y);
        walls[walls.length] = new Wall(startPos.x, startPos.y, endPos.x, endPos.y);
    }
}
