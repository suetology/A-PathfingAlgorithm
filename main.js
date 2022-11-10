let mode = {
    current: "preview",
    preview: "preview",
    obstacles: "obstacles",
    start: "start",
    end: "end"
}

let startPlaced = false;
let endPlaced = false;

let cells = document.querySelectorAll(".cell");

let obstaclesButton = document.querySelector(".obstacles-button");
let startButton = document.querySelector(".start-button");
let endButton = document.querySelector(".end-button");
let findButton = document.querySelector(".find-button");

const placeObstacles = () => {
    resetButtons();

    if(mode.current != mode.obstacles) {

        mode.current = "obstacles";
        obstaclesButton.style.backgroundColor = "grey";

        cells.forEach(cell => {

            let newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);    
            cell = newCell;

            cell.addEventListener("mouseover", () => {
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "grey"; 
                }
            });
            cell.addEventListener("click", () => {
                if(cell.style.backgroundColor == "grey") {
                    cell.style.backgroundColor = "black"; 
                }
            }); 
            cell.addEventListener("mouseout", () => {   
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "whitesmoke";
                }
            });

        }); 
        cells = document.querySelectorAll(".cell");
    } else {
        mode.current = mode.preview;
        obstaclesButton.style.backgroundColor = "white";

        regenerateCells();
    }
}
const placeStart = () => {
    resetButtons();

    if(mode.current != mode.start && !startPlaced) {

        mode.current = mode.start;
        startButton.style.backgroundColor = "grey";

        cells.forEach(cell => {

            let newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);    
            cell = newCell;

            cell.addEventListener("mouseover", () => {
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "grey"; 
                }
            });
            cell.addEventListener("click", () => {
                if(cell.style.backgroundColor == "grey") {
                    cell.style.backgroundColor = "green"; 

                    mode.current = mode.preview;
                    startButton.style.backgroundColor = "white";

                    regenerateCells();
                    startPlaced = true;

                    //startNode = nodeFromId(cell.id);
                }
            }, { once: true }); 
            cell.addEventListener("mouseout", () => {
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "whitesmoke";
                }
            });

        }); 
        cells = document.querySelectorAll(".cell");
    } else {
        mode.current = mode.preview;
        startButton.style.backgroundColor = "white";

        regenerateCells();
    }
}
const placeEnd = () => {
    resetButtons();

    if(mode.current != mode.end && !endPlaced) {

        mode.current = mode.end;
        endButton.style.backgroundColor = "grey";

        cells.forEach(cell => {

            let newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);    
            cell = newCell;

            cell.addEventListener("mouseover", () => {
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "grey"; 
                }
            });
            cell.addEventListener("click", () => {
                if(cell.style.backgroundColor == "grey") {
                    cell.style.backgroundColor = "red"; 

                    mode.current = mode.preview;
                    endButton.style.backgroundColor = "white";

                    regenerateCells();
                    endPlaced = true;

                    //endNode = nodeFromId(cell.id);
                }
            }, { once: true }); 
            cell.addEventListener("mouseout", () => {
                if(cell.style.backgroundColor != "black" &&
                   cell.style.backgroundColor != "green" &&
                   cell.style.backgroundColor != "red" && 
                   cell.style.backgroundColor != "blue" && 
                   cell.style.backgroundColor != "rgb(0, 217, 255)") {
                    cell.style.backgroundColor = "whitesmoke";
                }
            });

        }); 
        cells = document.querySelectorAll(".cell");
    } else {
        mode.current = mode.preview;
        endButton.style.backgroundColor = "white";

        regenerateCells();
    }
}

const resetButtons = () => {
    obstaclesButton.style.backgroundColor = "white";
    startButton.style.backgroundColor = "white";
    endButton.style.backgroundColor = "white";
}

const regenerateCells = () => {
    cells.forEach((cell, i) => {
        cell.id = i;
        
        let newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
        cell = newCell;

        cell.addEventListener("mouseover", () => {
            if(cell.style.backgroundColor != "black" &&
               cell.style.backgroundColor != "green" &&
               cell.style.backgroundColor != "red" && 
               cell.style.backgroundColor != "blue" && 
               cell.style.backgroundColor != "rgb(0, 217, 255)") {
                cell.style.backgroundColor = "grey"; 
            }
        });
        cell.addEventListener("mouseout", () => {
            if(cell.style.backgroundColor != "black" &&
               cell.style.backgroundColor != "green" &&
               cell.style.backgroundColor != "red" && 
               cell.style.backgroundColor != "blue" && 
               cell.style.backgroundColor != "rgb(0, 217, 255)") {
                cell.style.backgroundColor = "whitesmoke";
            }
        });

    });
    cells = document.querySelectorAll(".cell");
}

regenerateCells();

//node
class Node {
    constructor(x, y, walkable, id, parent) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.gCost = 10000;
        this.hCost = 10000;
        this.fCost = this.gCost + this.hCost;
        this.walkable = walkable;
        this.parent = parent;
    }

    equals = (node) => this.id === node.id;
}

var startNode;
var endNode;
//\node

//grid
var grid = [];
const GRID_SIZE_X = 41;
const GRID_SIZE_Y = 18;
const GRID_SIZE = GRID_SIZE_X * GRID_SIZE_Y;

const createGrid = () => {
    grid = [];
    
    for(let x = 0; x < GRID_SIZE_X; x++) {
        grid[x] = [];
        
        for(let y = 0; y < GRID_SIZE_Y; y++) {

            let walkable = cells[x + y * GRID_SIZE_X].style.backgroundColor != "black";

            grid[x].push(new Node(x, y, walkable, x + y * GRID_SIZE_X, null));

            if(cells[x + y * GRID_SIZE_X].style.backgroundColor == "green") {
                startNode = grid[x][y];
            }
            if(cells[x + y * GRID_SIZE_X].style.backgroundColor == "red") {
                endNode = grid[x][y];
            }
        }
    }
}
const getNeigbours = (node) => {
    let neigbours = [];

    for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
            if(x == 0 && y == 0) continue;

            let checkX = node.x + x;
            let checkY = node.y + y;

            if(checkX >= 0 && checkX < GRID_SIZE_X && checkY >= 0 && checkY <GRID_SIZE_Y) {
                neigbours.push(grid[checkX][checkY]);
            }
        }   
    }
    return neigbours;
}
const nodeFromId = (id) => grid[id % GRID_SIZE_X][Math.floor(id / GRID_SIZE_X)];

const getDistance = (nodeA, nodeB) => {
    let distX = Math.abs(nodeA.x - nodeB.x);
    let distY = Math.abs(nodeA.y - nodeB.y);

    if(distX > distY) {
        return distY * 14 + (distX - distY) * 10;
    }
    return distX * 14 + (distY - distX) * 10;
}
const contains = (array, target) => {
    for(let i = 0; i < array.length; i++) {
        if(array[i].equals(target)) {
            return true;
        }
    }
    return false;
}

const checkNeighbours = (node, neigbour, neigbours) => {
    let x = node.x - neigbour.x;
    let y = node.y - neigbour.y;

    return grid[node.x][node.y - y].walkable || grid[node.x - x][node.y].walkable;
}

const findPath = () => {

    createGrid();

    let openSet = [startNode];

    let closedSet = [];

    while(openSet.length > 0) {
        let node = openSet[0];
        
        for(let i = 1; i < openSet.length; i++) {
            if(openSet[i].fCost <= node.fCost) {
                if(openSet[i].hCost < node.hCost) {
                    node = openSet[i];
                }
            }
        }

        closedSet.push(node);

        openSet.forEach((n, i) => {
            if(n.equals(node)) {
                openSet.splice(i, 1);
            }
        });

        if(node.equals(endNode)) {
            retracePath(startNode, endNode);
            return;
        }

        let neigbours = getNeigbours(node);

        neigbours.forEach(neigbour => {
            if(neigbour.walkable && !contains(closedSet, neigbour) && checkNeighbours(node, neigbour, neigbours)) {
                let newNeighbourCost = node.gCost + getDistance(node, neigbour);


                let c = !contains(openSet, neigbour);

                if(newNeighbourCost < neigbour.gCost || c) {
                    neigbour.gCost = newNeighbourCost;
                    neigbour.hCost = getDistance(neigbour, endNode);
                    neigbour.parent = node;
                    
                    if(!neigbour.equals(endNode)) {
                        cells[neigbour.id].style.backgroundColor = "rgb(0, 217, 255)"; 
                    }

                    if(c) {
                        openSet.push(neigbour);
                    }
                }
            }
        });
    }
}

const retracePath = (startNode, endNode) => {

    let path = [];
    let currentNode = endNode;

    while(!startNode.equals(currentNode)) {
        path.push(currentNode);
        if(!currentNode.equals(endNode)) {
            cells[currentNode.id].style.backgroundColor = "blue";
        }
        currentNode = currentNode.parent;
    }

    console.log("complete");
} 
//\grid

obstaclesButton.addEventListener("click", placeObstacles);
startButton.addEventListener("click", placeStart);
endButton.addEventListener("click", placeEnd);
findButton.addEventListener("click", findPath);