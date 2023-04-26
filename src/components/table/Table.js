import { ExcelComponent } from '@core/ExcelComponent'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  toHtml() {
    return `
    <div class="row">
      <div class="row__info"></div>

      <div class="row__data">
        <div class="column">A</div>
        <div class="column">B</div>
        <div class="column">C</div>
      </div>

    </div>

    <div class="row">
      <div class="row__info">1</div>

      <div class="row__data">
        <div class="cell selected" contenteditable>sfdsd</div>
        <div class="cell" contenteditable>sfdsdf</div>
        <div class="cell" contenteditable>sdfsf</div>
      </div>
      
    </div>
    <div class="row">
      <div class="row__info">2</div>

      <div class="row__data">
        <div class="cell" contenteditable>ssdffdsd</div>
        <div class="cell" contenteditable>ssdffdsdf</div>
        <div class="cell" contenteditable>sdfsfsf</div>
      </div>
      
    </div>
    `
  }
}
