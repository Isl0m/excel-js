export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)
    this.current = $el
    this.group.push($el)
  }

  rangeOfCell({ row, col }) {
    const range = []
    for (let i = 0; i <= row; i++) {
      for (let j = 0; j <= col; j++) {
        range.push(`${i}:${j}`)
      }
    }
    return range
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    $group.forEach($el => $el.addClass(TableSelection.className))
  }

  removeSelect($el) {
    $el.removeClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(this.removeSelect)
    this.group = []
  }
}
