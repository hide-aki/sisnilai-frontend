import { FETCH_SISWA_LIST, FETCH_SISWA, NEW_SISWA, UPDATE_SISWA, DELETE_SISWA } from '../actions/types'

const initialState = {
  siswaList: [],
  siswa: {
    siswa_id: '',
    siswa_nama: '',
    siswa_no: '',
    siswa_kelas: ''
  },
  notif: {
    title: '',
    message: '',
    level: ''
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SISWA_LIST:
      return {
        ...state,
        siswaList: [...action.data]
      }
    case FETCH_SISWA:
      return {
        ...state,
        siswa: {...action.data}
      }
    case NEW_SISWA:
      return {
        ...state,
        siswaList: [...state.siswaList, action.data],
        notif: {...state.notif, ...action.notif}
      }
    case UPDATE_SISWA:
      return {
        ...state
      }
    case DELETE_SISWA:
      return state
    default:
      return state
  }
}