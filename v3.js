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

function points(numPoints) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([
      randInRange(0, width),
      randInRange(0, height)
    ]);
  }
  return points;
}

const curves = catmullRom(points(15), 1000);
finalLines.push(curves);

const spiralLines = drawSpiral(width / 2, height / 2, .25, 150);
finalLines.push(...spiralLines);

const gridLines = drawGrid(5);
finalLines.push(...gridLines);

drawLines(finalLines);