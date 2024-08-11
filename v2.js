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
    const newX = centerX + (i * spacing) * Math.cos(angle);
    const newY = centerY + (i * spacing) * Math.sin(angle);

    spiralSegments.push([
      [previousX, previousY],
      [newX, newY]
    ]);

    previousX = newX;
    previousY = newY;

    angle += Math.PI / 6;
  }

  return spiralSegments;
}

const spiralLines = drawSpiral(width / 2, height / 2, .5, 75);
finalLines.push(...spiralLines);

const gridLines = drawGrid(5);
finalLines.push(...gridLines);

drawLines(finalLines);