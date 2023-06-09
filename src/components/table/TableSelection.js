export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.current = $el
    this.group.push($el)
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    $group.forEach($el => $el.addClass(TableSelection.className))
  }

  get selectedIds(){
    return this.group.map($el => $el.id())
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }

  removeSelect($el) {
    $el.removeClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(this.removeSelect)
    this.group = []
  }
}
