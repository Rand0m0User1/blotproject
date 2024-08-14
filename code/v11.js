/*
@title: Fragmented Horizon
@author: Aleksander Kurgan
@snapshot: snapshot1.png
*/
const { randInRange, randIntInRange, catmullRom } = blotToolkit;

//freely changeable parameters
const gridSpacing = randIntInRange(5, 10);
const spiralRotations = randIntInRange(50, 200);

//canvas should ideally be a square for best results :)
const width = 125;
const height = 125;

//these shouldn't need changing unless canvas size is increased
//note: 1.75 is a base constant
const minScaling = 0.5;
const maxScaling = 1.0;
const spiralSizing = randInRange(minScaling, maxScaling);
const heightFactor = 1.75 - (spiralSizing - maxScaling);

setDocDimensions(width, height);

const finalLines = [];

function drawGrid(spacing) {
  const lines = [];

  for (let i = 0; i <= width; i += spacing) {
    //sun reflection lines
    lines.push([
      [i, 0],
      [i, height / randIntInRange(10, 20)],
      [width / 2, height / 8]
    ]);

    //left slanted grid
    lines.push([
      [0, i],
      [i / heightFactor, height],
    ]);

    //transformed grid 
    lines.push([
      [width, i],
      [-i / heightFactor + width, height],
    ]);
  }

  return lines;
}

finalLines.push(...drawGrid(gridSpacing));

//draws spiral by segments
function drawSpiral(centerX, centerY, spacing, rotations) {
  const spiralSegments = [];
  let radian = 0;
  let previousX = centerX;
  let previousY = centerY;

  for (let i = 0; i < rotations; i++) {
    //calculates position of next segment in the spiral
    const newX = centerX + (i * spacing) * Math.sin(radian);
    const newY = centerY + (i * spacing) * Math.cos(radian);

    //add the segment from the previous position to the new one
    spiralSegments.push([
      [previousX, previousY],
      [newX, newY]
    ]);

    previousX = newX;
    previousY = newY;

    //increment the angle of the next segment
    radian += Math.PI / randIntInRange(4, 10);
  }

  return spiralSegments;
}

//auto adjusts spacing based on rotations
finalLines.push(...drawSpiral(width / 2, height / heightFactor, .25 * (150 / spiralRotations) * spiralSizing, spiralRotations));

//generates points for catmullrom splines
function pointsGen(numPoints, shiftX, shiftY) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([
      shiftX + 2 * Math.sin(randIntInRange(2, 50) + i),
      shiftY + 2 * Math.cos(randIntInRange(2, 50) + i)
    ]);
  }
  return points;
}

//replicate and arrange catmullrom splines in a circular pattern
for (let i = 0; i < 40; i++) {
  const radian = i / 20 * Math.PI;
  const shiftX = width / 2 + 45 * spiralSizing * Math.cos(radian);
  const shiftY = height / heightFactor + 45 * spiralSizing * Math.sin(radian);
  
  finalLines.push(catmullRom(pointsGen(5, shiftX + randIntInRange(-3, 3), shiftY + randIntInRange(-3, 3))));
}


///////////////////////////////////// WIP!


//mountain range in the horizon
function drawMountains() {
  const mountains = [];
  let previousX = 0;
  let previousY = height / 3.75;

  //uses similar logic to spiral function
  for (let i = 0; i <= 2; i++) {
    let xVal = 0;

    if (i === 1) {
      let xVal = width;
    } else if (i % 3 === 2) {
      let xVal = 0;
    } else {
      let xVal = width;
    }

    for (let x = xVal; x <= width; x += 5) {
      const y = height / 3.75 - randIntInRange(10, 15);
      mountains.push(
        [previousX, previousY],
        [x, y]
      );
      previousX = x;
      previousY = y;
    }
  }

  return mountains;
}

finalLines.push(drawMountains());

//not really algorithmic so ill be using turtle
const t = new bt.Turtle();
t.jump([20, 30]);
t.angle = 90;
t.right(18);
t.arc(-125, 1);
t.jump([20, 30]);
t.angle = 90;
t.left(18);
t.arc(125, 1);

finalLines.push(...t.lines());

drawLines(finalLines);