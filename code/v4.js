const { randInRange, randIntInRange, catmullRom } = blotToolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

function drawGrid(stepSize) {
  const lines = [];

  for (let y = 0; y <= height; y += stepSize) {
    lines.push([
      [0, y],
      [y, width]
    ]);
  }

  for (let x = 0; x <= width; x += stepSize) {
    lines.push([
      [x, 0],
      [height, x]
    ]);
  }

  return lines;
}


function drawSpiral(centerX, centerY, spacing, numRotations) {
  const spiralSegments = [];
  let angle = 0;
  let previousX = centerX;
  let previousY = centerY;

  for (let i = 0; i < numRotations; i++) {
    const newX = centerX + (i * spacing) * Math.sin(angle);
    const newY = centerY + (i * spacing) * Math.cos(angle);

    spiralSegments.push([
      [previousX, previousY],
      [newX, newY]
    ]);

    previousX = newX;
    previousY = newY;

    angle += Math.PI / randIntInRange(2, 10);
  }

  return spiralSegments;
}
/////////////////////////////////////// WIP
function points(numPoints, offsetX, offsetY) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([
      offsetX + 5 * Math.sin(5 * i),
      offsetY + 5 * Math.cos(5 * i)
    ]);
  }
  return points;
}

for (let i = 0; i < 50; i++) {
  const offsetX = randIntInRange(, );
  const offsetY = randIntInRange(, );

  const curves = catmullRom(points(30, offsetX, offsetY), 100);

  finalLines.push(curves);
}
///////////////////////////////////////
const spiralLines = drawSpiral(width / 2, height / 2, .25, 150);
finalLines.push(...spiralLines);

const gridLines = drawGrid(5);
finalLines.push(...gridLines);

drawLines(finalLines);