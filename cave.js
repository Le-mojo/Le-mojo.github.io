const gridSize = 4; // 4x4 grid
let grid;
let trapIndices = [5, 10, 14]; // Example trap positions
let treasureIndex = 0; // Top left cell as the treasure
let playerPosition = gridSize * gridSize - 1; // Bottom-right cell as the start
let treasureFound = false;


function createGrid() {
    grid = document.getElementById('caveGridTable');
    console.log("Creating grid...");
    for (let i = 0; i < gridSize; i++) {
        let row = grid.insertRow();
        for (let j = 0; j < gridSize; j++) {
            let cellIndex = i * gridSize + j;
            let cell = row.insertCell();
            cell.id = 'cell-' + cellIndex;
            cell.classList.add('cell');
            if (cellIndex === playerPosition) {
                cell.classList.add('start-cell');
                cell.textContent = 'Start'; // Label the start cell
            } else if (cellIndex === treasureIndex) {
                cell.classList.add('end-cell');
                cell.textContent = 'End'; // Label the end cell
            }
        }
    }
    enableAdjacentCells(playerPosition); // Enable cells adjacent to the start position
}
function enableAdjacentCells(position) {
    disableAllCells();
    let adjacentPositions = getAdjacentPositions(position);
    adjacentPositions.forEach(function(pos) {
        let cell = document.getElementById('cell-' + pos);
        if (cell) {
            cell.onclick = function() { checkCell(pos); };
        }
    });
}

function getAdjacentPositions(position) {
    let positions = [];
    if (position % gridSize !== 0) positions.push(position - 1); // Left
    if (position % gridSize !== gridSize - 1) positions.push(position + 1); // Right
    if (position >= gridSize) positions.push(position - gridSize); // Above
    if (position < gridSize * (gridSize - 1)) positions.push(position + gridSize); // Below
    return positions.filter(pos => !document.getElementById('cell-' + pos).classList.contains('selected-cell'));
}

function disableAllCells() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.getElementById('cell-' + i);
        if (cell) {
            cell.onclick = null;
        }
    }
}

// Check the clicked cell
function checkCell(index) {
    if (trapIndices.includes(index)) {
        window.location.href = 'trap.html';
    } else if (index === treasureIndex) {
        treasureFound = true;
        window.location.href = 'treasure-room.html';
    } else {
        let cell = document.getElementById('cell-' + index);
        cell.classList.add('selected-cell');
        cell.textContent = '✓';
        playerPosition = index;
        if (!treasureFound) {
            enableAdjacentCells(index);
        }
    }
}
// Call the function to create the grid
createGrid();
