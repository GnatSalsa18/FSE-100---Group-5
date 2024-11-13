let targetShape; // to store the properties of the target shape
let drawnPoints = []; // to store the user's drawn points

function setup() {
  createCanvas(400, 400);
  background(200);
  strokeWeight(10);
  colorMode(RGB);
  stroke("black");

  // Draw outer black rectangle
  fill("black");
  rect(100, 100, 200, 200);

  // Draw inner white rectangle
  fill("white");
  rect(110, 110, 180, 180);

  // Store properties of the outer and inner rectangles
  targetShape = {
    outer: { x: 100, y: 100, width: 200, height: 200 },
    inner: { x: 110, y: 110, width: 180, height: 180 }
  };
}

function mouseDragged() {
  stroke(0, 255, 0);
  line(pmouseX, pmouseY, mouseX, mouseY);
  drawnPoints.push({ x: mouseX, y: mouseY }); // store drawn points
}

function mouseReleased() {
  let accuracy = calculateAccuracy();
  displayFeedback(accuracy);
}

function calculateAccuracy() {
  let correctPoints = 0;
  for (let point of drawnPoints) {
    // Check if point is within the outer black rectangle
    let withinOuterRect = 
      point.x >= targetShape.outer.x && 
      point.x <= targetShape.outer.x + targetShape.outer.width &&
      point.y >= targetShape.outer.y && 
      point.y <= targetShape.outer.y + targetShape.outer.height;

    // Check if point is outside the inner white rectangle
    let outsideInnerRect = 
      point.x < targetShape.inner.x || 
      point.x > targetShape.inner.x + targetShape.inner.width ||
      point.y < targetShape.inner.y || 
      point.y > targetShape.inner.y + targetShape.inner.height;

    // If the point is within the black border area, count it as correct
    if (withinOuterRect && outsideInnerRect) {
      correctPoints++;
    }
  }

  // Calculate accuracy as a percentage of correctly drawn points
  return (correctPoints / drawnPoints.length) * 100;
}

function displayFeedback(accuracy) {
  background(200);

  // Draw the original black and white rectangles
  fill("black");
  rect(targetShape.outer.x, targetShape.outer.y, targetShape.outer.width, targetShape.outer.height);
  fill("white");
  rect(targetShape.inner.x, targetShape.inner.y, targetShape.inner.width, targetShape.inner.height);
  
  // Optionally, redraw the user's drawn line for visual feedback
  stroke(0, 255, 0);
  for (let i = 1; i < drawnPoints.length; i++) {
    line(drawnPoints[i - 1].x, drawnPoints[i - 1].y, drawnPoints[i].x, drawnPoints[i].y);
  }
  
  // Display the accuracy text on top
  strokeWeight(0);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Accuracy: ${accuracy.toFixed(2)}%`, width / 2, height / 2);
}






