const { randInRange, randIntInRange, catmullRom } = blotToolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

function drawGrid(spacing) {
  const lines = [];

  for (let i = 0; i <= 125; i += spacing) {
    lines.push([
      [i, 0],
      [125, i]
    ]);
    lines.push([
      [0, i],
      [i, 125]
    ]);
  }

  return lines;
}


function drawSpiral(centerX, centerY, spacing, rotations) {
  const spiralSegments = [];
  let radian = 0;
  let previousX = centerX;
  let previousY = centerY;

  for (let i = 0; i < rotations; i++) {
    const newX = centerX + (i * spacing) * Math.sin(radian);
    const newY = centerY + (i * spacing) * Math.cos(radian);

    spiralSegments.push([
      [previousX, previousY],
      [newX, newY]
    ]);

    previousX = newX;
    previousY = newY;

    radian += Math.PI / randIntInRange(2, 10);
  }

  return spiralSegments;
}

function pointsGen(numPoints, shiftX, shiftY) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([
      shiftX + 2 * Math.sin(randIntInRange(1, 2) + i),
      shiftY + 2 * Math.cos(randIntInRange(1, 2) + i)
    ]);
  }
  return points;
}

for (let i = 0; i < 50; i++) {
  const radian = i / 25 * Math.PI;
  const shiftX = width / 2 + 40 * Math.cos(radian);
  const shiftY = height / 2 + 40 * Math.sin(radian);

  finalLines.push(catmullRom(pointsGen(10, shiftX, shiftY), 10));
}

finalLines.push(...drawSpiral(width / 2, height / 2, .25, 150));

finalLines.push(...drawGrid(5));

drawLines(finalLines);