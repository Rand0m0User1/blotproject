const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

function drawGrid(step) {
  const lines = [];

  for (let x = 0; x <= width; x += step) {
    lines.push([
      [x, 0],
      [x, height]
    ]);
  }

  for (let y = 0; y <= height; y += step) {
    lines.push([
      [0, y],
      [width, y]
    ]);
  }

  return lines;
}

const gridLines = drawGrid(5);
finalLines.push(...gridLines);

drawLines(finalLines, { stroke: '#FF00FF'});