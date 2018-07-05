import { FETCH_SISWA_LIST, FETCH_SISWA, NEW_SISWA, UPDATE_SISWA, DELETE_SISWA } from './types'
import Axios from 'axios'

export const FetchSiswaList = () => dispatch =>
  Axios.get(`http://localhost:3000/api/siswa`)
    .then(res => {
      dispatch(FetchSiswaListSuccess(res.data))
    })
export const FetchSiswaListSuccess = data => {
  return { type: FETCH_SISWA_LIST, data }
}

export const FetchSiswa = (dispatch, id) => dispatch =>
  Axios.get(`http://localhost:3000/api/siswa/${id}`)
    .then(res => {
      dispatch(FetchSiswaSuccess(res.data))
    })
export const FetchSiswaSuccess = data =>
{
  return { type: FETCH_SISWA, data }
}

export const CreateSiswa = (dispatch, data) => dispatch =>
  Axios({
    method: 'POST',
    data: data,
    url: 'http://localhost:3000/api/siswa'
  }).then(res => {
    dispatch(CreateSiswaSuccess(res.data))
  })
export const CreateSiswaSuccess = data =>
{
  return { type: NEW_SISWA, data }
}

export const UpdateSiswa = (dispatch, id, data) => dispatch =>
  Axios({
    method: 'PUT',
    data: data,
    url: `http://localhost:3000/api/siswa/${id}`
  }).then(res => {
    dispatch(UpdateSiswaSuccess(res.data))
  })
export const UpdateSiswaSuccess = data =>
{
  return { type: UPDATE_SISWA, data }
}

export const DeleteSiswa = (dispatch, id) => dispatch =>
  Axios({
    method: 'delete',
    url: `http://localhost:3000/api/siswa/${id}`
  }).then(res => {
    dispatch(DeleteSiswaSuccess(res.data))
  })
export const DeleteSiswaSuccess = data =>
{
  return { type: DELETE_SISWA, data }
}