import React, { Component } from 'react'
import { FetchSiswaList, DeleteSiswa } from '../../../actions/SiswaAction'
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
            Hapus Siswa
          </ModalHeader>
          <ModalBody>
            Anda yakin ingin menghapus siswa ini?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                store.dispatch(DeleteSiswa(store.dispatch, findGetParameter('id')))
                  .then(() => {
                    store.dispatch(FetchSiswaList(store.dispatch))
                    toggle()
                    toast.success(<p style={{ textAlign: 'center', marginTop: 15 }}>Data Berhasil Dihapus &#x2714;</p>)
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