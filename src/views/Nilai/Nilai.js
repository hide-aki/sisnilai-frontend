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
import { FetchNilaiList, FetchNilai, FetchNilaiKosong } from '../../actions/NilaiAction'
import ModalAdd from './Modal/ModalAdd'
import ModalEdit from './Modal/ModalEdit';
import ModalDelete from './Modal/ModalDelete';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Nilai extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        nilai_siswa_id: '',
        nilai_jml: ''
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
    store.dispatch(FetchNilaiList(store.dispatch))
    store.dispatch(FetchNilaiKosong(store.dispatch))
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
        nilai_siswa_id: '',
        nilai_jml: ''
      },
      toggleModalAdd: !this.state.toggleModalAdd
    })
  }

  toggleModalEdit(nilai_id) {
    store.dispatch(FetchNilai(store.dispatch, nilai_id)).then(() => {
      this.setState({
        toggleModalEdit: !this.state.toggleModalEdit,
        data: { ...this.props.nilai }
      })
    }).then(() => {
      this.props.history.push(
        `/nilai/nilai?id=${nilai_id}`
      )
    })
  }

  toggleModalDelete(nilai_id) {
    store.dispatch(FetchNilai(store.dispatch, nilai_id)).then(() => {
      this.setState({
        toggleModalDelete: !this.state.toggleModalDelete,
        data: { ...this.props.nilai }
      })
    }).then(() => {
      this.props.history.push(
        `/nilai/nilai?id=${nilai_id}`
      )
    })
  }

  render() {
    const nilaiData = [
      {
        Header: 'ID',
        accessor: 'nilai_id',
        show: false
      },
      {
        Header: 'SISWA ID',
        accessor: 'nilai_siswa_id',
        show: false
      },
      {
        Header: 'Nama',
        accessor: 'siswa_nama'
      },
      {
        Header: 'Jumlah Nilai',
        accessor: 'nilai_jml'
      },
      {
        Header: 'Opsi',
        accessor: 'nilai_id',
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
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                Data Nilai Siswa
                <Button
                  style={{ float: 'right' }}
                  size="sm"
                  onClick={this.toggleModalAdd}
                >Tambah</Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.props.nilaiList}
                  columns={nilaiData}
                  defaultPageSize={5}
                />
                <ModalAdd
                  data={this.state.data}
                  inputOnChange={this.modalInputOnChange}
                  toggle={this.toggleModalAdd}
                  isOpen={this.state.toggleModalAdd}
                  nilaiKosongList={this.props.nilaiKosongList}
                />
                <ModalEdit
                  data={this.state.data}
                  inputOnChange={this.modalInputOnChange}
                  toggle={this.toggleModalEdit}
                  isOpen={this.state.toggleModalEdit}
                  nilaiList={this.props.nilaiList}
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
  nilaiList: state.nilai.nilaiList,
  nilaiKosongList: state.nilai.nilaiKosongList,
  nilai: state.nilai.nilai
})

export default connect(mapStateToProps, { FetchNilaiList })(Nilai);
