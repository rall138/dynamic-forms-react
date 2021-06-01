import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {Button, Alert, Form} from "react-bootstrap"
import axios from "axios"
import { useRouteMatch } from 'react-router-dom'
import './css/form.css'


const styles = {
  formBody:{
    padding: 10,
    margin: 20,
    backgroundColor: "#f4a261",
  },
  formGroup:{
    padding: 10,
    margin: 10,
  }
}

const server_url = "http://localhost:3000/"
const transaction_mode = {new: "new", update: "update", delete: "delete", display: "display"}


const DynamicForm = () => {

  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('')
  const [form, setForm] = useState({id: 0, title:"", subtitle:"", description:""})
  
  // Nos permite obtener los parámetros de la url
  const match = useRouteMatch();
  const mode = match.params.mode

  useEffect(() => {

    let retrive_data = false

    switch(mode){
      case transaction_mode.update:
        retrive_data = true
        break
      case transaction_mode.display:
        retrive_data = true
        break
        case transaction_mode.delete:
          retrive_data = true
          break
        default:
          retrive_data = true
      }

      if(retrive_data){
        axios({
          url: server_url+`forms/${match.params.id}`,
          method: 'get',
          data: ''
        })
        .then(res =>{
          setForm(res.data)
        }).catch(err =>{
          console.log(err)
        })
      }

  }, []);

  const handleChange = event =>{
    
    // En el caso del insert tenemos que eliminar el id, sino generamos conflicto al insertar objeto con id 0
    if (mode === transaction_mode.new){
      setForm({
        title: event.target.name === "form_title" ? event.target.value : form.title,
        subtitle: event.target.name === "form_subtitle" ? event.target.value : form.subtitle,
        description: event.target.name === "form_description" ? event.target.value : form.description,
      })
    }else{
      setForm({
        id: form.id,
        title: event.target.name === "form_title" ? event.target.value : form.title,
        subtitle: event.target.name === "form_subtitle" ? event.target.value : form.subtitle,
        description: event.target.name === "form_description" ? event.target.value : form.description,
      })
    }
    
  }

  const handleSubmit = event => {

    event.preventDefault();

    const form_control = event.currentTarget;
    if (form_control.checkValidity() === false){
      event.stopPropagation();
    }else{

      let formId = match.params.id
      let preformedURL = server_url+'forms/'
      let axiosBody = {url: '', method: '', data: null}
      let isError = false
      
      switch(mode){
        case transaction_mode.new:
          axiosBody.url = preformedURL
          axiosBody.method = 'post'
          axiosBody.data = form
          break;
        case transaction_mode.update:
          axiosBody.url = preformedURL+formId
          axiosBody.method = 'put'
          axiosBody.data = form
          break;
        case transaction_mode.delete:
          axiosBody.url = preformedURL+formId+'/destroy'
          axiosBody.method = 'delete'
          break;
        default:
            throw Error('Undefined mode for transaction');
        }

      if (axiosBody.url !== ''){
        axios(axiosBody)
        .then(res =>{
          isError = (res.data.response === "Ok" )
          setResponseToState(isError)
        })
        .catch(err =>{
          setResponseToState(true)
        })
      }

    }

  }

  const setResponseToState = isError => {
    if (isError){
      setMessage("Error occurred!")
      setVariant("danger")
    }else{
      setMessage("Succesfully completed!")
      setVariant("success")
    }
  }

  return (
    <div style={{paddingTop:'5px'}}>

      {variant !== '' ? 
        <Alert transition={false} variant={variant}>{message}</Alert> : null }

      <Form style={styles.formBody} onSubmit={()=>handleSubmit}>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={()=>handleChange}
            name = "form_title"
            id = "form_title"
            required 
            type = "text" 
            placeholder = "Insert a title"
            value = {form.title}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Subtitle</Form.Label>
          <Form.Control onChange={()=>handleChange}
            name = "form_subtitle"
            id = "form_subtitle"
            type = "text"
            placeholder="Insert a subtitle (optional)"
            value = {form.subtitle}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={()=>handleChange}
            name = "form_description"
            id = "form_description"
            type="textarea" 
            placeholder=""
            value = {form.description}>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirm
        </Button>

      </Form>
    </div>
  );

}

DynamicForm.propTypes = {
  mode: PropTypes.string
};

export default DynamicForm