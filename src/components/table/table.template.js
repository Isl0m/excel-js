const CHAR_CODES = {
  A: 65,
  Z: 90
}

function toCol(col, index) {
  return `
  <div class='column' data-type='resizeble' data-col='${index}'>
    ${col}
    <div class='col-resize' data-resize='col'></div>
  </div>`
}

function toCell(content, col) {
  return `
  <div class='cell' contenteditable spellcheck='false' data-col='${col}'>
    ${content}
  </div>
  `
}

function createRow(info, content) {
  const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class='row'  data-type='resizeble'>
    <div class='row__info'>
      ${info ? info : ''}
      ${resize}
    </div>
    <div class='row__data'>${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}

export function createTable(rowCount = 25) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('')

  rows.push(createRow(null, cols))

  for (let i = 1; i <= rowCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(i, cells))
  }

  return rows.join('')
}
