import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Button
} from 'reactstrap'
import ReactTable from 'react-table'
import "react-table/react-table.css"
import store from '../../store'
import { FetchSiswaList, FetchSiswa } from '../../actions/SiswaAction'
import ModalAdd from './Modal/ModalAdd'
import ModalEdit from './Modal/ModalEdit'
import ModalDelete from './Modal/ModalDelete'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Siswa extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        siswa_nama: '',
        siswa_no: '',
        siswa_kelas: ''
      },
      toggleModalAdd: false,
      toggleModalEdit: false,
      toggleModalDelete: false
    }

    this.modalInputOnChange = this.modalInputOnChange.bind(this)
    this.toggleModalAdd = this.toggleModalAdd.bind(this)
    this.toggleModalEdit = this.toggleModalEdit.bind(this)
    this.toggleModalDelete = this.toggleModalDelete.bind(this)
  }

  componentWillMount() {
    store.dispatch(FetchSiswaList(store.dispatch))
  }

  modalInputOnChange(e) {
    e.preventDefault()
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  toggleModalAdd() {
    this.setState({
      data: {
        siswa_nama: '',
        siswa_no: '',
        siswa_kelas: ''
      },
      toggleModalAdd: !this.state.toggleModalAdd
    })
  }

  toggleModalEdit(siswa_id) {
    store.dispatch(FetchSiswa(store.dispatch, siswa_id)).then(() => {
      this.setState({
        toggleModalEdit: !this.state.toggleModalEdit,
        data: { ...this.props.siswa }
      })
    }).then(() => {
      this.props.history.push(
        `/siswa/siswa?id=${siswa_id}`
      )
    })
  }

  toggleModalDelete(siswa_id) {
    store.dispatch(FetchSiswa(store.dispatch, siswa_id)).then(() => {
      this.setState({
        toggleModalDelete: !this.state.toggleModalDelete,
        data: { ...this.props.siswa }
      })
    }).then(() => {
      this.props.history.push(
        `/siswa/siswa?id=${siswa_id}`
      )
    })
  }

  render() {
    const siswaData = [
      {
        Header: 'ID',
        accessor: 'siswa_id',
        show: false
      },
      {
        Header: 'Nama',
        accessor: 'siswa_nama'
      },
      {
        Header: 'Nomor',
        accessor: 'siswa_no'
      },
      {
        Header: 'Kelas',
        accessor: 'siswa_kelas'
      },
      {
        Header: 'Opsi',
        accessor: 'siswa_id',
        sortable: false,
        width: 125,
        Cell: props => (
          <div>
            <Button
              color="primary"
              size="sm"
              style={{ marginRight: '5%' }}
              onClick={() => {
                this.toggleModalEdit(props.value)
              }}
            >Ubah</Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                this.toggleModalDelete(props.value)
              }}
            >Hapus</Button>
          </div>
        )
      }
    ]
 
    return (
      <div className="animated fadeIn">
        <ToastContainer />
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                Data Siswa
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={this.toggleModalAdd}
                >Tambah</Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.props.siswaList}
                  columns={siswaData}
                  defaultPageSize={5}
                />
                <ModalAdd
                  data={this.state.data}
                  inputOnChange={this.modalInputOnChange}
                  toggle={this.toggleModalAdd}
                  isOpen={this.state.toggleModalAdd}
                />
                <ModalEdit
                  data={this.state.data}
                  inputOnChange={this.modalInputOnChange}
                  toggle={this.toggleModalEdit}
                  isOpen={this.state.toggleModalEdit}
                />
                <ModalDelete
                  toggle={this.toggleModalDelete}
                  isOpen={this.state.toggleModalDelete}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  siswaList: state.siswa.siswaList,
  siswa: state.siswa.siswa
})

export default connect(mapStateToProps, { FetchSiswaList })(Siswa);
