// SETTING
const settings = [
  ['color', '#000000'],
  ['gridSize', 64],
  ['toolTip', 'pen'], // pen/eraser;
];

// Getter and Setter
const getVar = (varName) => {
  return settings.find(setting => {
    if (setting[0] === varName) return setting;
  })[1]
}
const setVar = (varName, value) => {
  settings.forEach(setting => {
    if (setting[0] === varName) setting[1] = value;
  })
}

// slider
const getGridSliderValue = () => document.querySelector('#grid-slider').value;
const setGridSliderValue = (numberValue) => document.querySelector('#grid-slider').value = numberValue;
const setGridSliderValueDisplay = (number) => document.querySelector('#grid-slider-value').textContent = number;

// cell color
const getInputColorValue = () => document.querySelector('#pen-color').value;
const setCellColor = (cell, color) => {
  if(!color) console.log('ERROR: color not set')
  cell.style.backgroundColor = color;
}
const removeCellColor = (cell) => cell.style.backgroundColor = 'unset';

// var color
const getColor = () => getVar('color');
const setColor = (color) => setVar('color', color);


// utilities Start
const clearSketch = () => {
  const squareItems = document.querySelectorAll('.square--item');
  Array.from(squareItems).forEach(item => {
    removeCellColor(item);
  });
}

const resetActiveButton = () => {
  document.querySelector('.button--active')?.classList.remove('button--active');
}

const removeClass = (node, className) => {
  node.classList.remove(className);
}
// utilities End


// Grids
const gridItemListener = (cell) => {
  if (getVar('toolTip') === 'pen') {
    setCellColor(cell, getColor()); // do this
  } 
  else if (getVar('toolTip') === 'eraser') {
    removeCellColor(cell);
  }
}
const createGridItem = () => {
  const squareItem = document.createElement('div');
  squareItem.classList = 'square--item';

  const mouseoverPen = (e) => {
    if (e.buttons !== 1) return;
    gridItemListener(squareItem);
  };
  const mousedownPen = (e) => {
    e.preventDefault();
    gridItemListener(squareItem);
  }

  squareItem.addEventListener('mousedown', mousedownPen)
  squareItem.addEventListener('mouseover', mouseoverPen);
  return squareItem;
}

const createGridRow = (numberCol) => {
  const squareRow = document.createElement('div');
  squareRow.classList = 'square--row';

  for (let colIndex = 0; colIndex < numberCol; colIndex++) {
    const squareItem = createGridItem();
    squareRow.appendChild(squareItem); 
  }
  return squareRow;
}

const createGrid = (numberRow, numberCol = null) => {
  if (numberCol == null) numberCol = numberRow;

  const squareContainer = document.querySelector('#grid-container');
  // add row into box
  for (let rowIndex = 0; rowIndex < numberRow; rowIndex++) {
    const squareRow = createGridRow(numberCol)
    squareContainer.append(squareRow);
  }
}

const removeGrid = () => {
  document.querySelector('#grid-container').replaceChildren();
}

const setGridSize = () => {
  removeGrid();
  
  const gridSliderValue = getGridSliderValue();
  createGrid(gridSliderValue)
}

const changeCursor = (node, cursorIconURL) => {
  node.style.cursor = `url(${cursorIconURL}), auto`;
}

const changeGridContainerCursor = (cursorIconURL) => {
  const gridContainer = document.querySelector('#grid-container');
  changeCursor(gridContainer, cursorIconURL);
}

// Buttons
const buttonSetGridSize = document.querySelector('#button-set-grid-size');
buttonSetGridSize.addEventListener('click', setGridSize)

const buttonClear = document.querySelector('#clear-button');
buttonClear.addEventListener('click', clearSketch);

const buttonSetPenColor = document.querySelector('#button-set-pen-color');
buttonSetPenColor.addEventListener('click', () => setColor(getInputColorValue()));

const buttonEraser = document.querySelector('#eraser-button');
buttonEraser.addEventListener('click', function() {
  setVar('toolTip', 'eraser');
  resetActiveButton();
  this.classList.add('button--active');
  changeGridContainerCursor('../img/cursor/eraser.png');
});

const buttonPen = document.querySelector('#pen-button');
buttonPen.addEventListener('click',  function() {
  setVar('toolTip', 'pen')
  resetActiveButton();
  this.classList.add('button--active');
  changeGridContainerCursor('../img/cursor/pen.png');
});


// on first load

// make grid slider value display interactive
const gridSlider = document.querySelector('#grid-slider');
gridSlider.addEventListener('input', function(){setGridSliderValueDisplay(this.value)});

setGridSliderValue( getVar('gridSize') );
const gridSliderValue = getGridSliderValue();
setGridSliderValueDisplay( gridSliderValue );
createGrid( getVar('gridSize') )

document.querySelector('#footer-year').textContent = new Date().getFullYear(); // Set footer year 
