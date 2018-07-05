import React, { Component } from 'react'
import { FetchNilaiList, DeleteNilai } from '../../../actions/NilaiAction'
import store from '../../../store'
import { findGetParameter } from '../../../helpers/url'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class ModalDelete extends Component {

  render() {
    const { isOpen, toggle } = this.props

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>
            Hapus Data Nilai
          </ModalHeader>
          <ModalBody>
            Anda yakin ingin menghapus data nilai ini?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                store.dispatch(DeleteNilai(store.dispatch, findGetParameter('id')))
                  .then(() => {
                    store.dispatch(FetchNilaiList(store.dispatch))
                    toggle()
                    toast.success(<p style={{ textAlign: 'center', marginTop: 15 }}>Data Nilai Berhasil Dihapus &#x2714;</p>)
                  })
              }}
            >Hapus</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalDelete