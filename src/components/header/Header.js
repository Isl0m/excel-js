import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { ActiveRoute } from '@core/router/ActiveRoute';
import { debounce } from '@core/utils';

import * as action from '@/redux/action';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHtml() {
    const { title } = this.store.getState();
    return `
    <input type='text' class='input' value='${title}'>

    <div>
      <div class='button' data-action='delete'>
        <i class='material-icons' data-action='delete'>delete</i>
      </div>
      <div class='button' data-action='exit'>
        <i class='material-icons' data-action='exit'>exit_to_app</i>
      </div>
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(action.changeTitle($target.text()));
  }

  onClick(event) {
    const actionType = $(event.target).data.action;
    if (actionType === 'delete') {
      const decision = confirm('Are you sure to delete this table?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if (actionType === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
