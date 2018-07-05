import { combineReducers } from 'redux'
import SiswaReducer from './SiswaReducer'
import NilaiReducer from './NilaiReducer'

export default combineReducers({
  siswa: SiswaReducer,
  nilai: NilaiReducer
})