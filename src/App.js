import React from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends React.Component {
  state = {
    sepeda:[],
    newSepedaData:{
      merk:'',
      jenis:'',
      status:'',
      id_statsiun:'',
      no_kartu_penyumbang:''
    },
    editSepedaData:{
      nomor:'',
      merk:'',
      jenis:'',
      status:'',
      id_statsiun:'',
      no_kartu_penyumbang:''
    },
    newSepedaModal:false,
    editSepedaModal:false
  }
  componentWillMount() {
    this._refreshSepeda();
  }

  toggleEditSepedaModal() {
    this.setState({
      editSepedaModal: ! this.state.editSepedaModal
    });
  }

  updateSepeda() {
    let {  merk, jenis , status, id_statsiun , no_kartu_penyumbang } = this.state.editSepedaData;

    axios.put('http://localhost:5000/sepeda/' + this.state.editSepedaData.nomor, {
      merk, jenis , status, id_statsiun , no_kartu_penyumbang
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editSepedaModal: false, editSepedaData: {
          merk:'',
          jenis:'',
          status:'',
          id_statsiun:'',
          no_kartu_penyumbang:''
        }
      })
    });
  }
  editSepeda(nomor, merk, jenis , status, id_statsiun , no_kartu_penyumbang) {
    this.setState({
      editSepedaData: { nomor, merk, jenis , status, id_statsiun , no_kartu_penyumbang }, editSepedaModal: ! this.state.editSepedaModal
    });
  }

  getSepeda() {
    return this.state.sepeda.map((sepeda, index) => {
      return <tr key={sepeda.nomor}>
        <td>{sepeda.nomor}</td>
        <td>{sepeda.merk}</td>
        <td>{sepeda.jenis}</td>
        <td>{sepeda.status ? 'Tersedia' : 'Tidak Tersedia'}</td>
        <td>{sepeda.id_statsiun}</td>
        <td>{sepeda.no_kartu_penyumbang}</td>
        <td>
          <Button color="success" size="sm" className="mr-2" onClick={this.editSepeda.bind(this, sepeda.nomor,sepeda.merk , sepeda.jenis, sepeda.status, sepeda.id_statsiun,sepeda.no_kartu_penyumbang)}>Edit</Button>
          <Button color="danger" size="sm">Delete</Button>
        </td>
      </tr>
    })
  }

  _refreshSepeda(){
    axios.get('http://localhost:5000/api/sepeda').then(({ data : { data : { rows }}})=>{
    console.log(rows)  
      this.setState({
          sepeda:rows
        })
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App container">

    <Modal isOpen={this.state.editSepedaModal} toggle={this.toggleEditSepedaModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditSepedaModal.bind(this)}>Edit a new sepeda</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="merk">Merk</Label>
            <Input id="merk" value={this.state.editSepedaData.merk} onChange={(e) => {
              let { editSepedaData } = this.state;

              editSepedaData.title = e.target.value;

              this.setState({ editSepedaData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="jenis">jenis</Label>
            <Input id="jenis" value={this.state.editSepedaData.jenis} onChange={(e) => {
              let { editSepedaData } = this.state;

              editSepedaData.rating = e.target.value;

              this.setState({ editSepedaData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateSepeda.bind(this)}>Update sepeda</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditSepedaModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


      <Table>
        <thead>
          <tr>
          <th>No</th>
          <th>Merek</th>
          <th>jenis</th>
          <th>status</th>
          <th>id_statsiun</th>
          <th>no_kartu_penyumbang</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.getSepeda()
          }
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
