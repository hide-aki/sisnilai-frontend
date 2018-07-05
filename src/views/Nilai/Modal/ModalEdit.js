import React, { Component } from 'react'
import store from '../../../store'
import { UpdateNilai, FetchNilaiList } from '../../../actions/NilaiAction'
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
    const { data, isOpen, toggle, inputOnChange, nilaiList } = this.props

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>
            Ubah Data Nilai
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Nama</Label>
                <Input type="select" name="nilai_siswa_id" disabled value={data.siswa_nama}>
                  <option value={data.nilai_siswa_id}>{data.siswa_nama}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Jumlah Nilai</Label>
                <Input
                  type="number"
                  name="nilai_jml"
                  value={data.nilai_jml || ''}
                  onChange={e => inputOnChange(e)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                e.preventDefault()
                console.log(data)

                store.dispatch(UpdateNilai(store.dispatch, findGetParameter('id'), data))
                  .then(() => {
                    store.dispatch(FetchNilaiList(store.dispatch))
                    toggle()
                    toast.success(<p style={{ textAlign: 'center', marginTop: 15 }}>Data Nilai Berhasil Diperbarui &#x2714;</p>)
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