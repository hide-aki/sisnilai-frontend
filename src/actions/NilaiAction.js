import { FETCH_NILAI_LIST, FETCH_NILAI, FETCH_NILAI_KOSONG, NEW_NILAI, UPDATE_NILAI, DELETE_NILAI } from './types'
import Axios from 'axios'

export const FetchNilaiList = () => dispatch =>
  Axios.get(`http://localhost:3000/api/nilai`)
    .then(res => {
      dispatch(FetchNilaiListSuccess(res.data))
    })
export const FetchNilaiListSuccess = data => {
  return { type: FETCH_NILAI_LIST, data }
}

export const FetchNilai = (dispatch, id) => dispatch =>
  Axios.get(`http://localhost:3000/api/nilai/${id}`)
    .then(res => {
      dispatch(FetchNilaiSuccess(res.data))
    })
export const FetchNilaiSuccess = data =>
{
  return { type: FETCH_NILAI, data }
}

export const FetchNilaiKosong = () => dispatch =>
  Axios.get(`http://localhost:3000/api/nilai-list/`)
  .then(res => {
    dispatch(FetchNilaiKosongSuccess(res.data))
  })
export const FetchNilaiKosongSuccess = data => {
  return { type: FETCH_NILAI_KOSONG, data }
}

export const CreateNilai = (dispatch, data) => dispatch =>
  Axios({
    method: 'POST',
    data: data,
    url: 'http://localhost:3000/api/nilai'
  }).then(res => {
    dispatch(CreateNilaiSuccess(res.data))
  })
export const CreateNilaiSuccess = data =>
{
  return { type: NEW_NILAI, data }
}

export const UpdateNilai = (dispatch, id, data) => dispatch =>
  Axios({
    method: 'PUT',
    data: data,
    url: `http://localhost:3000/api/nilai/${id}`
  }).then(res => {
    dispatch(UpdateNilaiSuccess(res.data))
  })
export const UpdateNilaiSuccess = data =>
{
  return { type: UPDATE_NILAI, data }
}

export const DeleteNilai = (dispatch, id) => dispatch =>
  Axios({
    method: 'delete',
    url: `http://localhost:3000/api/nilai/${id}`
  }).then(res => {
    dispatch(DeleteNilaiSuccess(res.data))
  })
export const DeleteNilaiSuccess = data =>
{
  return { type: DELETE_NILAI, data }
}