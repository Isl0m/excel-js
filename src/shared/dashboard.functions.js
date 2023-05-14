import { storage } from '@core/utils';

function toHtml(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const date = new Date(model.updatedDate);

  return `
  <li class="dashboard__record">
    <a href="#excel/${id}">${model.title}</a>
    <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong>
  </li>
`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `You don't have records`;
  }
  return `
  <div class="dashboard__list__header">
    <span>Name</span>
    <span>Created Data</span>
  </div>

  <ul class="dashboard__list">
    ${keys.map(toHtml).join('')}
  </ul>
  `;
}
