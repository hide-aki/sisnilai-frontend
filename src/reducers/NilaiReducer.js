import { FETCH_NILAI_LIST, FETCH_NILAI, NEW_NILAI, UPDATE_NILAI, DELETE_NILAI, FETCH_SISWA_LIST, FETCH_NILAI_KOSONG } from '../actions/types'

const initialState = {
  nilaiList: [],
  nilai: {
    nilai_id: '',
    nilai_siswa_id: '',
    nilai_jml: ''
  },
  nilaiKosongList: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SISWA_LIST:
      return {
        ...state,
        siswaList: [...action.data]
      }
    case FETCH_NILAI_LIST:
      return {
        ...state,
        nilaiList: [...action.data]
      }
    case FETCH_NILAI:
      return {
        ...state,
        nilai: {...action.data}
      }
    case FETCH_NILAI_KOSONG:
      return {
        ...state,
        nilaiKosongList: [...action.data]
      }
    case NEW_NILAI:
      return {
        ...state,
        nilaiList: [...state.nilaiList, action.data]
      }
    case UPDATE_NILAI:
      return {
        ...state
      }
    case DELETE_NILAI:
      return state
    default:
      return state
  }
}