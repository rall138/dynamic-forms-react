import {React, useState, useEffect} from "react"
import axios from 'axios'
import {Alert, Button, Table } from "react-bootstrap"
import './css/tablegrid.css'
import {server_url} from './files/constantes'
import {sleep} from './helpers/sleepHelper'

const styles = {
  buttonContainer:{
      padding:5,
  },
  tableRow: {
    backgroundColor:'#f4f3ee'
  }
}

const DynamicForms = () => {

  const [forms, setForms] = useState([])
  const [message, setMessage] = useState(undefined)

  useEffect(() => {
 
    axios({
      url: server_url+'forms/',
      method: 'get',
      data:''
    })
    .then(res => {
      res.data.map(form =>{
        form.created_at_nice = form.created_at.slice(0, 10)+' '+form.created_at.slice(11, 16)
        form.updated_at_nice = form.updated_at.slice(0, 10)+' '+form.updated_at.slice(11, 16)
      });
      setForms(res.data)
    }).catch(error => (console.log(error)))

  }, [])

  useEffect(()=>{
    if(message !== undefined){
      sleep(2500).then(res => {
        setMessage()
      })
    }
  }, [message])


  const deleteItem = (id) => {

    if (window.confirm("You're just about deleting this form, are you sure?")){

      axios({
        url: server_url+'forms/'+id,
        method: 'delete',
        data: ''
      })
      .then(res =>{
        if (res.data.response === 'Ok'){
          setMessage({message: res.data.message, variant:'success'})
          setForms(forms.filter((form) => form.id !== id))
        }else{
          setMessage({message: res.data.message, variant:'danger'})
        }
      })
      .catch(error => {
        console.log(error)
        setMessage({message: error.message, variant:'danger'})
      })
    }
  }

  return (
    <div className="container">
      {message !== undefined ? 
          <Alert transition={false} variant={message.variant}>{message.message}</Alert> : null }

      <div className="absolute-position">

        <Table striped hover borderless size="sm" variant="dark" style={{position:"relative"}}>
        
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Form title</th>
              <th>Form Subtitle</th>
              <th>Created by</th>
              <th>Created at</th>
              <th>Last time updated</th>
            </tr>
          </thead>

          <tbody>

            {forms.map(form => (
              <tr key={form.id}>
                <td><Button size='sm' variant="danger" onClick={() => deleteItem(form.id)}>Delete</Button></td>
                <td><Button size='sm' variant="success" onClick={() => {window.location.replace('/forms/'+form.id+'/edit')}}>Update</Button></td>
                <td>{form.title}</td>
                <td>{form.subtitle}</td>
                <td>RLomez</td>
                <td>{form.created_at_nice}</td>
                <td>{form.updated_at_nice}</td>
              </tr>
            ))}
            
          </tbody>

        </Table>

        <div className="float-right">
          <Button variant="success" href={'/forms/new'}>Create new form</Button>
        </div>

      </div>

    </div>
  )

}

export default DynamicForms
