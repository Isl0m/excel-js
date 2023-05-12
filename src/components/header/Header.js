import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { debounce } from '@core/utils'

import * as action from '@/redux/action'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHtml() {
    const { title } = this.store.getState()
    return `
    <input type='text' class='input' value='${title}'>

    <div>
      <div class='button'>
        <i class='material-icons'>delete</i>
      </div>
      <div class='button'>
        <i class='material-icons'>exit_to_app</i>
      </div>
    </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(action.changeTitle($target.text()))
  }
}
