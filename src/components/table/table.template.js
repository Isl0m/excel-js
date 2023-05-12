import { parse } from '@core/parse';
import { toInlineStyles } from '@core/utils';

import { defaultStyles } from '@/constants';

const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  // return state[index] ? state[index] + 'px' : null
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toColumn({ col, index, width }) {
  return `
  <div 
    class='column' 
    data-type='resizeble' 
    style='width: ${width}' 
    data-col='${index}'
  >
    ${col}
    <div class='col-resize' data-resize='col'></div>
  </div>`;
}

function toCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const content = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `
      <div 
        class='cell' 
        contenteditable 
        spellcheck='false' 
        style='width: ${width}; ${styles}'
        data-col='${col}'
        data-type='cell'
        data-id='${id}'
        data-value='${content || ''}'
      >
        ${parse(content) || ''}
      </div>
    `;
  };
}

function createRow(index, content, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const height = getHeight(state, index);
  return `
  <div 
    class='row' 
    style='height: ${height}' 
    data-type='resizeble' 
    data-row='${index}'
  >
    <div class='row__info'>
      ${index ? index : ''}
      ${resize}
    </div>
    <div class='row__data'>${content}</div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index);
}

function withWidthFrom(state) {
  return (col, index) => ({
    col,
    index,
    width: getWidth(state.colState, index),
  });
}

export function createTable(rowCount = 15, state = {}) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
