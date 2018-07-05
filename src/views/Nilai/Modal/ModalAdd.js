import React, { Component } from 'react'
import store from '../../../store'
import { CreateNilai, FetchNilaiList, FetchNilaiKosong } from '../../../actions/NilaiAction'
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

class ModalAdd extends Component {

  render() {
    const { data, isOpen, toggle, inputOnChange, nilaiKosongList } = this.props

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>
            Tambah Data Nilai
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Nama</Label>
                <Input type="select" name="nilai_siswa_id" onChange={e => inputOnChange(e)} value={data.siswa_nama}>
                  <option>Pilih Nama Siswa</option>
                  {
                    nilaiKosongList.map(
                      (siswa) =>
                      <option key={siswa.siswa_id} value={siswa.siswa_id}>{siswa.siswa_nama}</option>
                    )
                  }
                  {/* {nilaiKosongList.map((siswa) => <option key={siswa.siswa_id} value={siswa.siswa_id}>{siswa.siswa_nama}</option>
                  )} */}
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

                store.dispatch(CreateNilai(store.dispatch, data))
                  .then(() => {
                    store.dispatch(FetchNilaiList(store.dispatch))
                    store.dispatch(FetchNilaiKosong(store.dispatch))
                    toggle()
                    toast.success(<p style={{ textAlign: 'center', marginTop: 15 }}>Data Nilai Berhasil Ditambah &#x2714;</p>)
                  })
              }}
            >Tambah</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalAdd