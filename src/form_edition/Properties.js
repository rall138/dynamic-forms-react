import React, { useState, useEffect } from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import fieldJsonProperties from '../files/field_properties.json'
import Constantes from '../files/constantes.json'

const Properties = (props) => {
  
  const [iterableProps, setIterableProps] = useState([])
  const [properties, setProperties] = useState(fieldJsonProperties)
  const [form, setForm] = useState('')

  useEffect(() => {
    
    // Normalizamos el uso para que sea mas facil a la hora de renderizar el componente.
    console.log(JSON.stringify(properties))
    for (const [key, value] of Object.entries(properties)){
      iterableProps.push({name: key, value: value})
    }
    setIterableProps(iterableProps)

  },[])


  const handleChange = event =>{
    
    // En el caso del insert tenemos que eliminar el id, sino generamos conflicto al insertar objeto con id 0
    if (props.mode === Constantes.TRANSACTION_MODE.NEW){
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

    }

  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Field properties
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form className="modal-form" onSubmit={()=>handleSubmit}>
          {iterableProps.map(prop =>{
            return(
              <Form.Group>
                <Form.Label>{prop.name}</Form.Label>
                <Form.Control onChange={()=>handleChange}
                  name = {prop.name}
                  id = {prop.name}
                  required 
                  type = "text" 
                  placeholder = "Insert a title"
                  value = {form.title}>
                </Form.Control>
              </Form.Group>
            )
          })}
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" type="submit">Confirm</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Properties
