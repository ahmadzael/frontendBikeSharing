import React from 'react';
import {Table,Button} from 'reactstrap';
import axios from 'axios';

class Voucher extends React.Component{
    state = {
        voucher:[]
    }
    componentWillMount(){
        axios.get('http://localhost:5000/api/voucher').then(({ data : { data : { rows }}})=>{
        console.log(rows)  
            this.setState({
            voucher:rows
            })
        });
    }
    getVoucher(){
        return this.state.voucher.map((voucher,index)=>{
            return <tr key={index}>
        <td>{voucher.id_voucher}</td>
        <td>{voucher.nama}</td>
        <td>{voucher.kategori}</td>
        <td>{voucher.nilai_poin}</td>
        <td>{voucher.deskripsi}</td>
        <td>{voucher.no_kartu_anggota}</td>
        <td>
          <Button color="success" size="sn" className="mr-2">Edit</Button>
          <Button color="danger" size="sn">Delete</Button>
        </td>
      </tr>
        })
    }

    render(){
        console.log(this.state)
    return (
      <div className="App container">
      <Table>
        <thead>
          <tr>
          <th>id_voucher</th>
          <th>nama</th>
          <th>kategori</th>
          <th>nilai_poin</th>
          <th>no_kartu_anggota</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.getLaporan()
          }
        </tbody>
      </Table>
      </div>
    );
    }
    
}