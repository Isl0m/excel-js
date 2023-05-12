import { storage } from '@core/utils'
import { defaultStyles, defaultTitle } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  title: defaultTitle,
  currentText: '',
}

function normalize(state){
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  }
}

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) : defaultState
