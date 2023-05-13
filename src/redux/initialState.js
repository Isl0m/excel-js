import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  title: defaultTitle,
  currentText: '',
  updatedDate: new Date().toJSON(),
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : structuredClone(defaultState);
}
