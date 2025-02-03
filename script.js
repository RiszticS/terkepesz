var canvas = document.querySelector('#elementsCanvas');
var ctx = canvas.getContext('2d');
var gameTime = 28;
var seasonTime = 7;
var springPoint = 0;
var summerPoint = 0;
var autumnPoint = 0;
var winterPoint = 0;
var round = 0;
var currentSeason = 'Tavasz (AB)';
var tileImage = new Image();
var boardSize = 11;
var gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill('base'));
var end = false;
const gameBoardElement = document.getElementById('gameBoard');
const mountainsCoord = [{ x: 2, y: 2 }, { x: 4, y: 9 }, { x: 6, y: 4 }, { x: 9, y: 10 }, { x: 10, y: 6 }];
var seasonMissons = [{ type: 'A', point: 0, function: null }, { type: 'B', point: 0, function: null }, { type: 'C', point: 0, function: null }, { type: 'D', point: 0, function: null }];

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
];

const missions = [
    {
        title: "Az erdő széle",
        description: "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
        img: 'Group 69.png',
        function: EdgeOfTheForest
    },
    {
        title: "Álmos-völgy",
        description: "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
        img: 'Group 74.png',
        function: SleepyValley
    },
    {
        title: "Krumpliöntözés",
        description: "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
        img: 'Group 70.png',
        function: WateringPotatoes
    },
    {
        title: "Határvidék",
        description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
        img: 'Group 78.png',
        function: Borderlands
    },
    {
        title: "Fasor",
        description: "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
        img: 'Group 68.png',
        function: ThreeLine
    },
    //     {
    //       title: "Gazdag város",
    //       description: "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
    //       img:'Group 71.png',
    //       function:null
    //     },
    //     {
    //       title: "Öntözőcsatorna",
    //       description: "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
    //       img:'Group 75.png',
    //       function:null
    //     },
    {
        title: "Mágusok völgye",
        description: "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
        img: 'Group 76.png',
        function: MagicansValley
    },
    {
        title: "Üres telek",
        description: "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
        img: 'Group 77.png',
        function: EmptySite
    },
    //     {
    //       title: "Sorház",
    //       description: "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
    //       img:'Group 72.png',
    //       function:null
    //     },
    //     {
    //       title: "Páratlan silók",
    //       description: "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    //       img:'Group 73.png',
    //       function:null
    //     },
    {
        title: "Gazdag vidék",
        description: "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
        img: 'Group 79.png',
        function: RichCountryside
    }
];

function placeMountians() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            mountainsCoord.forEach((coord, index) => {
                if ((coord.x - 1) == i && (coord.y - 1) == j) {
                    gameBoard[i][j] = 'mountain';
                }
            });
        }
    }
}

function initializeGameBoard() {
    placeMountians();
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.classList = gameBoard[i][j];
            cell.addEventListener('click', handleCellClick);
            cell.addEventListener('mouseover', handleCellHover);
            row.appendChild(cell);
        }
        gameBoardElement.appendChild(row);
    }
    updateGameBoard();
}


function updateGameBoard() {
    const cells = document.querySelectorAll('td');
    cells.forEach((cell, index) => { cell.classList = gameBoard[Math.floor(index / boardSize)][index % boardSize]; });
}

function shuffleArray(array) {
    array.sort(function (a, b) {
        return 0.5 - Math.random()
    })
}

function setCanvasTileImage() {
    if (round <= 15) {
        switch (elements[round].type) {
            case 'water':
                tileImage.src = 'assets/tiles/water_tile.png';
                break;
            case 'forest':
                tileImage.src = 'assets/tiles/forest_tile.png';
                break;
            case 'farm':
                tileImage.src = 'assets/tiles/plains_tile.png';
                break;
            case 'town':
                tileImage.src = 'assets/tiles/village_tile.png';
                break;
        }
        tileImage.onload = function () {
            drawMatrix(elements[round].shape);
        };
    }
}

function drawMatrix(matrix) {
    const cellSize = 40;
    const padding = 2;
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const centerX = (canvas.width - (numCols * (cellSize + padding))) / 2;
    const centerY = (canvas.height - (numRows * (cellSize + padding))) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cellValue = matrix[i][j];
            const x = centerX + j * (cellSize + padding);
            const y = centerY + i * (cellSize + padding);

            if (cellValue === 1) {
                ctx.drawImage(tileImage, x, y, cellSize, cellSize);
            }
        }
    }
    ctx.fillStyle = 'black';
    ctx.font = '22px Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial, sans-serif';
    ctx.fillText(elements[round].time + " 🕒", canvas.width - 70, 40);
}

function rotateMatrix() {
    const numRows = elements[round].shape.length;
    const numCols = elements[round].shape[0].length;
    const rotatedMatrix = [];

    for (let i = 0; i < numCols; i++) {
        const newRow = [];
        for (let j = numRows - 1; j >= 0; j--) {
            newRow.push(elements[round].shape[j][i]);
        }
        rotatedMatrix.push(newRow);
    }
    elements[round].shape = rotatedMatrix;
    drawMatrix(elements[round].shape);
}

function mirrorMatrix() {
    for (var i = 0; i < elements[round].shape.length; i++) {
        elements[round].shape[i].reverse();
    }
    elements[round].mirrored = true;
    drawMatrix(elements[round].shape);
}

function handleCellClick(event) {
    const cells = document.querySelectorAll('td');
    if (!end) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const shapeRows = elements[round].shape.length;
        const shapeCols = elements[round].shape[0].length;
        var canPlaceTile = true;

        for (let i = 0; i < shapeRows; i++) {
            for (let j = 0; j < shapeCols; j++) {
                const targetRow = row + i;
                const targetCol = col + j;
                if (elements[round].shape[i][j] == 1 && (targetRow >= boardSize || targetCol >= boardSize || targetRow < 0 || targetCol < 0 || gameBoard[targetRow][targetCol] != 'base')) {
                    canPlaceTile = false;
                    break;
                }
            }
            if (!canPlaceTile) { break; }
        }

        if (canPlaceTile) {
            for (let i = 0; i < shapeRows; i++) {
                for (let j = 0; j < shapeCols; j++) {
                    const targetRow = row + i;
                    const targetCol = col + j;

                    if (elements[round].shape[i][j] == 1) {
                        gameBoard[targetRow][targetCol] = elements[round].type;

                    }
                }
            }
            gameTime = gameTime - elements[round].time;

            nextTurn();
            updateGameBoard();
        }
    } else {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
        alert("Már nem tudsz több elemet lerakni!")
    }
}


function handleCellHover(event) {
    const cells = document.querySelectorAll('td');
    if (!end) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const shapeRows = elements[round].shape.length;
        const shapeCols = elements[round].shape[0].length;
        var canPlaceTile = true;

        cells.forEach((cell) => {
            cell.classList.remove('can', 'cant');
        });

        for (let i = 0; i < shapeRows; i++) {
            for (let j = 0; j < shapeCols; j++) {
                const targetRow = row + i;
                const targetCol = col + j;
                if (elements[round].shape[i][j] == 1 && (targetRow >= boardSize || targetCol >= boardSize || targetRow < 0 || targetCol < 0 || gameBoard[targetRow][targetCol] != 'base')) {
                    canPlaceTile = false;
                }
            }
        }

        for (let i = 0; i < shapeRows; i++) {
            for (let j = 0; j < shapeCols; j++) {
                const targetRow = row + i;
                const targetCol = col + j;
                const index = targetRow * boardSize + targetCol;

                if (elements[round].shape[i][j] == 1) {
                    cells[index].classList.add(canPlaceTile ? 'can' : 'cant');
                }
            }
        }
    } else {
        cells.forEach(cell => {
            cell.removeEventListener('mouseover', handleCellHover);
        });
    }
}


function displayDatas() {
    document.querySelector('#seasonTimeLeft').innerHTML = "Évszakból hátralevő idő: " + seasonTime + "/7";
    document.querySelector('#spring').innerHTML = "Tavasz:<br>" + springPoint + " pont";
    document.querySelector('#summer').innerHTML = "Nyár:<br>" + summerPoint + " pont";
    document.querySelector('#autumn').innerHTML = "Ősz:<br>" + autumnPoint + " pont";
    document.querySelector('#winter').innerHTML = "Tél:<br>" + winterPoint + " pont";
    document.querySelector('#currentSeason').innerHTML = "Jelenlegi évszak: " + currentSeason;
    document.querySelector('#playerScore').innerHTML = "Összesen: " + (springPoint + summerPoint + autumnPoint + winterPoint) + " pont";

    switch (currentSeason) {
        case 'Tavasz (AB)':
            missionsDisplay([0, 1, 2, 3]);
            break;
        case 'Nyár (BC)':
            missionsDisplay([1, 2, 3, 0]);
            break;
        case 'Ősz (CD)':
            missionsDisplay([2, 3, 0, 1]);
            break;
        case 'Tél (DA)':
            missionsDisplay([3, 0, 1, 2]);
            break;
        default:
            break;
    }
}

function missionsDisplay(indexes) {
    var abcd = ['A', 'B', 'C', 'D'];
    seasonMissons[indexes[0]].point = seasonMissons[indexes[0]].function();
    seasonMissons[indexes[1]].point = seasonMissons[indexes[1]].function();
    document.querySelector('#text' + abcd[indexes[0]]).innerHTML = "(" + seasonMissons[indexes[0]].point + " pont)&emsp;&emsp;&emsp;&emsp;⚪&nbsp;" + abcd[indexes[0]];
    document.querySelector('#text' + abcd[indexes[1]]).innerHTML = "(" + seasonMissons[indexes[1]].point + " pont)&emsp;&emsp;&emsp;&emsp;⚪&nbsp;" + abcd[indexes[1]];
    document.querySelector('#text' + abcd[indexes[2]]).innerHTML = "(" + seasonMissons[indexes[2]].point + " pont)&emsp;&emsp;&emsp;&emsp;⚫&nbsp;" + abcd[indexes[2]];
    document.querySelector('#text' + abcd[indexes[3]]).innerHTML = "(" + seasonMissons[indexes[3]].point + " pont)&emsp;&emsp;&emsp;&emsp;⚫&nbsp;" + abcd[indexes[3]];
}

function calculateSeason() {
    if (gameTime % 7 >= 0) {
        seasonTime = seasonTime - elements[round].time;
        if (seasonTime === 0) { seasonTime = 7; }
        else if (seasonTime < 0) { seasonTime += 7; }
    } else {
        seasonTime = 7;
    }

    if (gameTime <= 28 && gameTime > 21) {
        currentSeason = 'Tavasz (AB)';
    } else if (gameTime <= 21 && gameTime > 14) {
        currentSeason = 'Nyár (BC)';
        springPoint = seasonMissons[0].point + seasonMissons[1].point + FencedMountain();
    } else if (gameTime <= 14 && gameTime > 7) {
        currentSeason = 'Ősz (CD)';
        summerPoint = seasonMissons[1].point + seasonMissons[2].point + FencedMountain();
    } else if (gameTime <= 7 && gameTime >= 0) {
        currentSeason = 'Tél (DA)';
        autumnPoint = seasonMissons[2].point + seasonMissons[3].point + FencedMountain();
    } if (!end && gameTime <= 7 && gameTime >= 0) {
        winterPoint = seasonMissons[3].point + seasonMissons[0].point + FencedMountain();
    }
}


function nextTurn() {
    if (round < elements.length && elements[round] && !end) {
        calculateSeason();
        displayDatas();
        round++;
        setCanvasTileImage();
        saveData();
        if (round == elements.length) { endGame(); }
    }
}

function startGame() {
    deleteSavedData();
    shuffleArray(elements);
    shuffleArray(missions);
    setMissons();
    setCanvasTileImage();
    initializeGameBoard();
    displayDatas();
    hide();
}

function loadGame() {
    initDatas();
    setMissons();
    setCanvasTileImage();
    initializeGameBoard();
    displayDatas();
    hide();
}

function endGame() {
    end = true;
    round = 15;
    setCanvasTileImage();
    calculateSeason();
    seasonTime = 1;
    displayDatas();
    alert("A játék véget ért!");
    deleteSavedData();
}

function initButtons() {
    document.querySelector('#rotate').addEventListener('click', rotateMatrix, false);
    document.querySelector('#mirror').addEventListener('click', mirrorMatrix, false);
    document.querySelector('#newGame').addEventListener('click', startGame, false);
    if (areThereSavedData()) { document.querySelector('#loadGame').addEventListener('click', loadGame, false); document.querySelector('#loadGame').style.display = '' }
    else { document.querySelector('#loadGame').style.display = 'none' }
}

function hide() {
    document.querySelector('#startContainer').style.display = 'none';
    document.querySelector('#gameContainer').style.display = 'grid';
}

function setMissons() {
    seasonMissons.forEach((item, index) => {
        document.getElementById(item.type).src = 'assets/missions_hun/' + missions[index].img;
        item.function = missions[index].function;
    });
}

function Borderlands() {
    let count = 0;
    gameBoard.forEach((elements, index) => {
        if (gameBoard.map(coll => coll[index]).every(cell => cell !== 'base')) { count++; }
        if (elements.every(cell => cell !== 'base')) { count++; }
    });
    return count * 6;
}

function EdgeOfTheForest() {
    let count = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[0][i] === 'forest' || gameBoard[i][0] === 'forest'
            || gameBoard[gameBoard[i].length - 1][i] === 'forest'
            || gameBoard[i][gameBoard[i].length - 1] === 'forest') { count++; }
    }
    return count * 1;
}

function SleepyValley() {
    return gameBoard.reduce((count, row) => {
        if (row.every(cell => cell === 'forest') && row.length === 3) {
            console.log(cell);
            return count + 4;
        }
        return count;
    }, 0);
}

function WateringPotatoes() {
    let count = 0;
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'water') {
                if (rowIndex > 0 && gameBoard[rowIndex - 1][colIndex] === 'farm' ||   
                    rowIndex < gameBoard.length - 1 && gameBoard[rowIndex + 1][colIndex] === 'farm' || 
                    colIndex > 0 && gameBoard[rowIndex][colIndex - 1] === 'farm' ||   
                    colIndex < row.length - 1 && gameBoard[rowIndex][colIndex + 1] === 'farm')   
                {
                    count++;
                }
            }
        });
    });
    return count * 2;
}

function FencedMountain() {
    let count = 0;
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'mountain') {
                if (rowIndex > 0 && gameBoard[rowIndex - 1][colIndex] !== 'base' &&   
                    rowIndex < gameBoard.length - 1 && gameBoard[rowIndex + 1][colIndex] !== 'base' && 
                    colIndex > 0 && gameBoard[rowIndex][colIndex - 1] !== 'base' &&   
                    colIndex < row.length - 1 && gameBoard[rowIndex][colIndex + 1] !== 'base')   
                {
                    count++;
                }
            }
        });
    });
    return count;
}

function MagicansValley() {
    let count = 0;
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'water') {
                if (rowIndex > 0 && gameBoard[rowIndex - 1][colIndex] === 'mountain' ||   
                    rowIndex < gameBoard.length - 1 && gameBoard[rowIndex + 1][colIndex] === 'mountain' || 
                    colIndex > 0 && gameBoard[rowIndex][colIndex - 1] === 'mountain' ||   
                    colIndex < row.length - 1 && gameBoard[rowIndex][colIndex + 1] === 'mountain')   
                {
                    count++;
                }
            }
        });
    });
    return count * 3;
}

function EmptySite() {
    let count = 0;
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'base') {
                if (rowIndex > 0 && gameBoard[rowIndex - 1][colIndex] === 'town' ||   
                    rowIndex < gameBoard.length - 1 && gameBoard[rowIndex + 1][colIndex] === 'town' || 
                    colIndex > 0 && gameBoard[rowIndex][colIndex - 1] === 'town' ||   
                    colIndex < row.length - 1 && gameBoard[rowIndex][colIndex + 1] === 'town')   
                {
                    count++;
                }
            }
        });
    });
    return count * 2;
}

function RichCountryside() {
    let count = 0;
    gameBoard.forEach((row) => {
        const uniqueElements = new Set();
        row.forEach((cell) => {
            uniqueElements.add(cell);
            if (uniqueElements.has('town') && uniqueElements.has('forest') && uniqueElements.has('water') && uniqueElements.has('farm') && uniqueElements.has('mountain')) {
                count++;
            }
        });
    });
    return count * 4;
}

function ThreeLine() {
    let maxCount = 0;
    let count = 0;
    const threeline = new Set();
    gameBoard.forEach((coll, colIndex) => {
        coll.forEach((row, rowIndex) => {
            if (gameBoard[rowIndex][colIndex] == 'forest') {
                count++;
            } else {
                if (count > 0) {
                    threeline.add(count);
                    if (count > maxCount) {
                        maxCount = count;
                    }
                    count = 0;
                }
            }
            if (count > 0) {
                threeline.add(count);
                if (count > maxCount) {
                    maxCount = count;
                }
            }
        });
    });
    return threeline.size * 2;
}

function initDatas() {
    gameTime = JSON.parse(localStorage.getItem('gameTime'));
    seasonTime = JSON.parse(localStorage.getItem('seasonTime'));
    springPoint = JSON.parse(localStorage.getItem('springPoint'));
    summerPoint = JSON.parse(localStorage.getItem('summerPoint'));
    autumnPoint = JSON.parse(localStorage.getItem('autumnPoint'));
    winterPoint = JSON.parse(localStorage.getItem('winterPoint'));
    round = JSON.parse(localStorage.getItem('round'));
    currentSeason = JSON.parse(localStorage.getItem('currentSeason'));
    gameBoard = JSON.parse(localStorage.getItem('gameBoard'));
    end = JSON.parse(localStorage.getItem('end'));
    seasonMissons = JSON.parse(localStorage.getItem('seasonMissons'));
}

function saveData() {
    localStorage.setItem('gameTime', JSON.stringify(gameTime));
    localStorage.setItem('seasonTime', JSON.stringify(seasonTime));
    localStorage.setItem('springPoint', JSON.stringify(springPoint));
    localStorage.setItem('summerPoint', JSON.stringify(summerPoint));
    localStorage.setItem('autumnPoint', JSON.stringify(autumnPoint));
    localStorage.setItem('winterPoint', JSON.stringify(winterPoint));
    localStorage.setItem('round', JSON.stringify(round));
    localStorage.setItem('currentSeason', JSON.stringify(currentSeason));
    localStorage.setItem('tileImage', JSON.stringify(tileImage));
    localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
    localStorage.setItem('end', JSON.stringify(end));
    localStorage.setItem('seasonMissons', JSON.stringify(seasonMissons));
}

function areThereSavedData() {
    const localStorageKeys = ['gameTime', 'seasonTime', 'springPoint', 'summerPoint', 'autumnPoint', 'winterPoint', 'round', 'currentSeason', 'tileImage', 'gameBoard', 'end', 'seasonMissons'];
    const allKeysHaveValues = localStorageKeys.every(key => localStorage.getItem(key) !== null);
    return allKeysHaveValues;
}

function deleteSavedData() {
    localStorage.clear();
}

window.addEventListener('load', initButtons, false);