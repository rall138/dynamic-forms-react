import {React, useState, useEffect} from "react"
import axios from 'axios'
import Constants from './HttpRoutes'
import {Alert, Button, Table } from "react-bootstrap"
import { Link } from 'react-router-dom'
import './css/tablegrid.css'

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
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('')

  useEffect(() => {
 
    axios({
      url: Constants.server_url+'forms/',
      method: 'get',
      data:''
    })
    .then(res => {
      res.data.map(form =>{
        form.created_at_nice = form.created_at.slice(0, 10)+' '+form.created_at.slice(11, 16)
        form.updated_at_nice = form.updated_at.slice(0, 10)+' '+form.updated_at.slice(11, 16)
      });
      setForms(res.data)
    }
    ).catch(error => (console.log(error)))

  }, [])

  const deleteItem = (id) => {

    if (window.onfirm("You're just about deleting this form, are you sure?")){

      axios({
        url: Constants.server_url+'forms/'+id,
        method: 'delete',
        data: ''
      })
      .then(res =>{
        if (res.status === 204 || res.status === 200){
          setMessage("Succesfully completed!")
          setVariant("success")
          setForms(forms.filter((form) => form.id !== id))
        }else{
          setMessage("Error occurred!")
          setVariant("danger")
        }
      })
      .catch(error => console.log(error))
    }
  }

  return (
    <div className="container">
      {variant !== '' ? 
          <Alert transition={false} variant={variant}>{message}</Alert> : null }

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

        <div className="float-right">
          <Button variant="success" href={'/forms/new'}>Create new form</Button>
        </div>

      </Table>

    </div>
  )

}

export default DynamicForms
