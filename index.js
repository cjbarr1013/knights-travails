import some from 'lodash/some.js';
import isEqual from 'lodash/isEqual.js';

class Vertex {
  constructor(coordinates, path) {
    this.coordinates = coordinates;
    this.path = path;
  }
}

function knightMoves(start, end) {
  // Check if both coordinates are the same
  if (start[0] === end[0] && start[1] === end[0]) {
    return printMoves([start]);
  }

  // Check for valid coordinates
  if (!isValid(start[0], start[1]) || !isValid(end[0], end[1])) {
    console.log('Invalid coordinates provided.');
  }

  let queue = [];
  let newPaths = [];
  let visited = [];
  queue.push(new Vertex(start, [start]));

  // Use level order traversal (BFS) on implicit graph
  while (queue.length > 0 && !isArrayPresent(newPaths, end)) {
    const visitedCoords = visited.map((vertex) => vertex.coordinates);
    const currentVertex = queue[0];
    newPaths = potentialPaths(currentVertex.coordinates);
    for (let i = 0; i < newPaths.length; i++) {
      const coords = newPaths[i];
      if (!isArrayPresent(visitedCoords, coords)) {
        queue.push(new Vertex(coords, [...currentVertex.path, coords]));
      }
    }
    visited.push(queue.shift());
  }

  // Take path of last visted vertex and add ending coordinates
  let finalPath = visited.at(-1).path;
  finalPath.push(end);
  return printMoves(finalPath);
}

function potentialPaths(vertex) {
  const x = vertex[0];
  const y = vertex[1];
  const potentialMoves = [1, 2, -1, -2];

  let potentialPaths = [];
  potentialMoves.forEach((dx) => {
    potentialMoves.forEach((dy) => {
      if (Math.abs(dx) !== Math.abs(dy)) {
        const newX = x + dx;
        const newY = y + dy;
        if (isValid(newX, newY)) {
          potentialPaths.push([newX, newY]);
        }
      }
    });
  });

  return potentialPaths;
}

function isValid(x, y) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function isArrayPresent(arr, target) {
  return some(arr, (innerArray) => isEqual(innerArray, target));
}

function printMoves(arr) {
  console.log(`You made it in ${arr.length - 1} moves! Here's your path:`);
  arr.forEach((coordinate) => console.log(coordinate));
}

// Testing
knightMoves([3, 3], [3, 3]);
knightMoves([4, 8], [0, 3]);

knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 3]);
knightMoves([4, 7], [1, 1]);
knightMoves([3, 1], [7, 0]);
