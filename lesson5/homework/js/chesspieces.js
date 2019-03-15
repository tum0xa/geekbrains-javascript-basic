'use strict';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const digits = ['1', '2', '3', '4', '5', '6', '7', '8'];

const whitePiecesCollection = {
  'A1': 'С',
  'A2': 'П',
  'B1': 'К',
  'B2': 'П',
  'C1': 'Л',
  'C2': 'П',
  'D1': 'Ф',
  'D2': 'П',
  'E1': 'Кр',
  'E2': 'П',
  'F1': 'Л',
  'F2': 'П',
  'G1': 'К',
  'G2': 'П',
  'H1': 'С',
  'H2': 'П',
};
const blackPiecesCollection = {
  'A8': 'С',
  'A7': 'П',
  'B8': 'К',
  'B7': 'П',
  'C8': 'Л',
  'C7': 'П',
  'D8': 'Ф',
  'D7': 'П',
  'E8': 'Кр',
  'E7': 'П',
  'F8': 'Л',
  'F7': 'П',
  'G8': 'К',
  'G7': 'П',
  'H8': 'С',
  'H7': 'П',
};

const settings = {
  cellSize: '50',
  whiteCellColor: 'papayawhip',
  blackCellColor: 'grey',
  whitePieceColor: 'white',
  blackPieceColor: 'black',
  borderStyle: '1px solid black',

};

const piece = {
  image: null,
  letter: null,
  position: null,
  color: null,
};

const cell = {
  settings,
  node: null,
  position: null,
  color: null,
  piece,
  isDummy: false,
  isHeader: false,
  size: null,

  init(cellSize, isDummy, isHeader, piece, color, position) {
    this.isDummy = isDummy;
    this.isHeader = isHeader;
    this.size = cellSize;
    this.piece = piece;
    this.color = color;
    this.position = position;

    this.node = document.createElement('td');
    //Пустая клетка
    if (this.isDummy === true) {
      this.node = document.createElement('th');
      this.node.style.border = 'none';
      //Клетка заголовка
    } else if (this.isHeader === true) {
      this.node = document.createElement('th');
      this.node.innerText = this.piece.letter;
      this.node.style.border = settings.borderStyle;
      //Клетка с шахматной фигурой
    } else if (this.piece) {
      if (this.piece.letter)
        this.node.innerText = this.piece.letter;
      this.node.style.border = settings.borderStyle;
      this.node.style.textAlign = 'center';
      this.node.style.webkitTextStroke = '1px black';
      this.node.style.webkitTextFillColor = this.piece.color;
    }
    //Стиль для любых клеток
    this.node.style.fontSize = this.size / 2 + 'px';
    this.node.style.fontFamily = 'Arial';
    this.node.style.fontWeight = 'bold';
    this.node.setAttribute('width', this.size);
    this.node.setAttribute('height', this.size);
    this.node.style.background = this.color;

  },

};

const board = {
  settings,
  cell,
  piece: piece,
  piecesCollection: new Map(),
  node: null,
  header: document.createElement('tr'),
  parent: document.querySelector('body'),
  /**
   * Инициализация шахматной доски
   * @param cellSize - размер клеток
   * @param letters - подписи буквенного ряда
   * @param digits - подписи цифрового ряда
   * @param whitePiecesCollection - Изначальное положение белых шахматных фигур
   * @param blackPiecesCollection - Изначальное положение черных шахматных фигур
   * В результате получаем узел node (полностью сформированная доска)
   */
  init(cellSize, letters, digits, whitePiecesCollection, blackPiecesCollection) {
    this.node = document.createElement('table');
    this.node.style.borderSpacing = '3';
    this.node.style.borderCollapse = 'collapse';
    this.cell.init(cellSize, true);
    this.header.appendChild(cell.node.cloneNode(true));

    for (let i = 0; i < letters.length; i++) {
      this.piece.letter = letters[i];
      this.cell.init(cellSize, false, true, this.piece);
      this.header.appendChild(this.cell.node.cloneNode(true));
    }

    this.node.appendChild(this.header);

    //Расстановка белых шахматных фигур
    this.setPiecesPosition(whitePiecesCollection, 'white');

    //Расстановка черных шахматных фигур
    this.setPiecesPosition(blackPiecesCollection, 'black');

    for (let i = digits.length; i > 0; i--) {
      //Переменная для хранения текущей строки
      let row = document.createElement('tr');
      this.piece.letter = digits[i - 1];

      //Добавляем подпись горизонтального ряда
      this.cell.init(cellSize, false, true, this.piece);
      row.appendChild(cell.node.cloneNode(true));

      //Расстановка клеток
      for (let j = 0; j < letters.length; j++) {
        let currentPosition = letters[j] + digits[i - 1];
        let currentPiece = Object.assign({}, this.piece);
        if (this.piecesCollection.has(currentPosition)) {
          currentPiece = this.piecesCollection.get(currentPosition);
        } else {
          currentPiece.letter = '';
        }
        if ((i + j) % 2 === 0) {
          this.cell.init(cellSize, false, false, currentPiece,
              settings.whiteCellColor,
              j + i);
        } else {
          this.cell.init(cellSize, false, false, currentPiece,
              settings.blackCellColor,
              j + i);
        }

        row.appendChild(cell.node.cloneNode(true));

      }
      //Добавляем подпись горизонтального ряда
      this.piece.letter = digits[i - 1];
      this.cell.init(cellSize, false, true, piece);
      row.appendChild(cell.node.cloneNode(true));
      //Добавляем ряд в доску
      this.node.appendChild(row.cloneNode(true));
    }
    //Добавляем ряд заголовков в низ доски
    this.node.appendChild(this.header.cloneNode(true));
  },

  /**
   * Формирование коллекции фигур для доски
   * @param piecesCollection - Известные положения белых фигур
   * @param side - Цвет (сторона) фигур
   */
  setPiecesPosition(piecesCollection, side) {
    for (let i = digits.length; i > 0; i--) {
      for (let j = 0; j < letters.length; j++) {
        let currentPosition = `${letters[j]}${i}`;
        if (currentPosition in piecesCollection) {
          let piece = Object.assign({}, this.piece);
          //Расскраска фигур
          console.log(side);
          if (side === 'white') {
            piece.color = this.settings.whitePieceColor;
          } else if (side === 'black') {
            piece.color = this.settings.blackPieceColor;
          }
          piece.letter = piecesCollection[currentPosition];
          piece.position = currentPosition;
          this.piecesCollection.set(piece.position, piece);
          piece = null;
        }
      }

    }
  },
  render() {
    //Отрисовка доски в родителе
    this.parent.appendChild(this.node);
  },
};

const game = {
  settings,
  board,

  init() {
    this.board.init(this.settings.cellSize, letters, digits, whitePiecesCollection, blackPiecesCollection);
  },
  run() {
    this.init();
    this.board.render();
  },
};

game.run();



