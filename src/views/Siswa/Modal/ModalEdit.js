import React, { Component } from 'react'
import store from '../../../store'
import { UpdateSiswa, FetchSiswaList } from '../../../actions/SiswaAction'
import { findGetParameter } from '../../../helpers/url'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class ModalEdit extends Component {

  render() {
    const { data, isOpen, toggle, inputOnChange } = this.props

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>
            Ubah Data Siswa
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Nama</Label>
                <Input
                  type="text"
                  name="siswa_nama"
                  value={data.siswa_nama || ''}
                  onChange={e => inputOnChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Nomor</Label>
                <Input
                  type="number"
                  name="siswa_no"
                  value={data.siswa_no || ''}
                  onChange={e => inputOnChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Kelas</Label>
                <Input type="select" name="siswa_kelas" onChange={e => inputOnChange(e)} value={data.siswa_kelas}>
                  <option>Pilih Kelas</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                e.preventDefault()
                console.log(data)

                store.dispatch(UpdateSiswa(store.dispatch, findGetParameter('id'), data))
                  .then(() => {
                    store.dispatch(FetchSiswaList(store.dispatch))
                    toggle()
                    toast.success(<p style={{ textAlign: 'center', marginTop: 15 }}>Data Berhasil Diperbarui &#x2714;</p>)
                  })
              }}
            >Ubah</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalEdit