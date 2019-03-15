'use strict';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const digits = ['1', '2', '3', '4', '5', '6', '7', '8'];

const setting = {
  cellSize: '50',
  whiteCellColor: 'white',
  blackCellColor: 'black',
};

const body = document.querySelector('body');

const board = document.createElement('table');
board.style.borderSpacing = '3';
board.style.borderCollapse = 'collapse';

let header = document.createElement('tr');

//Пустая клетка
let dummyCell = document.createElement('th');
dummyCell.setAttribute('width', setting.cellSize);
dummyCell.setAttribute('height', setting.cellSize);

//Белая клетка
const whiteCell = document.createElement('td');
whiteCell.setAttribute('width', setting.cellSize);
whiteCell.setAttribute('height', setting.cellSize);
whiteCell.style.background = setting.whiteCellColor;
whiteCell.style.border = '1px solid black';

//Черная клетка
const blackCell = document.createElement('td');
blackCell.style.background = setting.blackCellColor;
blackCell.setAttribute('width', setting.cellSize);
blackCell.setAttribute('height', setting.cellSize);
blackCell.style.border = '1px solid black';

//Формируем заголовок

header.appendChild(dummyCell);

for (let i = 0; i < letters.length; i++) {
  let cell = document.createElement('th');
  cell.innerText = letters[i];
  cell.style.border = '1px solid black';
  cell.setAttribute('width', setting.cellSize);
  cell.setAttribute('height', setting.cellSize);
  header.appendChild(cell);
}
//Добавляем заголовок вверху
board.appendChild(header);

for (let i = digits.length; i > 0; i--) {
  //Переменная для хранения текущей строки
  let row = document.createElement('tr');

  let cell = document.createElement('th');

  cell.setAttribute('width', setting.cellSize);
  cell.setAttribute('height', setting.cellSize);
  cell.style.border = '1px solid black';

  //Добавляем подпись строки в начале строки
  cell.innerText = digits[i - 1];
  row.appendChild(cell);

  for (let j = 0; j < letters.length / 2; j++) {
    let whiteCellClone = whiteCell.cloneNode(false);
    let blackCellClone = blackCell.cloneNode(false);
    // Чередуем клетки в зависимости от ряда
    if (i % 2 === 0) {
      row.appendChild(whiteCellClone);
      row.appendChild(blackCellClone);
    } else {
      row.appendChild(blackCellClone);
      row.appendChild(whiteCellClone);
    }
  }

  //Добавляем подпись строки в конце строки
  row.appendChild(cell.cloneNode(true));
  board.appendChild(row);
  row = null;
}
//Добавляем заголовок внизу
board.appendChild(header.cloneNode(true));

//Отображаем доску на странице
body.appendChild(board);


