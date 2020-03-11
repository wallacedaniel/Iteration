
// Stochastic Tree
// Renders a simple tree-like structure via recursion
// Angles and number of branches are random
//
// function setup() {
//   var test = createP('Click mouse to generate a new tree');
//   test.position(10,372);
//
//   createCanvas(640, 360);
//   newTree();
// }
//
// function draw() {
//   noLoop();
// }
//
// function mousePressed() {
//   newTree();
//   //redraw();
// }
//
// function newTree() {
//   background(51);
//
//   stroke(255);
//   push();
//   // Start the tree from the bottom of the screen
//   translate(width/2, height);
//   // Start the recursive branching!
//   branch(120);
//   pop();
// }
//
//
//
// function branch(h) {
//   // thickness of the branch is mapped to its length
//   var sw = map(h, 2, 120, 1, 5);
//   strokeWeight(sw);
//   // Draw the actual branch
//   line(0, 0, 0, -h);
//   // Move along to end
//   translate(0, -h);
//
//   // Each branch will be 2/3rds the size of the previous one
//   h *= 0.66;
//
//   // All recursive functions must have an exit condition!!!!
//   // Here, ours is when the length of the branch is 2 pixels or less
//   if (h > 2) {
//     // A random number of branches
//     var n = Math.floor(random(1, 4));
//     for (var i = 0; i < n; i++) {
//       // Picking a random angle
//       var theta = random(-PI/3, PI/3);
//       push();      // Save the current state of transformation (i.e. where are we now)
//       rotate(theta);     // Rotate by theta
//       branch(h);         // Ok, now call myself to branch again
//       pop();       // Whenever we get back here, we "pop" in order to restore the previous matrix state
//     }
//   }
// }



// another TREE

//
// Stochastic Tree with angles fluctuating with Perlin noise
// Nature of Code, Chapter 8
//
// // Perlin noise offset
// let yoff = 0;
// // Random seed to control randomness while drawing the tree
// let seed = 5;
//
//
// function setup() {
//   createCanvas(640, 360);
// }
//
// function draw() {
//   background(255);
//   fill(0);
//   //text("Click mouse to generate a new tree", 10, height-20);
//
//   stroke(0);
//   // Start the tree from the bottom of the screen
//   translate(width/2, height);
//   // Move alogn through noise
//   yoff += 0.005;
//   randomSeed(seed);
//   // Start the recursive branching!
//   branch(60, 0);
// }
//
//
// function mousePressed() {
//   // New tree starts with new noise offset and new random seed
//   yoff = random(1000);
//   seed = millis();
// }
//
//
// function branch(h, xoff) {
//   // thickness of the branch is mapped to its length
//   let sw = map(h, 2, 100, 1, 5);
//   strokeWeight(sw);
//   // Draw the branch
//   line(0, 0, 0, -h);
//   // Move along to end
//   translate(0, -h);
//
//   // Each branch will be 2/3rds the size of the previous one
//   h *= 0.7;
//
//   // Move along through noise space
//   xoff += 0.1;
//
//   if (h > 4) {
//     // Random number of branches
//     let n = floor(random(0, 5));
//     for (let i = 0; i < n; i++) {
//
//       // Here the angle is controlled by perlin noise
//       // This is a totally arbitrary way to do it, try others!
//       let theta = map(noise(xoff+i, yoff), 0, 1, -PI/3, PI/3);
//       if (n % 2 == 0) theta *= -1;
//
//       push();      // Save the current state of transformation (i.e. where are we now)
//       rotate(theta);     // Rotate by theta
//       branch(h, xoff);   // Ok, now call myself to branch again
//       pop();       // Whenever we get back here, we "pop" in order to restore the previous matrix state
//     }
//   }
// }
//
//
//
//
//





// TREE
// Renders a simple tree-like structure via recursion
// Branching angle calculated as a function of horizontal mouse position
//
// var theta;
//
// function setup() {
//   createCanvas(640, 360);
// }
//
// function draw() {
//   background(51);
//   // Let's pick an angle 0 to 90 degrees based on the mouse position
//   theta = map(mouseX,0,width,0,PI/2);
//
//   // Start the tree from the bottom of the screen
//   translate(width/2, height);
//   stroke(255);
//   branch(120);
// }
//
// function branch(len) {
//   // Each branch will be 2/3rds the size of the previous one
//
//   //float sw = map(len,2,120,1,10);
//   //strokeWeight(sw);
//   strokeWeight(2);
//
//   line(0, 0, 0, -len);
//   // Move to the end of that line
//   translate(0, -len);
//
//   len *= 0.66;
//   // All recursive functions must have an exit condition!!!!
//   // Here, ours is when the length of the branch is 2 pixels or less
//   if (len > 2) {
//     push();    // Save the current state of transformation (i.e. where are we now)
//     rotate(theta);   // Rotate by theta
//     branch(len);       // Ok, now call myself to draw two new branches!!
//     pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
//
//     // Repeat the same thing, only branch off to the "left" this time!
//     push();
//     rotate(-theta);
//     branch(len);
//     pop();
//   }
// }
//
//




// cantor set

// function setup() {
//   createCanvas(800, 200);
//   background(51);
//
//   // Call the recursive function
//   cantor(35, 0, 730);
// }
//
// function draw() {
  // No need to loop
//   noLoop();
// }
//
//
// function cantor(x, y, len) {
//
//   var h = 30;
//
//   // recursive exit condition
//   if (len >= 1) {
//     // Draw line (as rectangle to make it easier to see)
//     noStroke();
//     fill(255);
//     rect(x, y, len, h/3);
//     // Go down to next y position
//     y += h;
//     // Draw 2 more lines 1/3rd the length (without the middle section)
//     cantor(x, y, len/3);
//     cantor(x+len*2/3, y, len/3);
//   }
// }


// recursive


//
// function setup() {
//   createCanvas(640,360);
// }
//
// function draw() {
//   background(51);
//   drawCircle(width/2,height/2,width);
//   noLoop();
// }
//
// // Very simple function that draws one circle
// // and recursively calls itself
// function drawCircle(x,y,r) {
//   stroke(255);
//   noFill();
//   ellipse(x, y, r, r);
//   // Exit condition, stop when radius is too small
//   if(r > 2) {
//     r *= 0.75;
//     // Call the function inside the function! (recursion!)
//     drawCircle(x, y, r);
//   }
// }
//



function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);
  drawCircle(width/2, height/2, 400);
  noLoop();
}

function drawCircle(x, y, radius) {
  noFill();
  stroke(255);
  ellipse(x, y, radius, radius);
  if (radius > 8) {
    // Four circles! left right, up and down
    drawCircle(x + radius/2, y, radius/2);
    drawCircle(x - radius/2, y, radius/2);
    drawCircle(x, y + radius/2, radius/2);
    drawCircle(x, y - radius/2, radius/2);
  }
}






// function setup() {
//   createCanvas(640,360);
// }
//
// function draw() {
//   background(51);
//   drawCircle(width/2,height/2,400);
//   noLoop();
// }
//
// // Recursive function
// function drawCircle(x,y,r) {
//   stroke(255);
//   noFill();
//   ellipse(x, y, r, r);
//   if(r > 2) {
//     // Now we draw two more circles, one to the left
//     // and one to the right
//     drawCircle(x + r/2, y, r/2);
//     drawCircle(x - r/2, y, r/2);
//   }
// }
//














// wave

// let startAngle = 0;
// let angleVel = 0.23;
//
// function setup() {
//   createCanvas(640, 360);
// }
//
// function draw() {
//   background(51);
//
//   startAngle += 0.015;
//   let angle = startAngle;
//
//   for (let x = 0; x <= width; x += 24) {
//     let y = map(sin(angle), -1, 1, 0, height);
//     stroke(164);
//     fill(255, 50);
//     strokeWeight(2);
//     ellipse(x, y, 48, 48);
//     angle += angleVel;
//   }
// }







//   sine
//
// let angle = 0;         // shift
// let angleVel = 0.1;    // frequency
//
// function setup() {
//   createCanvas(600, 400);
//   background(51);
//   stroke(255);
//   strokeWeight(2);
//   fill(125);
//
//   beginShape();
//   for (let x = 0; x <= width; x += 1) {    // tightness     tightness / frequency - relate - push n pull
//     let y = map(sin(angle), -1, 1, height * .33, height * .66);   //   top bounds - bottom bounds
//     vertex(x, y);
//     angle += angleVel;
//   }
//   vertex(width,height);
//   vertex(0,height);
//   endShape();
// }










// Additive Wave
// Create a more complex wave by adding two waves together.

// Maybe better for this answer to be OOP???
//
// let xspacing = 8; // How far apart should each horizontal position be spaced
// let w; // Width of entire wave
// let maxwaves = 5; // total # of waves to add together
//
// let theta = 0.0;
// let amplitude = []; // Height of wave
// let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
// let yvalues; // Using an array to store height values for the wave (not entirely necessary)
//
// function setup() {
//   createCanvas(640, 360);
//   colorMode(RGB, 255, 255, 255, 100);
//   w = width + 16;
//
//   for (let i = 0; i < maxwaves; i++) {
//     amplitude[i] = random(10, 30);
//     let period = random(100, 300); // How many pixels before the wave repeats
//     dx[i] = (TWO_PI / period) * xspacing;
//   }
//
//   yvalues = [];
// }
//
// function draw() {
//   background(51);
//   calcWave();
//   renderWave();
// }
//
// function calcWave() {
//   // Increment theta (try different values for 'angular velocity' here
//   theta += 0.02;
//
//   // Set all height values to zero
//   for (let i = 0; i < w / xspacing; i++) {
//     yvalues[i] = 0;
//   }
//
//   // Accumulate wave height values
//   for (let j = 0; j < maxwaves; j++) {
//     let x = theta;
//     for (let i = 0; i < yvalues.length; i++) {
//       // Every other wave is cosine instead of sine
//       if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
//       else yvalues[i] += cos(x) * amplitude[j];
//       x += dx[j];
//     }
//   }
// }
//
// function renderWave() {
//   // A simple way to draw the wave with an ellipse at each position
//   noStroke();
//   fill(255, 100);
//   ellipseMode(CENTER);
//   for (let x = 0; x < yvalues.length; x++) {
//     ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
//   }
// }
