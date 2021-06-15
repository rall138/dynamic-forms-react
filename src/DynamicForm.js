import React, { useState, useEffect } from "react"
import {Button, Alert, Form} from "react-bootstrap"
import { useRouteMatch } from 'react-router-dom'
import axios from "axios"
import {server_url, transactionMode} from './files/constantes'
import './css/form.css'

const DynamicForm = (props) => {

  const [message, setMessage] = useState()
  const [form, setForm] = useState({title:"", subtitle:"", description:""})
  
  // Nos permite obtener los parámetros de la url
  const match = useRouteMatch();

  useEffect(() => {
    if(props.mode !== transactionMode.NEW){
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
    const tempForm = {...form}
    tempForm[event.target.name] = event.target.value
    setForm(tempForm)
  }

  const handleSubmit = (event) => {

    const form_control = event.currentTarget;

    if (form_control.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
    }else{

      let method = undefined
      let data = {form}
      let url = server_url+'forms/'

      if(props.mode === transactionMode.NEW){
        method = 'post'
      }else{
        url += match.params.id
        method = 'put'
      }
        
      axios({
        url: url,
        method: method,
        data: data
      })
      .then(res =>{
        if (res.data.response === 'Ok'){
          setMessage({message:res.data.message, variant:'success'})
        }else{
          setMessage({message:res.data.message, variant:'danger'})
        }
      })
      .catch(error =>{
        setMessage({message:error.message, variant:'danger'})
      })
    }

  }

  const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(()=>{
    if(message !== undefined){
      sleep(2500).then(res => {
        setMessage()
      })
    }
  }, [message])

  return (
    <div style={{paddingTop:'5px'}}>

      {message !== undefined ? 
        <Alert transition={false} variant={message.variant}>{message.message}</Alert> : '' }

      <Form id="form-control" onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={handleChange}
            name = "title"
            id = "form_title"
            required 
            type = "text" 
            placeholder = "Insert a title"
            defaultValue = {form.title}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Subtitle</Form.Label>
          <Form.Control onChange={handleChange}
            name = "subtitle"
            id = "form_subtitle"
            type = "text"
            placeholder="Insert a subtitle (optional)"
            defaultValue = {form.subtitle}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleChange}
            name = "description"
            id = "form_description"
            type="textarea" 
            placeholder=""
            defaultValue = {form.description}>
          </Form.Control>
        </Form.Group>

        <Button variant="success" type="submit">
          Confirm
        </Button>

      </Form>
    </div>
  );

}

export default DynamicForm